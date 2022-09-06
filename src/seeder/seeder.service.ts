import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { ConfigType } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { TransactionFor } from 'nest-transact';
import config from 'src/config/config';

import { UserService } from 'src/user/user.service';
import { WorkService, WorkTypeService } from 'src/work/services';
import { workData, workTypesData } from './inital-data';

@Injectable()
export class SeederService extends TransactionFor<SeederService> {
  constructor(
    @Inject(config.KEY)
    private configService: ConfigType<typeof config>,
    private userService: UserService,
    private workTypeService: WorkTypeService,
    private workService: WorkService,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

  async seed() {
    console.log('Starting seed...');
    await this.seedAdminUser();
    await this.seedWorkTypes();
    await this.seedWorks();
  }

  async seedAdminUser() {
    const oldAdmin = await this.userService.findOneByUsername(
      this.configService.adminUser.username,
    );
    if (oldAdmin) return;
    await this.userService.create({
      email: this.configService.adminUser.email,
      password: this.configService.adminUser.password,
      username: this.configService.adminUser.username,
    });
  }

  async seedWorkTypes() {
    const createPromises = workTypesData.map(async (workType) => {
      try {
        await this.workTypeService.findOneByName(workType.name);
        return;
      } catch {
        return this.workTypeService.create(workType);
      }
    });
    console.log(createPromises);
    await Promise.all(createPromises);
  }

  async seedWorks() {
    const createPromises = workData.map(async (work) => {
      try {
        await this.workService.findOneByWorkData(work);
        return;
      } catch {
        return this.workService.create(work);
      }
    });
    console.log(createPromises);
    await Promise.all(createPromises);
  }
}
