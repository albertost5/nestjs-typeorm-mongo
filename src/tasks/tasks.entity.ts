import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { TaskStatus } from './tasks-status.enum';

@Entity()
export class Task {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TaskStatus.OPEN })
  status: TaskStatus;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.status = TaskStatus.OPEN;
  }
}
