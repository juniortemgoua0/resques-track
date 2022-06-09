import {Module} from '@nestjs/common';
import {PersonnelController} from './personnel.controller';
import {PersonnelService} from './personnel.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {PersonnelSchema} from "./personnel.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: ModelName.PERSONNEL, schema: PersonnelSchema}
        ])
    ],
    controllers: [PersonnelController],
    providers: [PersonnelService]
})
export class PersonnelModule {
}
