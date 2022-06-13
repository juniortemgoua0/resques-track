import { IsNotEmpty, IsString} from "class-validator";

export class AssignRequestDto{

    @IsString()
    @IsNotEmpty()
    teacher_id: string;

    @IsNotEmpty()
    date: Date

    @IsString()
    description: string;

}