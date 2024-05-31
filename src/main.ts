import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { configurationService } from './config/config.service';
import { resolve } from 'path';
import { createWriteStream, writeFileSync } from 'fs';
import { get } from 'http';

const PORT = configurationService.getValue('PORT');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5000',
      'https://computacao-amostra.com',
      'http://computacao-amostra.com',
      'https://api.computacao-amostra.com',
      'http://api.computacao-amostra.com',
      'https://amazon-hacking-hml-frontend.vercel.app',
    ],
  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Backend Computação Amostra')
    .setDescription('API Routes and data')
    .setVersion('1.0')
    .addCookieAuth('session_token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  if (process.env.NODE_ENV === 'development') {
    const pathToSwaggerStaticFolder = resolve(process.cwd(), 'swagger-static');

    // write swagger json file
    const pathToSwaggerJson = resolve(
      pathToSwaggerStaticFolder,
      'swagger.json',
    );
    const swaggerJson = JSON.stringify(document, null, 2);
    writeFileSync(pathToSwaggerJson, swaggerJson);
    console.log(`Swagger JSON file written to: '/swagger-static/swagger.json'`);
    if (process.env.NODE_ENV === 'development') {
      // write swagger ui files
      get(
        `http://localhost:${PORT}/swagger/swagger-ui-bundle.js`,
        function (response) {
          response.pipe(
            createWriteStream('swagger-static/swagger-ui-bundle.js'),
          );
          console.log(
            `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
          );
        },
      );

      get(
        `http://localhost:${PORT}/swagger/swagger-ui-init.js`,
        function (response) {
          response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
          console.log(
            `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
          );
        },
      );

      get(
        `http://localhost:${PORT}/swagger/swagger-ui-standalone-preset.js`,
        function (response) {
          response.pipe(
            createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
          );
          console.log(
            `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
          );
        },
      );

      get(
        `http://localhost:${PORT}/swagger/swagger-ui.css`,
        function (response) {
          response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
          console.log(
            `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
          );
        },
      );
    }
  }
  app.listen(PORT, () => `Listening to port: ${PORT}`);
}
bootstrap();
