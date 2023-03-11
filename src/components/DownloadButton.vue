<template>
  <a
    :href="'data:' + fileFormatTasks"
    download="todo.json"
    class="hover:text-primary"
  >
    <i class="fa-solid fa-file-export"></i>
  </a>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/TaskStore";
import { storeToRefs } from "pinia";

const { tasks } = storeToRefs(useTaskStore());
const fileFormatTasks =
  "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks.value));
</script>
