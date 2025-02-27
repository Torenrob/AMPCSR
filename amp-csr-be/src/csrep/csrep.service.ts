import { Injectable } from '@nestjs/common';
import { CreateEditCsrepDto } from './dto/create-csrep.dto';
import Csrep, { RecentlyViewed } from './entities/csrep.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ValidCsRepDto from './dto/valid-csrep.dto';
import { first } from 'rxjs';
import EncryptionService from 'src/encryption/encryptionService';
import { AppService } from 'src/app.service';
import { CreateEditRecentView } from './dto/create-recentview.dto';
import { mapRecentView } from './dto/mappers/recentview';

@Injectable()
export class CsrepService {
  constructor(
    @InjectRepository(Csrep)
    private csRepRepo: Repository<Csrep>,
    private appService: AppService,
  ) {}

  async getAllRecentlyViewed(id: string): Promise<RecentlyViewed[]> {
    const csrep: Csrep = await this.csRepRepo.findOneOrFail({
      where: { employeeId: id },
      select: { recentlyViewed: true },
    });

    return csrep.recentlyViewed;
  }

  async createRecentlyViewed(
    employeeId: string,
    recentView: CreateEditRecentView,
  ) {
    const newRecentView: RecentlyViewed = mapRecentView(
      recentView as CreateEditRecentView & RecentlyViewed,
    );

    const csrep: Csrep = await this.csRepRepo.findOneOrFail({
      where: { employeeId: employeeId },
      // select: { recentlyViewed: true },
    });

    //Check to see if record is already in the array
    const currentInstanceIndex: number = csrep.recentlyViewed.findIndex(
      (e) =>
        e.id === newRecentView.id && e.recordType === newRecentView.recordType,
    );

    //If record in recent view already remove prior instance
    if (currentInstanceIndex >= 0) {
      csrep.recentlyViewed.splice(currentInstanceIndex, 1);
    }

    csrep.recentlyViewed.unshift(newRecentView);

    await this.csRepRepo.save(csrep);
  }

  async updateRecentlyViewed(
    employeeId: string,
    updateRecentView: CreateEditRecentView,
  ): Promise<void> {
    const csrep: Csrep = await this.csRepRepo.findOneOrFail({
      where: { employeeId: employeeId },
    });

    csrep.recentlyViewed = csrep.recentlyViewed.map((rc) => {
      if (rc.id === updateRecentView.id) {
        if (!updateRecentView.timeViewed) {
          updateRecentView.timeViewed = rc.timeViewed;
          updateRecentView.customerId = rc.customerId;
        }
        return mapRecentView(
          updateRecentView as CreateEditRecentView & RecentlyViewed,
        );
      }
      return rc;
    }) as RecentlyViewed[];

    await this.csRepRepo.save(csrep);
  }

  async deleteRecentlyViewed(employeeId: string, recordId: string) {
    const csrep: Csrep = await this.csRepRepo.findOneOrFail({
      where: { employeeId: employeeId },
    });

    const deleteIndex = csrep.recentlyViewed.findIndex(
      (rv) => rv.id === recordId,
    );

    csrep.recentlyViewed.splice(deleteIndex, 1);

    await this.csRepRepo.save(csrep);
  }

  async create(createCsrepDto: CreateEditCsrepDto): Promise<ValidCsRepDto> {
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
    console.log(user_name);

    try {
      const csRep = await this.csRepRepo.findOneOrFail({
        where: { user_name: user_name },
      });
      return csRep;
    } catch (Err: unknown) {
      return 'Username or Password Invalid';
    }
  }

  async update(
    id: string,
    updateCsrepDto: CreateEditCsrepDto,
  ): Promise<ValidCsRepDto | string> {
    const csRep = await this.csRepRepo.findOneByOrFail({ employeeId: id });
    if (!csRep) {
      return 'Customer Service Representative not found';
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

    if (!csRep) return 'Customer Service Representative not found';

    await this.csRepRepo.delete(csRep);
    return `Customer Service Representative Account successfully deleted`;
  }
}
