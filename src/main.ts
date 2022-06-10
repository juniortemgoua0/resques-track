<<<<<<< HEAD
/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
=======
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
>>>>>>> 857f911602a85aa4a470aa3eb8bab56844a5d7ad

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({origin: "*"});
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(cookieParser());
    await app.listen(process.env.PORT || 3000);
}

bootstrap();
