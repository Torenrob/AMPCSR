import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CsrepService } from 'src/csrep/csrep.service';
import ValidCsRepDto from 'src/csrep/dto/valid-csrep.dto';
import Csrep from 'src/csrep/entities/csrep.entity';
import { CreateEditCsrepDto } from 'src/csrep/dto/create-csrep.dto';
import { AppService } from 'src/app.service';
import EncryptionService from 'src/encryption/encryptionService';
import { JwtService } from '@nestjs/jwt';

export class CsRepSignIn {
  user_name: string;
  password: string;
}

@Injectable()
export default class AuthService {
  constructor(
    private csRepService: CsrepService,
    private appService: AppService,
    private jwtService: JwtService,
  ) {}

  async register(createCsrepDto: CreateEditCsrepDto): Promise<ValidCsRepDto> {
    createCsrepDto.password = await EncryptionService.getPassHash(
      createCsrepDto.password,
      this.appService.getBcryptSecretKey(),
    );

    console.log(createCsrepDto);
    const csrep: ValidCsRepDto = await this.csRepService.create(createCsrepDto);
    console.log(csrep);

    csrep.token = await this.jwtService.signAsync({
      sub: csrep.employeeId,
      username: csrep.user_name,
    });

    return csrep;
  }

  async signIn(CsRepSignIn: CsRepSignIn): Promise<ValidCsRepDto> {
    console.log(CsRepSignIn);

    const csRepByUserName: Csrep | string =
      await this.csRepService.findByUserName(CsRepSignIn.user_name);

    //Will return string stating User or password incorrect
    if (typeof csRepByUserName === 'string') throw new UnauthorizedException();

    const isValid = await EncryptionService.comparePass(
      CsRepSignIn.password,
      this.appService.getBcryptSecretKey(),
      csRepByUserName.password,
    );

    if (!isValid) throw new UnauthorizedException();

    const returnRep = new ValidCsRepDto(csRepByUserName);
    returnRep.token = await this.jwtService.signAsync({
      sub: returnRep.employeeId,
      username: returnRep.user_name,
    });

    return returnRep;
  }
}
