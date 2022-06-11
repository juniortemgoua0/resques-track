import {IsNotEmpty, IsNumber, IsObject} from "class-validator";
import {IAssign} from "../interface";
import {IReject} from "../interface/IReject";

export class ChangeStatusDto {

    @IsNumber()
    @IsNotEmpty()
    status: number

    @IsNumber()
    @IsNotEmpty()
    request_step: number

}