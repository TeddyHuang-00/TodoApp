<template>
  <div
    class="container py-5 px-7 bg-gray-50 rounded-xl shadow-lg flex justify-between items-center"
  >
    <h3 class="inline-block">{{ task.title }}</h3>
    <div class="inline-block text-right">
      <i
        class="icon fa-solid fa-check hover:text-primary"
        :class="{ 'text-secondary': task.completed }"
        @click="taskStore.toggleCompleted(task.uuid)"
      ></i>
      <i
        class="icon fa-solid fa-heart hover:text-red-400"
        :class="{ 'text-red-500': task.favorite }"
        @click="taskStore.toggleFavorite(task.uuid)"
      ></i>
      <i
        class="icon fa-solid fa-thumbtack hover:text-sky-300"
        :class="{ 'text-sky-400': task.pinned }"
        @click="taskStore.togglePinned(task.uuid)"
      ></i>
      <i
        class="icon fa-solid fa-trash hover:text-slate-700"
        @click="taskStore.deleteTask(task.uuid)"
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/TaskStore";
import type TaskItemType from "@/types/TaskItemType";
import type { PropType } from "vue";

defineProps({
  task: {
    type: Object as PropType<TaskItemType>,
    required: true,
  },
});
const taskStore = useTaskStore();
</script>

<style>
.icon {
  @apply text-lg ml-3 cursor-pointer text-gray-300 transition-colors;
}
</style>
