/**
 * Copyright (c) evgeniy.logvinov.k
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { createLogger, format, transports } from 'winston';
import util from 'util';
// @ts-ignore
import Sentry from 'winston-sentry';
import * as Transport from 'winston-transport';

const { combine, timestamp, printf } = format;

const winstoneTransports: Transport[] = [];
winstoneTransports.push(new transports.Console({level: 'silly'}));

if (!!process.env.SENTRY_URL) {
  winstoneTransports.push(
      new Sentry({
        level: 'silly',
        dsn: process.env.SENTRY_URL,
        tags: { key: 'value' },
        extra: { key: 'value' },
        // patchGlobal: true,
        // levelsMap: {
        //   silly: 'debug',
        //   verbose: 'debug',
        //   info: 'info',
        //   debug: 'debug',
        //   warn: 'warning',
        //   error: 'error'
        // },
      }),
  );
} else {
  console.log('Sentry link not introduced');
}

const myFormat = printf(({timestamp, level, message, name, data}) => {
  const value = data.length > 0 ? util.inspect(Object.values(data), false, 3, true /* enable colors */) : '';
  return `${timestamp} [${name}] ${level}: ${message} ${value}`;
});

export const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: winstoneTransports,
});
