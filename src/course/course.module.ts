import {Global, Module} from '@nestjs/common';
import {CourseController} from './course.controller';
import {CourseService} from './course.service';
import {MongooseModule} from "@nestjs/mongoose";
import {CourseSchema} from "./course.schema";
import {ModelName} from "../helpers/model-helpers";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{name: ModelName.COURSE, schema: CourseSchema}])
    ],
    exports: [MongooseModule],
    controllers: [CourseController],
    providers: [CourseService]
})
export class CourseModule {
}
