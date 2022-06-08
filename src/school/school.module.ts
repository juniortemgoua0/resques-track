import {Global, Module} from '@nestjs/common';
import {SchoolController} from './school.controller';
import {SchoolService} from './school.service';
import {MongooseModule} from "@nestjs/mongoose";
import {SchoolSchema} from "./school.schema";
import {ModelName} from "../helpers";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{name: ModelName.SCHOOL, schema: SchoolSchema}])
    ],
    exports: [MongooseModule],
    controllers: [SchoolController],
    providers: [SchoolService]
})
export class SchoolModule {
}
