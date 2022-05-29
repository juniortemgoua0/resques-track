import {IsNotEmpty, IsString} from "class-validator";

export class CreateSpecialityDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    department_id: string;

}