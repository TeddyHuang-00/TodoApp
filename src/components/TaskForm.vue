<template>
  <form
    @submit.prevent="handleSubmit"
    class="max-w-lg pt-5 my-0 mx-auto grid grid-cols-[3fr_1fr] gap-3"
  >
    <input
      class="border-none p-3 rounded-lg text-gray-600 shadow-lg focus:shadow-md transition-shadow focus:ring-primary focus:border-primary"
      type="text"
      placeholder="I need to..."
      @keypress.Enter="handleSubmit"
      v-model="taskTitle"
    />
    <button
      class="bg-primary border-none p-3 rounded-lg cursor-pointer shadow-lg hover:shadow-md focus:shadow-md transition-shadow"
    >
      Add
    </button>
  </form>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/TaskStore";
import { ref } from "vue";
import { v4 as uuid } from "uuid";

const taskStore = useTaskStore();
const emit = defineEmits<{ (e: "complainEmptyString"): void }>();
const handleSubmit = () => {
  if (taskTitle.value.length) {
    taskStore.addTask({
      uuid: uuid(),
      title: taskTitle.value,
      description: "",
      completed: false,
      pinned: false,
      favorite: false,
    });
    taskTitle.value = "";
  } else {
    emit("complainEmptyString");
  }
};
const taskTitle = ref("");
</script>
