<template>
  <div class="fixed w-full top-8">
    <div class="grid grid-cols-1 gap-2">
      <div
        class="flex items-center text-white max-w-sm w-full shadow-2xl rounded-xl overflow-hidden mx-auto"
        :class="{
          'bg-red-400': type === 'error',
          'bg-yellow-400': type === 'warning',
          'bg-blue-400': type === 'info',
          'bg-green-400': type === 'success',
        }"
      >
        <div class="w-12 border-r px-4 text-lg">
          <i class="fa-solid fa-circle-xmark" v-if="type === 'error'"></i>
          <i
            class="fa-solid fa-circle-exclamation"
            v-if="type === 'warning'"
          ></i>
          <i class="fa-solid fa-circle-info" v-if="type === 'info'"></i>
          <i class="fa-solid fa-circle-check" v-if="type === 'success'"></i>
        </div>
        <div class="flex items-center px-2 py-3 mx-3">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type ToastMessageType from "@/types/ToastMessageType";
import type { PropType } from "vue";

defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: Object as PropType<ToastMessageType>,
    default: "info",
  },
});
</script>
