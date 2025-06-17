export class CreateProjectDto {
  title: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: 'planejado' | 'em andamento' | 'concluído';
}
