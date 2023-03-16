/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body } from '@nestjs/common';
import { AutosService } from './autos.service';
import { CreateAutoDto } from 'src/dto/create-auto.dto';
import { Auto } from 'src/interfaces/auto/auto.interface';

@Controller('autos')
export class AutosController {
    constructor(private readonly autosService: AutosService) {}

    @Post()
    async create(@Body() createAutoDto: CreateAutoDto) {
        this.autosService.create(createAutoDto);
    }

    @Get()
    async findAll(): Promise<Auto[]> {
        return this.autosService.findAll();
    }
}
