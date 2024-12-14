import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-tareas-eliminadas',
  templateUrl: './tareas-eliminadas.page.html',
  styleUrls: ['./tareas-eliminadas.page.scss'],
})
export class TareasEliminadasPage implements OnInit {
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
    this.tasks = await this.dbService.getTasks('deleted');
  }
}
