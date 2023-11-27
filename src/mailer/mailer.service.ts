import { Injectable } from '@nestjs/common';
import fs from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import { AllConfigType } from 'src/config/config.type';
import { EmailClient, KnownEmailSendStatus } from '@azure/communication-email';

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;
  private readonly client: EmailClient;
  constructor(private readonly configService: ConfigService<AllConfigType>) {
    const connectionString = configService.get('mail.connectionString', {
      infer: true,
    });
    if (!connectionString) {
      throw new Error('Missing mail connection string');
    }
    this.client = new EmailClient(connectionString);
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: nodemailer.SendMailOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    const POLLER_WAIT_TIME = 10;

    let html: string | undefined;
    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');
      html = Handlebars.compile(template, {
        strict: true,
      })(context);
    }

    const message = {
      senderAddress: mailOptions.from
        ? mailOptions.from
        : this.configService.get('mail.defaultEmail', {
            infer: true,
          }),
      recipients: {
        to: [{ address: mailOptions.to as string }],
      },
      content: {
        subject: 'Do not reply',
        html: mailOptions.html ? mailOptions.html : html,
      },
    };
    try {
      const poller = await this.client.beginSend(message);

      if (!poller.getOperationState().isStarted) {
        throw 'Poller was not started.';
      }

      let timeElapsed = 0;
      while (!poller.isDone()) {
        await poller.poll();
        console.log('Email send polling in progress');

        await new Promise((resolve) =>
          setTimeout(resolve, POLLER_WAIT_TIME * 1000),
        );
        timeElapsed += 10;

        if (timeElapsed > 18 * POLLER_WAIT_TIME) {
          throw 'Polling timed out.';
        }
      }

      if (
        poller.getResult() &&
        poller.getResult()?.status === KnownEmailSendStatus.Succeeded
      ) {
        console.log(
          `Successfully sent the email (operation id: ${poller.getResult()
            ?.id})`,
        );
      } else {
        throw poller.getResult()?.error;
      }
    } catch (ex) {
      console.error(ex);
    }
  }
}
