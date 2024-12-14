import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Task } from '../../interfaces/task.interface';
import { ModalController } from '@ionic/angular';
import { Pantalla2Page } from '../pantalla2/pantalla2.page';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
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

  constructor(
    private dbService: DatabaseService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    await this.loadTasks();
  }

  async loadTasks() {
    this.tasks = await this.dbService.getTasks('active');
  }

  async markTaskAsCompleted(id: string) {
    await this.dbService.markAsCompleted(id);
    await this.loadTasks();
  }

  async deleteTask(id: string) {
    await this.dbService.deleteTask(id);
    await this.loadTasks();
  }

  async saveTask() {
    if (this.isEditing) {
      await this.dbService.updateTask(this.task);
    } else {
      await this.dbService.addTask(this.task);
    }
    await this.loadTasks();
    await this.closeModal();
  }

  async closeModal() {
    this.modalCtrl.dismiss();
  }

  async openTaskModal(task: Task | null = null) {
    console.log(task);
    const modal = await this.modalCtrl.create({
      component: Pantalla2Page,
      componentProps: {
        task,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data === 'success') {
        this.loadTasks();
      }
    });

    return modal.present();
  }
}
