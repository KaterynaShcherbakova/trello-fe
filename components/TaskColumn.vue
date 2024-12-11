<template>
    <v-card class="dropzone" @dragover="onDragOver" @drop="onDrop">
        <v-card-title class="text-center justify-center">{{ status }}</v-card-title>
        <v-card-text>
            <div v-for="task in filteredTasks" :key="task.id" class="draggable-task" draggable="true"
                @dragstart="onDragStart(task)" @dragend="onDragEnd">
                <TaskItem :task="task" @edit="onEditTask" />
            </div>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="onOpenAddModal" color="primary" block>Add Task</v-btn>
        </v-card-actions>

        <TaskModal :visible="isModalVisible" @update:visible="isModalVisible = $event"
            :title="currentTask ? 'Edit Task' : 'Add Task'" :submitButtonText="currentTask ? 'Save Changes' : 'Create'"
            :initialData="currentTask || initialTaskData" @submit="onSubmitTask" />
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

const initialTaskData = ref({
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

const onEditTask = (task) => {
    currentTask.value = { ...task };
    isModalVisible.value = true;
};

const onSubmitTask = (taskData) => {
    if (currentTask.value) {
        console.log(taskData);
        store.editTask(currentTask.value.id, taskData);
    } else {
        store.addTask({ ...taskData });
    }
    isModalVisible.value = false;
};


const onDragStart = (task) => {
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
</script>

<style>
.dropzone {
    min-height: 150px;
    border-radius: 8px;
    border: 2px solid transparent;
    padding: 10px;
    background-color: #f9f9f9;
    transition: background-color 0.2s;
}

.draggable-task {
    cursor: grab;
    margin-bottom: 8px;
    transition: transform 0.2s ease, opacity 0.2s ease;
}

.draggable-task:active {
    cursor: grabbing;
}
</style>