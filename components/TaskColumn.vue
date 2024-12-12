<template>
    <v-card class="dropzone bg-grey-lighten-4" @dragover="onDragOver" @drop="onDrop">
        <v-card-title class="text-center justify-center">{{ status }}</v-card-title>
        <v-card-text>
            <div v-for="task in filteredTasks" :key="task.id" class="draggable-task" draggable="true"
                @dragstart="onDragStart(task)" @dragend="onDragEnd">
                <TaskItem :task="task" @edit="onEditTask" :class="getPriorityClass(task.priority)" />
            </div>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="onOpenAddModal" color="primary" block>Add Task</v-btn>
        </v-card-actions>

        <TaskModal :visible="isModalVisible" @update:visible="isModalVisible = $event"
            :title="currentTask ? 'Edit Task' : 'Add Task'" :submitButtonText="currentTask ? 'Save Changes' : 'Create'"
            :initialData="currentTask || initialTask" @submit="onSubmitTask" />
    </v-card>
</template>

<script setup lang="ts">
import TaskItem from '@/components/TaskItem.vue';
import TaskModal from '@/components/TaskModal.vue';
import { TaskPriority } from '@/interfaces/task';
import { Task } from '@/interfaces/task';
import { TaskStatus } from '@/interfaces/task';
import { useTaskStore } from '@/store/tasks';
import { ref, computed } from 'vue';
import { draggedTask } from '@/state/draggedTaskState';

const props = defineProps({
    status: {
        type: String,
        required: true,
    },
});

const initialTask = ref<Task>({
    title: '',
    description: '',
    assignee: '',
    performers: [],
    status: props.status,
    priority: TaskPriority.MEDIUM,
});

const store = useTaskStore();
const isModalVisible = ref<boolean>(false);
const currentTask = ref<Task>(null);

const filteredTasks = computed(() => store.tasksByStatus(props.status));

const onOpenAddModal = () => {
    currentTask.value = null;
    isModalVisible.value = true;
};

const onEditTask = (task: Task) => {
    currentTask.value = { ...task };
    isModalVisible.value = true;
};

const onSubmitTask = (task: Task) => {
    if (currentTask.value) {
        store.editTask(currentTask.value.id, task);
    } else {
        store.addTask({ ...task });
    }
    isModalVisible.value = false;
};


const onDragStart = (task: Task) => {
    draggedTask.value = task;
};

const onDragOver = (event) => {
    event.preventDefault();
};

const onDrop = () => {
    if (draggedTask.value) {
        store.editTask(draggedTask.value.id, { status: props.status });
        draggedTask.value = null;
    }
};

const onDragEnd = () => {
    draggedTask.value = null;
};

const getPriorityClass = (priority: TaskPriority) => {
    switch (priority) {
        case TaskPriority.HIGH:
            return 'priority-high';
        case TaskPriority.MEDIUM:
            return 'priority-medium';
        case TaskPriority.LOW:
            return 'priority-low';
        default:
            return '';
    }
};
</script>

<style>
.draggable-task {
    cursor: grab;
    margin-bottom: 8px;
    transition: transform 0.2s ease, opacity 0.2s ease;
    border-top-left-radius: 0px !important;
}

.draggable-task:active {
    cursor: grabbing;
}

.priority-high {
    border-left: 5px solid rgb(215, 104, 104);
}

.priority-medium {
    border-left: 5px solid rgb(240, 188, 90);
}

.priority-low {
    border-left: 5px solid rgb(78, 140, 78);
}
</style>