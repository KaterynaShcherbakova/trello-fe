<template>
  <v-app>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="4">
            <TaskColumn status="TODO" />
          </v-col>
          <v-col cols="12" md="4">
            <TaskColumn status="In Progress" />
          </v-col>
          <v-col cols="12" md="4">
            <TaskColumn status="Done" />
          </v-col>
        </v-row>
      </v-container>
  </v-app>
</template>

<script setup>
import TaskColumn from '@/components/TaskColumn.vue';
</script>
