import {IsNotEmpty, IsNumber, IsObject, IsString} from "class-validator";
import {IAssign} from "../interface";
import {IReject} from "../interface/IReject";

export class ChangeStatusDto {

    @IsString()
    @IsNotEmpty()
    status: string

    @IsNumber()
    @IsNotEmpty()
    request_step: number
}