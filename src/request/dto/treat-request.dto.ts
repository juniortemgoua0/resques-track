import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class TreatRequestDto{

    @IsString()
    @IsNotEmpty()
    decision: string;

    @IsNumber()
    @IsNotEmpty()
    final_note: number;

    @IsString()
    description: string;

}