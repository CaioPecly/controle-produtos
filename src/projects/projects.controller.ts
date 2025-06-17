import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './schemas/project.schema';

// Tipos aceitos para status
const allowedStatuses = ['planejado', 'em andamento', 'concluído'] as const;
type ProjectStatus = typeof allowedStatuses[number];

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @Body('title') bodyTitle?: string,
    @Body('description') bodyDesc?: string,
    @Body('startDate') bodyStart?: string,
    @Body('endDate') bodyEnd?: string,
    @Body('status') bodyStatus?: string,

    @Query('title') queryTitle?: string,
    @Query('description') queryDesc?: string,
    @Query('startDate') queryStart?: string,
    @Query('endDate') queryEnd?: string,
    @Query('status') queryStatus?: string
  ): Promise<Project> {
    const title = bodyTitle || queryTitle;
    const description = bodyDesc || queryDesc;
    const startDate = new Date(bodyStart || queryStart || '');
    const endDate = new Date(bodyEnd || queryEnd || '');

    const statusInput = bodyStatus || queryStatus || 'planejado';
    const status: ProjectStatus = allowedStatuses.includes(statusInput as ProjectStatus)
      ? (statusInput as ProjectStatus)
      : 'planejado';

    if (!title) {
      throw new BadRequestException('O campo "title" é obrigatório.');
    }

    return this.projectsService.create({
      title,
      description,
      startDate: isNaN(startDate.getTime()) ? undefined : startDate,
      endDate: isNaN(endDate.getTime()) ? undefined : endDate,
      status,
    });
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Project | null> {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Project>,
    @Query('title') title?: string,
    @Query('description') description?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('status') queryStatus?: string
  ): Promise<Project | null> {
    const mergedStatus = body.status ?? queryStatus;

    const status: ProjectStatus | undefined = mergedStatus && allowedStatuses.includes(mergedStatus as ProjectStatus)
      ? (mergedStatus as ProjectStatus)
      : undefined;

    const updateData: Partial<Project> = {
      title: body.title ?? title,
      description: body.description ?? description,
      startDate: new Date(body.startDate || startDate || ''),
      endDate: new Date(body.endDate || endDate || ''),
      status,
    };

    if (isNaN(updateData.startDate?.getTime()!)) delete updateData.startDate;
    if (isNaN(updateData.endDate?.getTime()!)) delete updateData.endDate;

    return this.projectsService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Project | null> {
    return this.projectsService.delete(id);
  }
}
