import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { MongoRepository } from 'typeorm';
import { Task } from './tasks.entity';
import { ObjectID } from 'mongodb';
import { UpdateTaskStatusDto } from 'src/dto/update-task-status.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: MongoRepository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTask = new Task(title, description);
    try {
      await this.taskRepository.save(newTask);
    } catch (error) {
      throw new BadRequestException(
        'There was a problem creating the new task.',
      );
    }

    return newTask;
  }

  async find(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findById(id: string): Promise<Task> {
    return await this.taskRepository.findOne({
      where: {
        _id: new ObjectID(id),
      } as any,
    });
  }

  async update(id: string, taskStatusDto: UpdateTaskStatusDto): Promise<Task> {
    const { status } = taskStatusDto;
    let task = await this.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found.');
    } else {
      // await this.taskRepository.update(task, {status: status});
      // task = await this.findById(id);

      task.status = status;
      await this.taskRepository.save(task);

      return task;
    }
  }

  async delete(id: string): Promise<object> {
    const task = await this.findById(id);
    let response = {
      message: '',
    };
    if (task) {
      await this.taskRepository.delete(id);
      response.message = `The task ${id} was deleted successfully!`;
    } else {
      response.message = 'Task not found';
      throw new NotFoundException(response);
    }
    return response;
  }
}
