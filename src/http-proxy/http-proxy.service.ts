import { createProxyMiddleware } from 'http-proxy-middleware';

export default class HttpProxyService {
  public httpProxy;
  constructor(targetUrl: string | undefined) {
    if (targetUrl === undefined) return;
    this.httpProxy = createProxyMiddleware({
      target: targetUrl ?? 'http://www.example.org',
      secure: false,
      pathRewrite: {
        '^/api/v1': '', // Remove the initial "/api/v1" from the URL
      },
      //   onProxyReq: (Req, req, res) => {
      //     // console.log(proxyReq);
      //     console.log(
      //       `[NestMiddleware]: Proxying ${req.method} request originally made to '${req.originalUrl}'...`,
      //     );
      //   },
    });
  }
}
