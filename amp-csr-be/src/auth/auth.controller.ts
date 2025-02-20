import { Body, Controller, Get, Post } from '@nestjs/common';
import AuthService, { CsRepSignIn } from './auth.service';
import { CreateEditCsrepDto } from 'src/csrep/dto/create-csrep.dto';
import ValidCsRepDto from 'src/csrep/dto/valid-csrep.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createCsrepDto: CreateEditCsrepDto): Promise<ValidCsRepDto> {
    return this.authService.register(createCsrepDto);
  }

  @Get('login')
  login(@Body() csRepSignIn: CsRepSignIn): Promise<ValidCsRepDto> {
    return this.authService.signIn(csRepSignIn);
  }
}
