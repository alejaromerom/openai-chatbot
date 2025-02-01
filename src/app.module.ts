import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ChatbotController } from './chatbot/controllers/chatbot.controller';
import { OpenAIService } from './chatbot/services/openai.service';
import { ToolsService } from './chatbot/services/tools.service';
import { ProductDao } from './chatbot/dao/product.dao';
import { HttpModule } from '@nestjs/axios';

// This module is the root module of the application
@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [AppController, ChatbotController],
  providers: [AppService, OpenAIService, ToolsService, ProductDao],
})
export class AppModule {}
