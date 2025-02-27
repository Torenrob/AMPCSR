import { forwardRef, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsrepModule } from './csrep/csrep.module';
import { CustomerModule } from './customer/customer.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { PurchaseModule } from './purchase/purchase.module';
import { AuthModule } from './auth/auth.module';
import Csrep from './csrep/entities/csrep.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Customer from './customer/entities/customer.entity';
import Purchase from './purchase/entities/purchase.entity';
import Vehicle from './vehicle/entities/vehicle.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'better-sqlite3',
          database: configService.get<string>('DB_LOCATION'),
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
          logging: true,
          entities: [Csrep, Customer, Purchase, Vehicle],
        };
      },
      inject: [ConfigService],
    }),
    CsrepModule,
    CustomerModule,
    VehicleModule,
    PurchaseModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
