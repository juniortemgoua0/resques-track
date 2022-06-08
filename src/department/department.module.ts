import {Global, Module} from '@nestjs/common';
import {DepartmentController} from './department.controller';
import {DepartmentService} from './department.service';
import {MongooseModule} from "@nestjs/mongoose";
import {DepartmentSchema} from "./department.schema";
import {ModelName} from "../helpers";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{name: ModelName.DEPARTMENT, schema: DepartmentSchema}])
    ],
    exports: [MongooseModule],
    controllers: [DepartmentController],
    providers: [DepartmentService]
})
export class DepartmentModule {
}
