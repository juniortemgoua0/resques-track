import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "../security/local.strategy";
import {LocalAuthGuard} from "../security/local-auth.guard";
import {JwtAuthGuard} from "../security/jwt-auth.guard";
import {JwtStrategy} from "../security/jwt.strategy";
import {ConfigModule} from "@nestjs/config";


@Module({
    imports: [
        PassportModule,
        ConfigModule.forRoot({isGlobal: true}),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: "1d"}
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtAuthGuard, JwtStrategy]
})
export class AuthModule {
}
