import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/project-manager'),
    ProjectsModule,
  ],
})
export class AppModule {}
