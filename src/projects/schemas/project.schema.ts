import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ default: 'planejado' })
  status: 'planejado' | 'em andamento' | 'concluído';
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
