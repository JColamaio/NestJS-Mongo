import { Module } from "@nestjs/common";
import { UsersRepository} from './users.repository';
import { UsersController } from './users.controller.ts'
import { UserService } from './users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schemas/user.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema }])
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UserService],
})

export class UsersModule {

}