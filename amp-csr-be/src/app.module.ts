import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsrepModule } from './csrep/csrep.module';
import { CustomerModule } from './customer/customer.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { PurchaseModule } from './purchase/purchase.module';
import { AuthModule } from './auth/auth.module';
import Csrep from './csrep/entities/csrep.entity';
import { ConfigModule } from '@nestjs/config';
import Customer from './customer/entities/customer.entity';
import Purchase from './purchase/entities/purchase.entity';
import Vehicle from './vehicle/entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './src/database/ampcsr.db',
      synchronize: true,
      logging: true,
      entities: [Csrep, Customer, Purchase, Vehicle],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
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
