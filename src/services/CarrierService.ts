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
import { logger } from '../logger/logger';
import { ApiService } from './ApiService';
import { ScalpService } from './ScalpService';

export class CarrierService {
  private testEnv = !process.env.TOKEN;

  public fillPortfolio = async () => {
    const testEnv = !process.env.TOKEN;
    logger.debug('testEnv', {data: [!!testEnv]});

    if (testEnv) {
      await ApiService.getInstance().sandboxClear();
      await ApiService.getInstance().setCurrenciesBalance({currency: 'USD', balance: 4000});
      const res = await ApiService.getInstance().portfolio();
      logger.debug('portfolio', {data: JSON.parse(JSON.stringify(res.positions))});
    }
  }

  public async start(ticker: string) {
    const scalpService = new ScalpService();
    await scalpService.start(ticker);
  }
}
// 1) Смотрим на текущий курс акции и смотрим куда она меняется.
// 2.1) Если она идет верх то мы ее покупаем
// 2.2) Если она идет вниз то мы ее не покупаем и смотрим на цену пока она не начнет идти вверх (Записываю значение в этой точке)
// 3) После покупки опять смотрим за ее движением.
// 3.1) Если она идет вверх то ждем пока не остановится рост и она не пойдет вниз на 2 пункта
// 3.1.1) Если она идет вниз и разница между ценой покупки и текущей ценой + комиссия больше то мы ее продаем
// 3.1) Если она идет вниз и разница между ценой покупки и текущей ценой + комиссия меньше то мы ждем пока она не увеличится
