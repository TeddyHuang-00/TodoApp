<template>
  <div
    class="container py-5 px-7 rounded-xl shadow-lg grid grid-rows-2 gap-1 sm:flex sm:justify-between items-center transition-colors duration-300 dark:drop-shadow-lg"
    :class="{
      'bg-gray-200 dark:bg-slate-700': task.completed,
      'bg-gray-50 dark:bg-slate-600': !task.completed,
      'blur-[2px]': task.completed,
    }"
  >
    <RouterLink :to="{ name: 'task-detail', params: { uuid: task.uuid } }">
      <h3
        class="inline-block hover:scale-105 hover:opacity-90 transition-all duration-100"
      >
        {{ task.title }}
      </h3>
    </RouterLink>
    <div
      class="flex text-center mx-auto w-full justify-evenly text-2xl pt-2 sm:inline-block sm:text-right sm:text-lg sm:pt-0 sm:w-fit sm:mr-0"
    >
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
  <Transition name="strike" appear>
    <div
      v-if="task.completed"
      class="absolute content-[''] top-1/2 left-0 border-b-2 border-b-gray-700 dark:border-b-slate-200 w-full scale-105 sm:rotate-3"
    ></div>
  </Transition>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/TaskStore";
import type TaskItemType from "@/types/TaskItemType";
import type { PropType } from "vue";
import { RouterLink } from "vue-router";

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
  @apply ml-3 cursor-pointer text-gray-300 transition-colors dark:text-opacity-90;
}

.strike-enter-from,
.strike-leave-to {
  @apply opacity-0;
}
.strike-enter-active,
.strike-leave-active {
  @apply transition-all duration-200;
}
</style>
