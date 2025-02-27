import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { CsrepService } from './csrep.service';
import { CreateEditCsrepDto } from './dto/create-csrep.dto';
import ValidCsRepDto from './dto/valid-csrep.dto';
import AuthGuard from 'src/auth/auth.guard';
import { RecentlyViewed } from './entities/csrep.entity';
import { CreateEditRecentView } from './dto/create-recentview.dto';
import { Code } from 'typeorm';

@UseGuards(AuthGuard)
@Controller('api/csrep')
export class CsrepController {
  constructor(private readonly csrepService: CsrepService) {}

  @Get('recentlyviewed/:id')
  async getAllRecentlyViewed(
    @Param('id') id: string,
  ): Promise<RecentlyViewed[]> {
    return await this.csrepService.getAllRecentlyViewed(id);
  }

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

  @HttpCode(200)
  @Post('recentlyviewed/:csRepId')
  async createRecentView(
    @Param('csRepId') csRepId: string,
    @Body() createRecentView: CreateEditRecentView,
  ): Promise<void> {
    return await this.csrepService.createRecentlyViewed(
      csRepId,
      createRecentView,
    );
  }

  @Patch('recentlyviewed/:csRepId')
  async updateRecentView(
    @Param('csRepId') csRepId: string,
    @Body() updateRecentView: CreateEditRecentView,
  ): Promise<void> {
    return await this.csrepService.updateRecentlyViewed(
      csRepId,
      updateRecentView,
    );
  }

  @Patch('recentlyviewed/delete/:csRepId/:recordId')
  async deleteRecentView(
    @Param('csRepId') csRepId: string,
    @Param('recordId') recordId: string,
  ): Promise<void> {
    return await this.csrepService.deleteRecentlyViewed(csRepId, recordId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    return await this.csrepService.remove(id);
  }
}
