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
import { VehicleService } from './vehicle.service';
import CreateEditVehicleDto from './dto/create-vehicle.dto';
import AuthGuard from 'src/auth/auth.guard';
import Vehicle from './entities/vehicle.entity';

@UseGuards(AuthGuard)
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  create(@Body() createVehicleDto: CreateEditVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Get()
  async findAll() {
    const v: Vehicle[] = await this.vehicleService.findAll();

    return v;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOneWithRelations(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVehicleDto: CreateEditVehicleDto,
  ) {
    return this.vehicleService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(id);
  }
}
