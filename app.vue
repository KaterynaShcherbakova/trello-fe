<template>
  <v-app>
    <h1 class="text-h3">Task Tracker</h1>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4">
          <TaskColumn :status="TaskStatus.TODO" />
        </v-col>
        <v-col cols="12" md="4">
          <TaskColumn :status="TaskStatus.IN_PROGRESS" />
        </v-col>
        <v-col cols="12" md="4">
          <TaskColumn :status="TaskStatus.DONE" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import TaskColumn from '@/components/TaskColumn.vue';
import { TaskStatus } from '@/interfaces/task';

</script>

<style>
.text-h3 {
  margin: 24px;
}
</style>
