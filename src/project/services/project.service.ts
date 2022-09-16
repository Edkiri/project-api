import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from '../../budget/entities';
import { Repository } from 'typeorm';
import { CreateProjectDto, UpdateProjectDto } from '../dto';
import { Project } from '../entities';
import { ProjectTypeService } from './project-type.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    private projectTypeService: ProjectTypeService,
  ) {}

  async create(data: CreateProjectDto) {
    const { description } = data;
    const type = await this.projectTypeService.findOneByName(data.typeName);
    const oldProject = await this.projectRepo.findOne({
      where: { description },
    });
    if (oldProject)
      throw new BadRequestException(`Project '${description}' already exists.`);
    const newProject = this.projectRepo.create(data);
    newProject.type = type;
    return this.projectRepo.save(newProject);
  }

  async update(projectId: number, changes: UpdateProjectDto) {
    const project = await this.findOne(projectId);
    if (changes.typeName) {
      const type = await this.projectTypeService.findOneByName(
        changes.typeName,
      );
      project.type = type;
    }
    if (changes.description) {
      const oldProject = await this.findOneByDescription(changes.description);
      if (oldProject)
        throw new BadRequestException(
          `A project with description '${changes.description}' already exists`,
        );
    }
    this.projectRepo.merge(project, changes);
    return this.projectRepo.save(project);
  }

  async delete(projectId: number) {
    const project = await this.findOne(projectId);
    await this.projectRepo.remove(project);
    return {
      message: 'Project deleted',
    };
  }

  async findOne(id: number) {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (!project)
      throw new NotFoundException(`Not found project with id '${id}'`);
    return project;
  }

  async findOneByDescription(description: string): Promise<Project | null> {
    return this.projectRepo.findOne({
      where: { description },
    });
  }

  async findBudgets(projectId: number): Promise<Budget[]> {
    const project = await this.projectRepo.findOne({
      where: { id: projectId },
      relations: { budgets: true },
    });
    if (!project) {
      throw new NotFoundException(`Not found project with id '${projectId}'`);
    }
    return project.budgets;
  }

  async findActiveProjects() {
    return this.projectRepo.find({
      where: { isFinished: false },
    });
  }

  async findOneByProjectData(projectData: CreateProjectDto) {
    const { description, clientName } = projectData;
    const project = await this.projectRepo.findOne({
      where: { description, clientName },
    });
    if (!project)
      throw new NotFoundException(`Not found project '${description}'`);
    return project;
  }
}
