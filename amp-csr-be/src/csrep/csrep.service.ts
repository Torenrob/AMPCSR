import { Injectable } from '@nestjs/common';
import { CreateEditCsrepDto } from './dto/create-csrep.dto';
import Csrep from './entities/csrep.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ValidCsRepDto from './dto/valid-csrep.dto';
import { first } from 'rxjs';
import EncryptionService from 'src/encryption/encryptionService';
import { AppService } from 'src/app.service';

@Injectable()
export class CsrepService {
  constructor(
    @InjectRepository(Csrep)
    private csRepRepo: Repository<Csrep>,
    private appService: AppService,
  ) {}

  async create(
    createCsrepDto: CreateEditCsrepDto,
  ): Promise<ValidCsRepDto | undefined> {
    const newCsRep: Csrep = this.csRepRepo.create(createCsrepDto);

    await this.csRepRepo.save(newCsRep);

    return new ValidCsRepDto(newCsRep);
  }

  async findAll(): Promise<ValidCsRepDto[]> {
    return await this.csRepRepo.find({
      select: {
        first_name: true,
        last_name: true,
        user_name: true,
        employeeId: true,
      },
    });
  }

  async findById(id: string): Promise<ValidCsRepDto> {
    const csrep: Csrep = await this.csRepRepo.findOneByOrFail({
      employeeId: id,
    });

    return new ValidCsRepDto(csrep);
  }

  async findByUserName(user_name: string): Promise<Csrep | string> {
    try {
      const csRep = await this.csRepRepo.findOneByOrFail({
        user_name: user_name,
      });
      return csRep;
    } catch (Err: unknown) {
      return 'Username or Password Invalid';
    }
  }

  async update(
    id: string,
    updateCsrepDto: CreateEditCsrepDto,
  ): Promise<ValidCsRepDto | undefined> {
    const csRep = await this.csRepRepo.findOneByOrFail({ employeeId: id });
    if (!csRep) {
      throw new Error('CSR not found');
    }

    updateCsrepDto.password = await EncryptionService.getPassHash(
      updateCsrepDto.password,
      this.appService.getBcryptSecretKey(),
    );

    Object.assign(csRep, updateCsrepDto);
    await this.csRepRepo.save(csRep);

    return new ValidCsRepDto(csRep);
  }

  async remove(id: string): Promise<string> {
    const csRep: Csrep = await this.csRepRepo.findOneByOrFail({
      employeeId: id,
    });
    await this.csRepRepo.delete(csRep);
    return `Customer Service Representative Account successfully deleted`;
  }
}
