import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { Task } from './tasks.entity';

import { UpdateTaskStatusDto } from 'src/dto/update-task-status.dto';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.create(createTaskDto);
  }

  async createDefaultTask(): Promise<Task> {
    return this.taskRepository.createDefaultTask();
  }

  async find(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findById(id: string): Promise<Task> {
    return this.taskRepository.findById(id);
  }

  async update(id: string, taskStatusDto: UpdateTaskStatusDto): Promise<Task> {
    return this.taskRepository.update(id, taskStatusDto);
  }

  async delete(id: string): Promise<object> {
    return this.taskRepository.delete(id);
  }
}
