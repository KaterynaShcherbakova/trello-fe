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

        <TaskModal
            :visible="isModalVisible"
            @update:visible="isModalVisible = $event"
            :title="currentTask ? 'Edit Task' : 'Add Task'"
            :submitButtonText="currentTask ? 'Save Changes' : 'Create'"
            :initialData="currentTask || { title: '', description: '', priority: 'Medium' }"
            @submit="onSubmitTask"
        />
    </v-card>
</template>

<script setup lang="ts">
import TaskItem from '@/components/TaskItem.vue';
import TaskModal from '@/components/TaskModal.vue';
import { useTaskStore } from '@/store/tasks';
import { ref, computed } from 'vue';

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

const isModalVisible = ref(false);
const currentTask = ref(null); // Track the current task for add/edit

// Open modal for adding a task
const onOpenAddModal = () => {
    currentTask.value = null; // Reset currentTask for adding
    isModalVisible.value = true;
};

// Open modal for editing a task
const onEditTask = (task) => {
    currentTask.value = { ...task }; // Set the task data for editing
    isModalVisible.value = true;
};

// Handle task submission
const onSubmitTask = (taskData) => {
    if (currentTask.value) {
        // Edit existing task
        store.editTask(currentTask.value.id, taskData);
    } else {
        // Add new task
        store.addTask({
            ...taskData,
            status: props.status,
        });
    }
    isModalVisible.value = false; // Close modal
};
</script>
