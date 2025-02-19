import { Injectable } from '@nestjs/common';
import CreateEditPurchaseDto from './dto/create-purchase.dto';
import Purchase from './entities/purchase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerService } from 'src/customer/customer.service';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepo: Repository<Purchase>,
    private customerService: CustomerService,
    private vehicleService: VehicleService,
  ) {}

  async create(createPurchaseDto: CreateEditPurchaseDto): Promise<Purchase> {
    const customer = await this.customerService.findOneNoRelations(
      createPurchaseDto.customerId,
    );
    const vehicle = await this.vehicleService.findOneNoRelations(
      createPurchaseDto.vehicleId,
    );

    createPurchaseDto.vehicle = vehicle;
    createPurchaseDto.customer = customer;

    const newPurchase: Purchase = this.purchaseRepo.create(createPurchaseDto);
    await this.purchaseRepo.save(newPurchase);
    return newPurchase;
  }

  async findAll(): Promise<Purchase[]> {
    return await this.purchaseRepo.find();
  }

  async findOneNoRelations(id: string): Promise<Purchase> {
    return await this.purchaseRepo.findOneOrFail({
      where: { id: id },
      relations: { vehicle: false, customer: false },
    });
  }

  async findOneWithRelations(id: string): Promise<Purchase> {
    return await this.purchaseRepo.findOneOrFail({
      where: { id: id },
      relations: { vehicle: true, customer: true },
    });
  }

  async update(
    id: string,
    updatePurchaseDto: CreateEditPurchaseDto,
  ): Promise<Purchase> {
    const purchase = await this.purchaseRepo.findOneByOrFail({ id });
    if (!purchase) {
      throw new Error('Purchase not found');
    }

    Object.assign(purchase, updatePurchaseDto);
    await this.purchaseRepo.save(purchase);

    return purchase;
  }

  async remove(id: string): Promise<string> {
    const purchase: Purchase = await this.purchaseRepo.findOneByOrFail({ id });
    await this.purchaseRepo.remove(purchase);
    return `Purchase successfully deleted`;
  }
}
