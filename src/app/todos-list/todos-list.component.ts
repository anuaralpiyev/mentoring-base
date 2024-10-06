import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodosApiService } from '../todos-api.service';
import { TodosService } from '../todos.service';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.component';
import { TodoInterface } from '../interfaces/todo-interfaces';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [NgFor, NgIf, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush делает работу с данными намного быстрее
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);
  readonly todosService = inject(TodosService); // передаем из файла todos.service.ts

  constructor() {
    // подписка => получение данных методом getTodos
    this.todosApiService.getTodos().subscribe(
      (response: any) => {
        // подписка => установка и загрузка данных методом setTodos
        this.todosService.setTodos(response);
      }
    )
  }

  deleteTodo(id: number) {
    // удаления данных используя метод deleteTodo
    this.todosService.deleteTodo(id);
  }

  createTodo(formData: TodoInterface) {
    this.todosService.createTodo({
      userId: formData.userId,
      id: formData.id,
      title: formData.title,
      completed: formData.completed,
    });
  }
}