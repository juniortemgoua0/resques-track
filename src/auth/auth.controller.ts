import {Body, Controller, Param, Post, Request, UseGuards} from '@nestjs/common';
import {CheckUsernameDto, SignInDto, SignUpDto} from "./dto";
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./security/local-auth.guard";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('signUp/checkUsername')
    checkUsername(@Body() checkUsernameDto: CheckUsernameDto) {
        return this.authService.checkUsername(checkUsernameDto);
    }

    @Post('signUp/:studentId')
    signUp(
        @Param('studentId') studentId: string,
        @Body() signUpDto: SignUpDto
    ) {
        return this.authService.signUp(studentId, signUpDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('signIn')
    signIn(@Request() req) {
        return this.authService.signIn(req.user)
    }


}
