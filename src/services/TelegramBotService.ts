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
import { Telegraf } from 'telegraf';

class TelegramBotService {
  private static bot: Telegraf | null = null;

  static getInstance(): Telegraf {
    const token = process.env.BOT_TOKEN || '';
    if (!this.bot)
      this.bot = new Telegraf(token);

    return this.bot;
  }

  static sendMessage(message: string) {
    const channelName: string = process.env.CHANNEL_NAME || '';
    TelegramBotService.getInstance().telegram.sendMessage(channelName, message);
  }
}

export default TelegramBotService;

