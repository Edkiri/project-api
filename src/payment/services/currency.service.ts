import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCurrencyDto } from '../dto';
import { Currency } from '../entities';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency) private currencyRepo: Repository<Currency>,
  ) {}

  async findOneByName(name: string) {
    const currency = await this.currencyRepo.findOne({
      where: { name },
    });
    if (!currency) {
      throw new HttpException(`Not found currency with name '${name}'.`, 404);
    }
    return currency;
  }

  async find() {
    return this.currencyRepo.find();
  }

  async create(data: CreateCurrencyDto) {
    const { name } = data;
    const currency = await this.currencyRepo.findOne({
      where: { name },
    });
    if (currency) {
      throw new BadRequestException(
        `Ya existe una moneda '${name}' en la base de datos`,
      );
    }
    return this.currencyRepo.save(data);
  }
}
