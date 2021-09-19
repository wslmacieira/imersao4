import { TenantGuard } from './../tenant/tenant.guard';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}
