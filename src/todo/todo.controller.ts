import { Controller, Get } from '@nestjs/common';

import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getUsers(): string {
    return '';
    // return this.todoService.getAllUsers();
  }
}
