import {Body, Controller, Param, Post, Request, UseGuards} from '@nestjs/common';
import {CheckUsernameDto, SignUpDto} from "./dto";
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./security/guard/local-auth.guard";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('signUp/checkUsername')
    checkUsername(@Body() checkUsernameDto: CheckUsernameDto) {
        return this.authService.checkUsername(checkUsernameDto);
    }

    @Post('signUp')
    signUp(
        @Body() signUpDto: SignUpDto
    ) {
        return this.authService.signUp(signUpDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('signIn')
    signIn(@Request() req) {
        return this.authService.signIn(req.user)
    }


}
