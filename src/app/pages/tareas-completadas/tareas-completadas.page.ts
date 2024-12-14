import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-tareas-completadas',
  templateUrl: './tareas-completadas.page.html',
  styleUrls: ['./tareas-completadas.page.scss'],
})
export class TareasCompletadasPage implements OnInit {
  tasks: Task[] = [];
  task: Task = {
    title: '',
    description: '',
    category: '',
    priority: '',
    dueDate: '',
    id: '',
    status: '',
  };
  isEditing = false;

  constructor(private dbService: DatabaseService) {}

  async ngOnInit() {
    await this.loadTasks();
  }

  async loadTasks() {
    this.tasks = await this.dbService.getTasks('completed');
  }
}
