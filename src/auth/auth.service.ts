import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CheckUsernameDto, SignUpDto} from "./dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UserDocument} from "../user/user.schema";
import {StudentDocument} from "../student/student.schema";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import {ModelName} from "../helpers";

export enum UserStatusType {
    USER = "user",
    STUDENT = "student"
}

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(ModelName.USER) private readonly userModel: Model<UserDocument>,
        @InjectModel(ModelName.STUDENT) private readonly studentModel: Model<StudentDocument>,
        private userService: UserService,
        private jwtService: JwtService
    ) {
    }

    async checkUsername(checkUsernameDto: CheckUsernameDto) {
        const {username, school_id} = checkUsernameDto

        /*
        *First we are checking if the dto information corresponds to any user in UserModel. If so it is,
        * we return the corresponds user with a status key whose allow the front-end developer know
        * this data key inside this return object contain a user 
        * */
        const checkUser = (await this.userModel.findOne({email: username})) ||
            (await this.userModel.findOne({phone_number: username}));
        if (checkUser) {
            return {
                status: UserStatusType.USER,
                data: checkUser
            }
        }

        /*
        * At there we are making the same treatment as in the previous case just that here we return a student 
        * instead 
        * */
        const checkStudent = (await this.studentModel.findOne({email: username}).where({school: school_id})) ||
            (await this.studentModel.findOne({phone_number: username}).where({school: school_id}));
        if (checkStudent) {
            return {
                status: UserStatusType.STUDENT,
                data: checkStudent
            }
        }
        throw new HttpException("This user is not register into our system ", HttpStatus.NOT_FOUND);
    }

    async signUp(studentId: string, signUpDto: SignUpDto) {

        const {email, phone_number, password} = signUpDto;

        /*
        * We are checking if this email or password is already use by another user
        * then throw error if is that the case and return the new user if is not 
        * */
        const checkUser = (await this.userModel.findOne({email: email})) ||
            (await this.userModel.findOne({phone_number: phone_number}));
        if (checkUser) {
            throw new HttpException("Email or phone_number taken", HttpStatus.UNAUTHORIZED);
        }

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new this.userModel({
            ...signUpDto,
            password: hashPassword,
            student: studentId
        })

        return newUser.save();
    }

    signIn(user: any) {
        const payload = {username: user.email, sub: user._id}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async validateUser(username: string, password: string): Promise<any> {

        const user = await this.userService.findOne(username);
        if (user) {
            const isMatch = await bcrypt.compare(password, user['password']);
            if (user && isMatch) {
                const {password, ...result} = user
                return result
            }
        }
        return null

    }
}