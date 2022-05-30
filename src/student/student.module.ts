import {Global, Module} from '@nestjs/common';
import {StudentController} from './student.controller';
import {StudentService} from './student.service';
import {MongooseModule} from "@nestjs/mongoose";
import {StudentSchema} from "./student.schema";
import {ModelName} from "../helpers/model-helpers";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{name: ModelName.STUDENT, schema: StudentSchema}])
    ],
    exports: [MongooseModule],
    controllers: [StudentController],
    providers: [StudentService]
})
export class StudentModule {
}
