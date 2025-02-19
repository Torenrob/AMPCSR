import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CsrepService } from './csrep.service';
import { CreateEditCsrepDto } from './dto/create-csrep.dto';

@Controller('csrep')
export class CsrepController {
    constructor(private readonly csrepService: CsrepService) {}

    @Get()
    findAll() {
        return this.csrepService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.csrepService.findById(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCsrepDto: CreateEditCsrepDto,
    ) {
        return this.csrepService.update(id, updateCsrepDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.csrepService.remove(id);
    }
}
