<template>
  <form @change="emit('change', taskDescription)">
    <textarea
      type="text"
      :rows="taskDescription.split('\n').length + 1"
      class="p-5 rounded-xl shadow-lg resize-none bg-white focus:ring-primary focus:border-primary"
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
