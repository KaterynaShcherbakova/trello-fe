<template>
    <v-card class="mb-2">
        <v-card-title>{{ task.title }}</v-card-title>
        <v-card-subtitle>{{ task.description }}</v-card-subtitle>
        <v-card-actions class="d-flex justify-space-around">
            <v-btn small @click="onEdit">Edit</v-btn>
            <v-btn small color="error" @click="onDelete">Delete</v-btn>
        </v-card-actions>

    </v-card>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/store/tasks';

const props = defineProps({
    task: {
        type: Object,
        required: true,
    },
});

const store = useTaskStore();

const onEdit = () => {
    // Open edit form (implement modal logic)
    console.log('Edit task:', props.task.id);
};

const onDelete = () => {
    store.deleteTask(props.task.id);
};
</script>