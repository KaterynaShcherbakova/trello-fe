<template>
    <v-card>
        <v-card-title>{{ status }}</v-card-title>
        <v-card-text>
            <div v-for="task in filteredTasks" :key="task.id" class="draggable-task" @dragstart="onDragStart(task.id)"
                draggable>
                <TaskItem :task="task" />
            </div>
        </v-card-text>
        <!-- <div class="dropzone" @dragover.prevent @drop="onDrop"></div> -->
        <v-card-actions>
            <v-btn @click="onOpenModal" color="primary" block>Add Task</v-btn>
        </v-card-actions>
    </v-card>
    <TaskModal :visible="isModalVisible" @update:visible="isModalVisible = $event" title="Add Task"
        submitButtonText="Create" :initialData="initialTaskData" @submit="onAddTask" />
</template>

<script setup lang="ts">
import TaskItem from '@/components/TaskItem.vue';
import { useTaskStore } from '@/store/tasks';
import TaskModal from '@/components/TaskModal.vue';

const props = defineProps({
    status: {
        type: String,
        required: true,
    },
});

const store = useTaskStore();

const filteredTasks = computed(() =>
    store.tasks.filter((task) => task.status === props.status)
);

const isModalVisible = ref<boolean>(false);
const initialTaskData = ref({
    title: '',
    description: '',
    priority: 'Medium',
});

const onOpenModal = () => {
    isModalVisible.value = true;
};

const onAddTask = (taskData) => {
    store.addTask({
        ...taskData,
        status: props.status as TaskStatus,
    });
};

const onDragStart = (taskId) => {
    sessionStorage.setItem('draggedTaskId', taskId);
};

const onDrop = () => {
    const taskId = sessionStorage.getItem('draggedTaskId');
    store.changeTaskStatus(taskId, props.status);
    sessionStorage.removeItem('draggedTaskId');
};
</script>