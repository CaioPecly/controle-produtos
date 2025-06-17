import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>
  ) {}

  async create(data: Partial<Project>): Promise<Project> {
    const createdProject = new this.projectModel(data);
    return createdProject.save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async findOne(id: string): Promise<Project | null> {
    return this.projectModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<Project>): Promise<Project | null> {
    return this.projectModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }).exec();
  }

  async delete(id: string): Promise<Project | null> {
    return this.projectModel.findByIdAndDelete(id).exec();
  }
}
