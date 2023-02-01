import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RmqModule, DatabaseModule } from "@app/common";
import { LocalStrategy } from './strategies/local.strategy';
import * as Joi from 'joi'

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [DatabaseModule,
    UsersModule,
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
      }),
      envFilePath: './apps.auth/.env',
    }),
    JwtModule.registerAsync({
      useFactory: (ConfigService: ConfigService) => ( {
        secret: ConfigService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `$(configService.get('JWT_EXPIRATION'))s`
        },
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
