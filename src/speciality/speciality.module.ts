import {Global, Module} from '@nestjs/common';
import {SpecialityService} from './speciality.service';
import {SpecialityController} from './speciality.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {SpecialitySchema} from "./speciality.schema";
import {ModelName} from "../helpers";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{name: ModelName.SPECIALITY, schema: SpecialitySchema}])
    ],
    exports: [MongooseModule],
    controllers: [SpecialityController],
    providers: [SpecialityService]
})
export class SpecialityModule {
}
