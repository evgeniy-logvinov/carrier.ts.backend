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
import express from 'express';
import { CarrierService } from './services/CarrierService';
import HelperService from './services/HelperService';
import TelegramBotService from './services/TelegramBotService';

const app = express();

console.log('sandboxToken', process.env.SANDBOX_TOKEN);
console.log('token', process.env.TOKEN);
const startUp = async () => {
  try {
    const carrier = new CarrierService();
    await carrier.fillPortfolio();
    await carrier.start('AAPL');
    // carrier.Apple();
    // carrier.Baidu();
    // carrier.EnergyTransfer();
    // carrier.AmericanAirlines();
    // carrier.BakerHughes();
    // carrier.RoyalDutchShell();
    // carrier.Nike();
    // carrier.CorEnergyInfrastructureTrust();
    // carrier.Fxim();
    // carrier.Hess();
    TelegramBotService.sendMessage('Application is start');
  } catch (err) {
    HelperService.errorHandler(err);
  }

};

startUp();
app.get('/', (_, res) => res.send('Hello World!'));
console.log('Done');
export default app;
