import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskStatusDto } from 'src/dto/update-task-status.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Query('default', ParseBoolPipe) type: boolean,
  ): Promise<Task> {
    if (type) return this.tasksService.createDefaultTask();
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  find(): Promise<Task[]> {
    return this.tasksService.find();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() taskStatusDto: UpdateTaskStatusDto) {
    return this.tasksService.update(id, taskStatusDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<object> {
    return this.tasksService.delete(id);
  }
}
