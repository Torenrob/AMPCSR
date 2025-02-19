import { Injectable } from '@nestjs/common';
import CreateEditVehicleDto from './dto/create-vehicle.dto';
import Vehicle from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepo: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateEditVehicleDto): Promise<Vehicle> {
    const newVehicle: Vehicle = this.vehicleRepo.create(createVehicleDto);
    await this.vehicleRepo.save(newVehicle);
    return newVehicle;
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleRepo.find();
  }

  async findOne(id: string): Promise<Vehicle> {
    return await this.vehicleRepo.findOneByOrFail({ id });
  }

  async update(
    id: string,
    updateVehicleDto: CreateEditVehicleDto,
  ): Promise<Vehicle> {
    const vehicle = await this.vehicleRepo.findOneByOrFail({ id });
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    Object.assign(vehicle, updateVehicleDto);
    await this.vehicleRepo.save(vehicle);

    return vehicle;
  }

  async remove(id: string): Promise<string> {
    const vehicle: Vehicle = await this.vehicleRepo.findOneByOrFail({ id });
    await this.vehicleRepo.delete(vehicle);
    return `Vehicle successfully deleted`;
  }
}
