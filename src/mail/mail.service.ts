import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nContext } from 'nestjs-i18n';
import { MailData } from './interfaces/mail-data.interface';
import { AllConfigType } from 'src/config/config.type';
import { MaybeType } from '../utils/types/maybe.type';
import { MailerService } from 'src/mailer/mailer.service';
import path from 'path';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async userSignUp(mailData: MailData<{ hash: string }>): Promise<void> {
    const i18n = I18nContext.current();
    let emailConfirmTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;

    if (i18n) {
      [emailConfirmTitle, text1, text2, text3] = await Promise.all([
        i18n.t('common.confirmEmail'),
        i18n.t('confirm-email.text1'),
        i18n.t('confirm-email.text2'),
        i18n.t('confirm-email.text3'),
      ]);
    }

    void this.mailerService.sendMail({
      to: mailData.to,
      subject: emailConfirmTitle,
      text: `${this.configService.get('app.frontendDomain', {
        infer: true,
      })}/confirm-email?hash=${mailData.data.hash} ${emailConfirmTitle}`,
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', {
          infer: true,
        }),
        'src',
        'mail',
        'mail-templates',
        'activation.hbs',
      ),
      context: {
        title: emailConfirmTitle,
        url: `${this.configService.get('app.frontendDomain', {
          infer: true,
        })}/auth/confirm-email?hash=${mailData.data.hash}`,
        actionTitle: emailConfirmTitle,
        app_name: this.configService.get('app.name', { infer: true }),
        text1,
        text2,
        text3,
      },
    });
  }

  async notifyAdmin(mailData: MailData<{ user: User }>): Promise<void> {
    const i18n = I18nContext.current();
    let newUserTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;

    if (i18n) {
      [newUserTitle, text1, text2, text3] = await Promise.all([
        i18n.t('common.activateUser'),
        i18n.t('new-user.text1'),
        i18n.t('new-user.text2'),
        i18n.t('new-user.text3'),
      ]);
    }

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: newUserTitle,
      text: `${this.configService.get('app.frontendDomain', {
        infer: true,
      })}/admin/activate-user?user_id=${mailData.data.user.id}`,
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', {
          infer: true,
        }),
        'src',
        'mail',
        'mail-templates',
        'user-management.hbs',
      ),
      context: {
        title: newUserTitle,
        url: `${this.configService.get('app.frontendDomain', {
          infer: true,
        })}/admin/activate-user?user_id=${mailData.data.user.id}`,
        actionTitle: newUserTitle,
        app_name: this.configService.get('app.name', { infer: true }),
        userName: mailData.data.user.fullName,
        userEmail: mailData.data.user.email,
        userId: mailData.data.user.id,
        text1,
        text2,
        text3,
      },
    });
  }

  async forgotPassword(mailData: MailData<{ hash: string }>): Promise<void> {
    const i18n = I18nContext.current();
    let resetPasswordTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;
    let text4: MaybeType<string>;

    if (i18n) {
      [resetPasswordTitle, text1, text2, text3, text4] = await Promise.all([
        i18n.t('common.resetPassword'),
        i18n.t('reset-password.text1'),
        i18n.t('reset-password.text2'),
        i18n.t('reset-password.text3'),
        i18n.t('reset-password.text4'),
      ]);
    }

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: resetPasswordTitle,
      text: `${this.configService.get('app.frontendDomain', {
        infer: true,
      })}/password-change?hash=${mailData.data.hash} ${resetPasswordTitle}`,
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', {
          infer: true,
        }),
        'src',
        'mail',
        'mail-templates',
        'reset-password.hbs',
      ),
      context: {
        title: resetPasswordTitle,
        url: `${this.configService.get('app.frontendDomain', {
          infer: true,
        })}/password-change?hash=${mailData.data.hash}`,
        actionTitle: resetPasswordTitle,
        app_name: this.configService.get('app.name', {
          infer: true,
        }),
        text1,
        text2,
        text3,
        text4,
      },
    });
  }

  async welcomeEmail(mailData: MailData<{ user: User }>): Promise<void> {
    const i18n = I18nContext.current();
    let welcomeEmailTile: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;

    if (i18n) {
      [welcomeEmailTile, text1, text2, text3] = await Promise.all([
        i18n.t('common.welcome'),
        i18n.t('confirm-email.text1'),
        i18n.t('confirm-email.text2'),
        i18n.t('confirm-email.text3'),
      ]);
    }

    void this.mailerService.sendMail({
      to: mailData.to,
      subject: welcomeEmailTile,
      text: `${this.configService.get('app.frontendDomain', {
        infer: true,
      })}/auth/login`,
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', {
          infer: true,
        }),
        'src',
        'mail',
        'mail-templates',
        'welcome-email.hbs',
      ),
      context: {
        title: welcomeEmailTile,
        url: `${this.configService.get('app.frontendDomain', {
          infer: true,
        })}/auth/login`,
        app_name: this.configService.get('app.name', { infer: true }),
        user: mailData.data.user,
        actionTitle: 'Login',
        text1,
        text2,
        text3,
      },
    });
  }
}
