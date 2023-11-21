import { createProxyMiddleware } from 'http-proxy-middleware';
export default class HttProxy {
  public httpProxy;
  constructor(targetUrl: string | undefined) {
    this.httpProxy = createProxyMiddleware({
      target: targetUrl ?? 'http://www.example.org',
      secure: false,
      //   onProxyReq: (Req, req, res) => {
      //     // console.log(proxyReq);
      //     console.log(
      //       `[NestMiddleware]: Proxying ${req.method} request originally made to '${req.originalUrl}'...`,
      //     );
      //   },
    });
  }
}
