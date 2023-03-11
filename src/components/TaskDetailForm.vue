<template>
  <form @change="emit('change', taskDescription)">
    <textarea
      type="text"
      :rows="taskDescription.split('\n').length + 1"
      class="max-w-sm p-5 rounded-xl shadow-lg resize-none bg-white border-none focus:outline-primary dark:bg-slate-600 dark:drop-shadow-lg"
      placeholder="To do this, I need to..."
      v-model.lazy.trim="taskDescription"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
});
const emit = defineEmits<{ (event: "change", text: string): void }>();

const taskDescription = ref(props.value);
</script>
