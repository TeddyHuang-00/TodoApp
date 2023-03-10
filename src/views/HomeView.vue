<template>
  <div>
    <!-- Filters -->
    <nav class="max-w-screen-sm mt-5 mx-auto text-center">
      <button class="nav-button" @click="filter = 'all'">All</button>
      <button class="nav-button" @click="filter = 'favs'">Favorites</button>
    </nav>

    <!-- Task list -->
    <div class="container max-w-screen-sm" v-if="filter == 'all'">
      <div v-if="!taskStore.tasks.length">
        <p class="my-10 text-center">Nothing to do yet... Add one now!</p>
      </div>
      <div v-else>
        <p class="my-5 mx-auto">All tasks</p>
        <div
          v-for="task in taskStore.pinned"
          :key="task.uuid"
          class="todo-item-container"
        >
          <TaskOverview :task="task"></TaskOverview>
        </div>
        <div
          v-for="task in taskStore.unpinned"
          :key="task.uuid"
          class="todo-item-container"
        >
          <TaskOverview :task="task"></TaskOverview>
        </div>
      </div>
    </div>
    <div class="container max-w-screen-sm" v-else>
      <div v-if="!taskStore.favorites.length">
        <p class="my-10 text-center">No favorite tasks yet... Add one now!</p>
      </div>
      <div v-else>
        <p class="my-5 mx-auto">Favorite tasks</p>
        <div
          v-for="task in taskStore.favorites"
          :key="task.uuid"
          class="todo-item-container"
        >
          <TaskOverview :task="task"></TaskOverview>
        </div>
      </div>
    </div>

    <Teleport to="header">
      <!-- New Task -->
      <TaskForm></TaskForm>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/TaskStore";
import TaskOverview from "@/components/TaskOverview.vue";
import { ref } from "vue";
import type FilterType from "@/types/FilterType";
import TaskForm from "@/components/TaskForm.vue";

const taskStore = useTaskStore();
taskStore.loadFromLocalStorage();
const filter = ref("all" as FilterType);
</script>

<style>
.nav-button {
  @apply inline-block ml-5 bg-gray-50 rounded-md border-none shadow-lg py-2 px-4 cursor-pointer text-sm font-medium text-gray-700 hover:shadow-md hover:bg-gray-100 transition-all;
}
.todo-item-container {
  @apply my-5 mx-auto;
}
</style>
