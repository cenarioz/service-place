import { Logger, Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { Todo } from 'src/commons/models/todo.model';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

const logger = new Logger('Sequelize');
@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
