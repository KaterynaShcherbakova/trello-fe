<template>
    <v-card>
        <v-card-title>{{ status }}</v-card-title>
        <v-card-text>
            <div v-for="task in filteredTasks" :key="task.id" class="draggable-task">
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
import { TaskStatus } from '@/interfaces/task';
import { useTaskStore } from '@/store/tasks';
import { ref, computed } from 'vue';

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
const filteredTasks = computed(() =>
    store.tasks.filter((task) => task.status === props.status)
);

const isModalVisible = ref(false);
const currentTask = ref(null);

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
        store.addTask({...taskData});
    }
    isModalVisible.value = false; 
};
</script>
