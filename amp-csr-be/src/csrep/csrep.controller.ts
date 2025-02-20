import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CsrepService } from './csrep.service';
import { CreateEditCsrepDto } from './dto/create-csrep.dto';
import ValidCsRepDto from './dto/valid-csrep.dto';
import AuthGuard from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('csrep')
export class CsrepController {
  constructor(private readonly csrepService: CsrepService) {}

  @Get()
  async findAll(): Promise<ValidCsRepDto[]> {
    return await this.csrepService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ValidCsRepDto> {
    return await this.csrepService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCsrepDto: CreateEditCsrepDto,
  ): Promise<ValidCsRepDto | string> {
    return await this.csrepService.update(id, updateCsrepDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    return await this.csrepService.remove(id);
  }
}
