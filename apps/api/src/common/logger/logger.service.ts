import _ = require('lodash');
import { Injectable, Logger } from '@nestjs/common';
import RequestContext from '../utils/request-context';

/** @export
 * @class CloudwatchLogger
 * @extends {Logger}
 */
@Injectable()
export class LoggerService extends Logger {
  constructor() {
    super();
  }

  private formatError = (error: any) => {
    if (!error) {
      return {};
    }

    if (typeof error === 'string') {
      return {
        error,
      };
    }

    return {
      error: {
        message: error.message,
        stack: error.stack,
      },
    };
  };
  /**
   *
   *
   * @private
   * @type {*}
   * @memberof CloudwatchLogger
   */

  /**
   *
   * Attaches info to the log message/data sent
   * Info contains the app name from config and the correlation id
   * @private
   * @param {*} data
   * @memberof CloudwatchLogger
   */
  private getData = (data: any): Array<any> => {
    const [shortMessage, longMessage, extraInfo] = data;
    const correlationId = RequestContext.get('correlationId');
    const user: { uid: string } = RequestContext.get('user');
    const info = {};
    if (correlationId) {
      info['correlationId'] = correlationId;
    }

    if (user) {
      info['user'] = user;
    }

    // if only data object if provided
    if (_.isPlainObject(shortMessage)) {
      return [
        '',
        _.assign(
          {},
          { ...shortMessage, ...this.formatError(shortMessage.error) },
          info,
        ),
      ];
    }
    // if a short message and data object is provided
    if (_.isPlainObject(longMessage)) {
      return [
        shortMessage,
        _.assign(
          {},
          { ...longMessage, ...this.formatError(longMessage.error) },
          info,
        ),
      ];
    }
    // if short, long message and data object provided
    if (_.isPlainObject(extraInfo)) {
      return [
        shortMessage,
        longMessage,
        _.assign(
          {},
          { ...extraInfo, ...this.formatError(extraInfo.error) },
          info,
        ),
      ];
    }
    return [...data, info];
  };
  /**
   *
   * Streams logs to graylog based on the isEnabled flag
   * @private
   * @param {string} level
   * @param {...any[]} data
   * @memberof CloudwatchLogger
   */
  private logHandler = (level: string, data: any[]) => {
    try {
      const processedData: Array<any> = this.getData(data);
      console.log(level, ...processedData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  info(...message: any) {
    this.logHandler('info', message);
  }
  error(...message: any) {
    this.logHandler('error', message);
  }
  debug(...message: any) {
    this.logHandler('debug', message);
  }
}
