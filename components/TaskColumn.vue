<template>
    <v-card>
        <v-card-title>{{ status }}</v-card-title>
    </v-card>
</template>

<script setup>
const props = defineProps({
    status: {
        type: String,
        required: true,
    },
});

</script>