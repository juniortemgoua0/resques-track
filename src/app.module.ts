import {Global, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {MongooseModule} from "@nestjs/mongoose";
import {UserModule} from './user/user.module';
import {StudentModule} from './student/student.module';
import {CourseModule} from './course/course.module';
import {DepartmentModule} from './department/department.module';
import {SpecialityModule} from './speciality/speciality.module';
import {SchoolModule} from './school/school.module';
import {ClassroomModule} from './classroom/classroom.module';
import {JwtModule} from "@nestjs/jwt";

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        MongooseModule.forRoot(process.env.MONGO_DB_URI),
        AuthModule,
        UserModule,
        StudentModule,
        CourseModule,
        DepartmentModule,
        SpecialityModule,
        SchoolModule,
        ClassroomModule,
    ],
    exports: [ConfigModule],
})
export class AppModule {
}
