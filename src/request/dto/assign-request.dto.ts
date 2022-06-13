import { IsNotEmpty, IsString} from "class-validator";

export class AssignRequestDto{

    @IsString()
    @IsNotEmpty()
    teacher_id: string;

    @IsNotEmpty()
    limit_date: string;

    @IsString()
    description: string;

}