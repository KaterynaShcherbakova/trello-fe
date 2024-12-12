<template>
    <v-dialog :model-value="visible" @update:model-value="onVisibilityChange" persistent max-width="600px">
        <v-card>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="onSubmit" v-model="isFormValid">
                    <v-text-field v-model="formData.title" label="Title" :rules="[rules.required]" required />
                    <v-textarea v-model="formData.description" label="Description" rows="3" />
                    <v-select v-model="formData.assignee" :items="availableAssignees" label="Assignee"
                        :rules="[rules.required]" required />
                    <v-combobox v-model="formData.performers" :items="availablePerformers" label="Performers" multiple
                        :rules="[rules.requiredArray]" required />
                    <v-select v-model="formData.status" :items="statusOptions" label="Status" :rules="[rules.required]"
                        required />
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
import { ref, watch } from 'vue';
import { TaskPriority } from '@/interfaces/task';
import { TaskStatus } from '@/interfaces/task';

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
            assignee: '',
            performers: [],
            status: TaskStatus.TODO,
            priority: TaskPriority.MEDIUM,
        }),
    },
    submitButtonText: {
        type: String,
        default: 'Create',
    },
});

const emit = defineEmits(['update:visible', 'submit']);
const priorityOptions = Object.values(TaskPriority);
const statusOptions = Object.values(TaskStatus);

const availablePerformers = ['Maria Shevchenko', 'Anna Malar', 'Daniel Coch', 'Borys Boyko'];
const availableAssignees = ['Maria Shevchenko', 'Anna Malar', 'Daniel Coch'];

const formData = ref({ ...props.initialData });
const isFormValid = ref<boolea>(false);

watch(
    () => props.initialData,
    (newData) => {
        formData.value = { ...newData };
    },
    { immediate: true }
);

const rules = {
    required: (value: string) => !!value || 'Field is required.',
    requiredArray: (value: string[]) => value.length > 0 || 'Array can not be empty.',

};

const onVisibilityChange = (value: boolean) => {
    emit('update:visible', value);
};

const onCancel = () => {
    emit('update:visible', false);
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