import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(`${configuration().app.version}`);
  const options = new DocumentBuilder()
  .setTitle('Bank-Api')
  .setDescription('API Details of Bank System Project')
  .setVersion('0.0.1')
  .build();

  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup(`${configuration().app.version}/docs`,app,document,{
    explorer: true,
    swaggerOptions: {}
  })
  // await app.listen(configuration().app.port);
  await app.listen(3001);
}
bootstrap();
