import { Injectable } from '@nestjs/common';
import CreateEditPurchaseDto from './dto/create-purchase.dto';
import Purchase from './entities/purchase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepo: Repository<Purchase>,
  ) {}

  async create(createPurchaseDto: CreateEditPurchaseDto): Promise<Purchase> {
    const newPurchase: Purchase = this.purchaseRepo.create(createPurchaseDto);
    await this.purchaseRepo.save(newPurchase);
    return newPurchase;
  }

  async findAll(): Promise<Purchase[]> {
    return await this.purchaseRepo.find();
  }

  async findOne(id: string): Promise<Purchase> {
    return await this.purchaseRepo.findOneByOrFail({ id });
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
    await this.purchaseRepo.delete(purchase);
    return `Purchase successfully deleted`;
  }
}
