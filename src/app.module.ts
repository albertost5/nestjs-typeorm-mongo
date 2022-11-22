import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   host: '127.0.0.1',
    //   port: +27017,
    //   username: 'root',
    //   password: '',
    //   database: 'nestjs-mongo',
    //   autoLoadEntities: true,
    //   synchronize: true, // disable in prod
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }),
    TasksModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
