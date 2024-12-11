import { ref } from 'vue';
import type { Task } from '@/interfaces/task';

export const draggedTask = ref<Task | null>(null); 
