import {Global, Module} from '@nestjs/common';
import {LevelService} from './level.service';
import {LevelController} from './level.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {LevelSchema} from "./level.schema";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: ModelName.LEVEL, schema: LevelSchema}
        ])
    ],
    exports: [MongooseModule],
    providers: [LevelService],
    controllers: [LevelController]
})
export class LevelModule {
}
