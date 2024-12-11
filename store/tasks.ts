import { defineStore } from 'pinia';
import type { Task, TaskStatus } from '~/interfaces/task';

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [] as Task[],
    }),
    getters: {
        tasksByStatus: (state) => (status: TaskStatus): Task[] =>
            state.tasks.filter((task) => task.status === status)
    },
    actions: {
        addTask(task: Omit<Task, 'id'>) {
            const newTask: Task = {
                ...task,
                id: Date.now(),
            };
            this.tasks.push(newTask);
        },
        editTask(taskId: number, updatedTask: Partial<Task>) {
            const index = this.tasks.findIndex((task) => task.id === taskId);
            if (index !== -1) {
                this.tasks[index] = {
                    ...this.tasks[index],
                    ...updatedTask,
                };
            } else {
                console.warn(`Task with ID ${taskId} not found.`);
            }
        },
        deleteTask(taskId: number) {
            this.tasks = this.tasks.filter((task) => task.id !== taskId);
        },
    },
});
