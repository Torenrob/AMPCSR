import { Injectable } from '@nestjs/common';
import CreateEditVehicleDto from './dto/create-vehicle.dto';
import Vehicle from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepo: Repository<Vehicle>,
    private customerService: CustomerService,
  ) {}

  async create(createVehicleDto: CreateEditVehicleDto): Promise<Vehicle> {
    const customer = await this.customerService.findOneNoRelations(
      createVehicleDto.customerId,
    );

    createVehicleDto.customer = customer;

    const newVehicle: Vehicle = this.vehicleRepo.create(createVehicleDto);
    await this.vehicleRepo.save(newVehicle);
    return newVehicle;
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleRepo.find({
      relations: { customer: true },
    });
  }

  async findOneNoRelations(id: string): Promise<Vehicle> {
    return await this.vehicleRepo.findOneOrFail({
      where: { id: id },
      relations: { customer: false, purchases: false },
    });
  }

  async findOneWithRelations(id: string): Promise<Vehicle> {
    return await this.vehicleRepo.findOneOrFail({
      where: { id: id },
      relations: { customer: true, purchases: true },
    });
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
    await this.vehicleRepo.remove(vehicle);
    return `Vehicle successfully deleted`;
  }
}
