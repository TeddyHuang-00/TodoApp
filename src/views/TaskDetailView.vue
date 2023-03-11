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
      <div>
        <h3
          class="text-xl max-w-sm py-3 my-5 mx-auto bg-gray-50 rounded-lg shadow-lg dark:bg-slate-700"
        >
          {{ task.title }}
        </h3>
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
