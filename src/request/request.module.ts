/* eslint-disable prettier/prettier */
import {Global, Module} from '@nestjs/common';
import {RequestController} from './request.controller';
import {RequestService} from './request.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {RequestSchema} from "./request.schema";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: ModelName.REQUEST, schema: RequestSchema}
        ])
    ],
    exports: [MongooseModule],
    controllers: [RequestController],
    providers: [RequestService]
})
export class RequestModule {
}
