<template>
    <v-dialog :model-value="visible" @update:model-value="onVisibilityChange" persistent max-width="600px">
        <v-card>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="onSubmit" v-model="isFormValid">
                    <v-text-field v-model="formData.title" label="Title" :rules="[rules.required]" required />
                    <v-textarea v-model="formData.description" label="Description" rows="3" />
                    <v-select v-model="formData.priority" :items="priorityOptions" label="Priority" />
                    <v-btn type="submit" :disabled="!isFormValid" color="primary" block>{{ submitButtonText }}</v-btn>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="secondary" text @click="onCancel">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TaskPriority } from '@/interfaces/task';

const props = defineProps({
    visible: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        default: 'Add Task',
    },
    initialData: {
        type: Object,
        default: () => ({
            title: '',
            description: '',
            priority: 'Medium',
        }),
    },
    submitButtonText: {
        type: String,
        default: 'Create',
    },
});

const emit = defineEmits(['update:visible', 'submit']);
const priorityOptions = Object.values(TaskPriority);
const formData = ref({ ...props.initialData });
const isFormValid = ref(false);

const rules = {
    required: (value: string) => !!value || 'Title is required',
};

const onVisibilityChange = (value: boolean) => {
    emit('update:visible', value);
};

const onCancel = () => {
    emit('update:visible', false);
    resetForm();
};

const onSubmit = () => {
    if (isFormValid.value) {
        emit('submit', formData.value);
        emit('update:visible', false);
        resetForm();
    }
};

const resetForm = () => {
    formData.value = { ...props.initialData };
};
</script>