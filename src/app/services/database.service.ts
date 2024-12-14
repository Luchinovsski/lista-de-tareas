import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private isMobile: boolean;
  private initialized = false;
  private initializationPromise: Promise<void>;

  constructor(private platform: Platform) {
    this.isMobile = this.platform.is('hybrid');
    this.initializationPromise = this.initializeStorage();
  }

  private async initializeStorage() {
    try {
      if (this.isMobile) {
        await this.initializeDB();
      } else {
        this.initializeLocalStorage();
      }
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing storage:', error);
    }
  }

  private async initializeDB() {
    try {
      this.db = await this.sqlite.createConnection(
        'tasks_db',
        false,
        'no-encryption',
        1,
        false
      );
      await this.db.open();

      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          category TEXT,
          priority TEXT,
          dueDate TEXT,
          status TEXT
        )
      `);
    } catch (error) {
      console.error('Error initializing SQLite:', error);
    }
  }

  private initializeLocalStorage() {
    if (!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', JSON.stringify([]));
    }
  }

  async waitForInitialization() {
    await this.initializationPromise;
  }

  private formatDate(date: string | Date): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      throw new Error('Invalid date');
    }
    return d.toISOString();
  }

  async initializeDatabase(): Promise<void> {
    await this.waitForInitialization();
  }

  async addTask(task: Omit<Task, 'id' | 'status'>): Promise<void> {
    await this.waitForInitialization();

    try {
      const formattedDate = this.formatDate(task.dueDate);
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        status: 'active',
        dueDate: formattedDate,
      };

      if (this.isMobile) {
        await this.db.run(`INSERT INTO tasks VALUES (?, ?, ?, ?, ?, ?, ?)`, [
          newTask.id,
          newTask.title,
          newTask.description,
          newTask.category,
          newTask.priority,
          formattedDate,
          newTask.status,
        ]);
      } else {
        const tasks = this.getLocalStorageTasks();
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  async getTasks(status: string): Promise<Task[]> {
    await this.waitForInitialization();

    if (this.isMobile) {
      try {
        const result = await this.db.query(
          `SELECT * FROM tasks WHERE status = ?`,
          [status]
        );
        if (result?.values) {
          return result.values.map((row) => ({
            ...row,
            dueDate: this.formatDate(row.dueDate),
          }));
        }
        return [];
      } catch (error) {
        console.error('Error getting tasks from SQLite:', error);
        return [];
      }
    } else {
      try {
        const tasks = this.getLocalStorageTasks();
        return tasks
          .filter((task) => task.status === status)
          .map((task) => ({
            ...task,
            dueDate: this.formatDate(task.dueDate),
          }));
      } catch (error) {
        console.error('Error getting tasks from localStorage:', error);
        return [];
      }
    }
  }

  async updateTask(task: Task): Promise<void> {
    await this.waitForInitialization();

    try {
      const formattedDate = this.formatDate(task.dueDate);
      const updatedTask: Task = {
        ...task,
        dueDate: formattedDate,
      };

      if (this.isMobile) {
        await this.db.run(
          `UPDATE tasks SET title=?, description=?, category=?, priority=?, dueDate=?, status=? WHERE id=?`,
          [
            updatedTask.title,
            updatedTask.description,
            updatedTask.category,
            updatedTask.priority,
            formattedDate,
            updatedTask.status,
            updatedTask.id,
          ]
        );
      } else {
        const tasks = this.getLocalStorageTasks();
        const index = tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) {
          tasks[index] = updatedTask;
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
      }
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async markAsCompleted(taskId: string): Promise<void> {
    await this.waitForInitialization();
    if (this.isMobile) {
      try {
        await this.db.run(`UPDATE tasks SET status=? WHERE id=?`, [
          'completed',
          taskId,
        ]);
      } catch (error) {
        console.error('Error marking task as completed in SQLite:', error);
        throw error;
      }
    } else {
      const tasks = this.getLocalStorageTasks();
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        task.status = 'completed';
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.waitForInitialization();
    if (this.isMobile) {
      try {
        await this.db.run(`UPDATE tasks SET status=? WHERE id=?`, [
          'deleted',
          taskId,
        ]);
      } catch (error) {
        console.error('Error deleting task in SQLite:', error);
        throw error;
      }
    } else {
      const tasks = this.getLocalStorageTasks();
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        task.status = 'deleted';
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }
  }

  private getLocalStorageTasks(): Task[] {
    try {
      const tasksJson = localStorage.getItem('tasks');
      if (tasksJson) {
        return JSON.parse(tasksJson).map((task: any) => ({
          ...task,
          dueDate: this.formatDate(task.dueDate),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error parsing tasks from localStorage:', error);
      return [];
    }
  }
}
