import { Injectable } from '@nestjs/common';
import { CsrepService } from 'src/csrep/csrep.service';
import ValidCsRepDto from 'src/csrep/dto/valid-csrep.dto';
import Csrep from 'src/csrep/entities/csrep.entity';
import { CreateEditCsrepDto } from 'src/csrep/dto/create-csrep.dto';
import { AppService } from 'src/app.service';
import EncryptionService from 'src/encryption/encryptionService';

export class CsRepSignIn {
  username: string;
  password: string;
}

@Injectable()
export default class AuthService {
  constructor(
    private csRepService: CsrepService,
    private appService: AppService,
  ) {}

  async register(
    createCsrepDto: CreateEditCsrepDto,
  ): Promise<ValidCsRepDto | undefined> {
    createCsrepDto.password = await EncryptionService.getPassHash(
      createCsrepDto.password,
      this.appService.getBcryptSecretKey(),
    );
    return this.csRepService.create(createCsrepDto);
  }

  async signIn(CsRepSignIn: CsRepSignIn): Promise<ValidCsRepDto | string> {
    const csRepByUserName: Csrep | string =
      await this.csRepService.findByUserName(CsRepSignIn.username);

    if (typeof csRepByUserName === 'string') return csRepByUserName;

    const isValid = await EncryptionService.comparePass(
      CsRepSignIn.password,
      this.appService.getBcryptSecretKey(),
      csRepByUserName.password,
    );

    return isValid
      ? new ValidCsRepDto(csRepByUserName)
      : 'Username or Password Invalid';
  }
}
