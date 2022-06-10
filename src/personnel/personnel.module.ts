import {Global, Module} from '@nestjs/common';
import {PersonnelController} from './personnel.controller';
import {PersonnelService} from './personnel.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {PersonnelSchema} from "./schema/personnel.schema";
import {RoleSchema} from "./schema/role.schema";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: ModelName.PERSONNEL, schema: PersonnelSchema},
            {name: ModelName.ROLE, schema: RoleSchema}
        ])
    ],
    exports: [MongooseModule],
    controllers: [PersonnelController],
    providers: [PersonnelService]
})
export class PersonnelModule {
}
