import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBudgetUnitDto } from '../dto';
import { BudgetUnit } from '../entities';

@Injectable()
export class BudgetUnitService {
  constructor(
    @InjectRepository(BudgetUnit) private budgetRepo: Repository<BudgetUnit>,
  ) {}

  async findOneByName(name: string) {
    const type = await this.budgetRepo.findOne({
      where: { name },
    });
    if (!type) {
      throw new HttpException(
        `Not found budget-unit with name '${name}'.`,
        404,
      );
    }
    return type;
  }

  async find() {
    return this.budgetRepo.find();
  }

  async create(data: CreateBudgetUnitDto) {
    const { name } = data;
    const workType = await this.budgetRepo.findOne({
      where: { name },
    });
    if (workType) {
      throw new BadRequestException(
        `Ya existe una unidad de medida '${name}' en la base de datos`,
      );
    }
    return this.budgetRepo.save(data);
  }
}
