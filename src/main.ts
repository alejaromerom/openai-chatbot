import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// This function creates a Nest application instance
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // This function enables Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Chatbot API')
    .setDescription('Chatbot API description')
    .setVersion('1.0')
    .addTag('chatbot')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
