import httpContext = require('express-http-context');
import { Request, Response } from 'express';

export default class RequestContext {
  static bind(req: Request, res: Response): void {
    httpContext.ns.bindEmitter(req);
    httpContext.ns.bindEmitter(res);
  }

  static get<T>(key: string): T | null {
    return httpContext.get(key) || null;
  }

  static set<T>(key: string, value: T): void {
    return httpContext.set(key, value);
  }
}
