<template>
  <div class="my-10 mx-auto text-center justify-center">
    <div v-if="!task">
      <Teleport to="#app">
        <ToastNotification
          message="Task does not exists! Go back to home page to check again?"
          msgtype="warning"
        ></ToastNotification>
      </Teleport>
      <p>Oops, nothing here.</p>
    </div>
    <div v-else>
      <div class="max-w-sm mx-auto">
        <h2 class="pb-5 text-xl">Task detail</h2>
        <RouterLink :to="{ name: 'home' }">
          <h3
            class="w-full text-lg py-3 my-5 bg-gray-50 rounded-lg shadow-lg dark:bg-slate-700 dark:drop-shadow-lg"
          >
            {{ task.title }}
          </h3>
        </RouterLink>
        <TaskDetailForm
          :value="task.description"
          @change="handleChange"
        ></TaskDetailForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskDetailForm from "@/components/TaskDetailForm.vue";
import ToastNotification from "@/components/ToastNotification.vue";
import { useTaskStore } from "@/stores/TaskStore";
import { useRoute } from "vue-router";

const taskStore = useTaskStore();
const route = useRoute();
const task = taskStore.getTask(route.params.uuid as string);
const handleChange = (text: string) => {
  if (!task) return;
  taskStore.updateTask(task.uuid, text);
};
</script>

<style></style>
