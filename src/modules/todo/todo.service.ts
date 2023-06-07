import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from 'src/commons/models/todo.model';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoRepository: typeof Todo
  ){

  }
  async getTodos(){
    return await this.todoRepository.findAll()
  }
}
