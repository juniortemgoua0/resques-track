import {Controller} from '@nestjs/common';
import {PersonnelService} from "./personnel.service";

@Controller('personnel')
export class PersonnelController {

    constructor(private personnelService: PersonnelService) {
    }

}
