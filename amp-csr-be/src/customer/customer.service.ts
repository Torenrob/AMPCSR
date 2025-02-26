import { Injectable } from '@nestjs/common';
import CreateEditCustomerDto from './dto/create-customer.dto';
import Customer from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseService } from 'src/purchase/purchase.service';
import Purchase from 'src/purchase/entities/purchase.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
    @InjectRepository(Purchase)
    private purchaseRepo: Repository<Purchase>,
  ) {}

  async create(createCustomerDto: CreateEditCustomerDto): Promise<Customer> {
    const customer = await this.customerRepo.create(createCustomerDto);

    await this.customerRepo.save(customer);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepo.find({
      select: {
        email: true,
        first_name: true,
        id: true,
        last_name: true,
        phone: true,
        purchases: true,
        vehicles: true,
      },
    });
  }

  async findOneNoRelations(id: string): Promise<Customer> {
    return await this.customerRepo.findOneOrFail({
      where: { id: id },
      relations: { vehicles: false, purchases: false },
    });
  }

  async findOneWithRelations(id: string): Promise<Customer> {
    const cust = await this.customerRepo.findOneOrFail({
      where: { id: id },
      relations: { vehicles: true, purchases: true },
    });

    async function getFullPurchase(p: Purchase[], rp: Repository<Purchase>) {
      const data = await Promise.all(
        p.map(async (x) => {
          x = await rp.findOneOrFail({
            where: { id: x.id },
            relations: { vehicle: true },
          });
          return x;
        }),
      );
      return data;
    }

    cust.purchases = await getFullPurchase(cust.purchases, this.purchaseRepo);

    return cust;
  }

  async update(
    id: string,
    updateCustomerDto: CreateEditCustomerDto,
  ): Promise<Customer> {
    const customer = await this.customerRepo.findOneByOrFail({ id: id });

    customer.first_name = updateCustomerDto.first_name;
    customer.last_name = updateCustomerDto.last_name;
    customer.email = updateCustomerDto.email;
    customer.phone = updateCustomerDto.phone;

    const updatedCustomer: Customer = await this.customerRepo.save(customer);
    return updatedCustomer;
  }

  async remove(id: string): Promise<string> {
    const customer = await this.customerRepo.findOneByOrFail({ id: id });

    await this.customerRepo.remove(customer);
    return `Customer ${customer.first_name} ${customer.last_name} deleted successfully`;
  }
}
