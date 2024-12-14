import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Task } from '../../interfaces/task.interface';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pantalla2',
  templateUrl: './pantalla2.page.html',
  styleUrls: ['./pantalla2.page.scss'],
})
export class Pantalla2Page implements OnInit {
  @Input() task: any;

  tasks: Task[] = [];
  filteredTasks: Task[] = []; // Lista de tareas filtradas según la búsqueda
  newTask: Omit<Task, 'id' | 'status'> = {
    title: '',
    description: '',
    category: '',
    priority: '',
    dueDate: '',
  };

  selectedTask: Task | null = null; // Almacena la tarea seleccionada para editar
  searchText: string = ''; // Texto para la barra de búsqueda

  constructor(
    private dbService: DatabaseService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    if (this.task) {
      this.editTask(this.task);
    }

    try {
      // Esperar a que la base de datos esté inicializada antes de cargar las tareas
      await this.dbService.waitForInitialization(); // Asegurarse de que la DB esté lista
      this.loadTasks(); // Después de la inicialización, carga las tareas
    } catch (error) {
      console.error('Error initializing the database:', error);
    }
  }

  // Cargar tareas activas
  async loadTasks() {
    try {
      this.tasks = await this.dbService.getTasks('active');
      this.filteredTasks = [...this.tasks]; // Inicializar filteredTasks con todas las tareas
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }

  // Agregar o actualizar tarea
  async addTask() {
    if (this.newTask.title) {
      try {
        if (this.selectedTask) {
          // Si hay una tarea seleccionada, actualizarla
          const updatedTask = {
            ...this.selectedTask,
            ...this.newTask, // Actualizar con los valores del formulario
          };
          await this.dbService.updateTask(updatedTask);
          console.log('Tarea actualizada');
        } else {
          // Si no hay tarea seleccionada, agregar una nueva
          const newTaskWithId = {
            ...this.newTask,
            id: Date.now().toString(),
            status: 'active', // El estado inicial es 'active'
          };
          await this.dbService.addTask(newTaskWithId);
          console.log('Nueva tarea agregada');
        }
        this.loadTasks(); // Recargar las tareas para reflejar el cambio
        this.resetForm(); // Limpiar el formulario
      } catch (error) {
        console.error('Error adding or updating task:', error);
      }
    }

    this.modalController.dismiss('success');
  }

  // Editar tarea
  editTask(task: Task) {
    this.selectedTask = task;
    this.newTask = {
      title: task.title,
      description: task.description,
      category: task.category,
      priority: task.priority,
      dueDate: task.dueDate,
    };
  }

  // Eliminar tarea
  async deleteTask(taskId: string) {
    try {
      await this.dbService.deleteTask(taskId);
      this.loadTasks(); // Recargar las tareas después de eliminar
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  // Marcar tarea como completada
  async markAsCompleted(taskId: string) {
    try {
      await this.dbService.markAsCompleted(taskId);
      this.loadTasks(); // Recargar las tareas después de marcarla como completada
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  }

  // Restablecer el formulario y la tarea seleccionada
  resetForm() {
    this.newTask = {
      title: '',
      description: '',
      category: '',
      priority: '',
      dueDate: '',
    };
    this.selectedTask = null; // Limpiar la tarea seleccionada
  }
}
