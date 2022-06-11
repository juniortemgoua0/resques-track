import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Role} from "../../helpers";
import {ROLE_KEY} from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {

        const roles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if (!roles){
            return true
        }

        const { user } = context.switchToHttp().getRequest()

        return roles.some(role => user?.includes(role));
    }

}