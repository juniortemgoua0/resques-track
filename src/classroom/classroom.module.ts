import {Global, Module} from '@nestjs/common';
import {ClassroomService} from './classroom.service';
import {ClassroomController} from './classroom.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ClassroomSchema} from "./classroom.schema";
import {ModelName} from "../helpers/model-helpers";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{name: ModelName.CLASSROOM, schema: ClassroomSchema}])
    ],
    exports: [MongooseModule],
    providers: [ClassroomService],
    controllers: [ClassroomController]
})
export class ClassroomModule {
}
