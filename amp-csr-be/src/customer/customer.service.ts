import { Injectable } from '@nestjs/common';
import CreateEditCustomerDto from './dto/create-customer.dto';
import Customer from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateEditCustomerDto): Promise<Customer> {
    const customer = await this.customerRepo.create(createCustomerDto);

    await this.customerRepo.save(customer);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepo.find({
      select: {
        address: true,
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
    return await this.customerRepo.findOneOrFail({
      where: { id: id },
      relations: { vehicles: true, purchases: true },
    });
  }

  async update(
    id: string,
    updateCustomerDto: CreateEditCustomerDto,
  ): Promise<Customer> {
    const customer = await this.customerRepo.findOneByOrFail({ id: id });
    Object.assign(customer, updateCustomerDto);
    const updatedCustomer: Customer = await this.customerRepo.save(customer);
    return updatedCustomer;
  }

  async remove(id: string): Promise<string> {
    const customer = await this.customerRepo.findOneByOrFail({ id: id });
    console.log(customer);
    await this.customerRepo.remove(customer);
    return `Customer ${customer.first_name} ${customer.last_name} deleted successfully`;
  }
}
