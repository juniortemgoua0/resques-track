/* eslint-disable prettier/prettier */
import {Global, Module} from '@nestjs/common';
import {RequestController} from './request.controller';
import {RequestService} from './request.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {RequestSchema} from "./schema/request.schema";
import {ClaimSchema} from "./schema/claim.schema";
import {DocumentSchema} from "./schema/document.schema"
import {LetterSchema} from "./schema/letter.schema";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: ModelName.REQUEST, schema: RequestSchema},
            {name: ModelName.CLAIM, schema: ClaimSchema},
            {name: ModelName.DOCUMENT, schema: DocumentSchema},
            {name: ModelName.LETTER, schema: LetterSchema}
        ])
    ],
    exports: [MongooseModule],
    controllers: [RequestController],
    providers: [RequestService]
})
export class RequestModule {
}
