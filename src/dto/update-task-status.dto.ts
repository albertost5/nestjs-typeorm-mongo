import { IsEnum } from 'class-validator';
import { TaskStatus } from 'src/tasks/tasks-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
