import {Controller, Get} from '@nestjs/common';
import {AppService} from "./app.service";

@Controller('')
export class AppController {

    constructor(private appService: AppService ) {
    }
    @Get('reason')
    getReasons(){
        return this.appService.getReasons()
    }

    @Get('claim')
    getClaim(){
        return this.appService.getClaim();
    }
}
