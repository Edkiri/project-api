import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto, UpdateAccountDto } from '../dto';
import { Account } from '../entities';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private AccountRepo: Repository<Account>,
  ) {}

  async create(data: CreateAccountDto) {
    return this.AccountRepo.save(data);
  }

  async findOne(accountId: number) {
    const account = await this.AccountRepo.findOne({
      where: { id: accountId },
    });
    if (!account) {
      throw new NotFoundException(`Not found account with id '${accountId}'`);
    }
    return account;
  }

  async find() {
    return this.AccountRepo.find();
  }

  async update(accountId: number, changes: UpdateAccountDto) {
    const account = await this.findOne(accountId);
    this.AccountRepo.merge(account, changes);
    return this.AccountRepo.save(account);
  }

  async delete(accountId: number) {
    const account = await this.findOne(accountId);
    await this.AccountRepo.remove(account);
    return {
      message: 'Account deleted',
    };
  }
}
