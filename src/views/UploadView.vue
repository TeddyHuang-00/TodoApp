<template>
  <div class="container text-center pt-20">
    <div class="flex items-center justify-center max-w-lg mx-auto">
      <label
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-slate-600 dark:bg-slate-700 hover:bg-gray-100 dark:border-slate-600 dark:hover:border-slate-500 transition-all duration-150"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <i class="fa-solid fa-cloud-arrow-up pb-4 text-4xl"></i>
          <p class="mb-2 text-sm text-gray-500 dark:text-slate-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-slate-400">
            ( JSON file only )
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          class="hidden"
          ref="uploadedFile"
          @change="handleChange"
        />
      </label>
    </div>

    <!-- Toast information on upload status -->
    <Teleport to="#app">
      <Transition name="toast">
        <ToastNotification
          message="File must be in proper JSON format!"
          msgtype="warning"
          v-if="fileFormatError"
        ></ToastNotification>
        <ToastNotification
          message="File must be exported from this app!"
          msgtype="warning"
          v-else-if="fileContentError"
        ></ToastNotification>
        <ToastNotification
          message="Something went wrong, please try again later or contact the developer!"
          msgtype="error"
          v-else-if="unknownError"
        ></ToastNotification>
        <ToastNotification
          message="Successfully load from file!"
          msgtype="success"
          v-else-if="fileUploadSuccess"
        ></ToastNotification>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import ToastNotification from "@/components/ToastNotification.vue";
import { useTaskStore } from "@/stores/TaskStore";
import { ref } from "vue";

const uploadedFile = ref(null as HTMLInputElement | null);
const fileFormatError = ref(false);
const fileContentError = ref(false);
const unknownError = ref(false);
const fileUploadSuccess = ref(false);
const taskStore = useTaskStore();
const handleChange = () => {
  const reader = new FileReader();
  if (!uploadedFile.value?.files) return;
  reader.readAsText(uploadedFile.value?.files[0] as File);
  reader.onload = () => {
    try {
      for (const task of JSON.parse(reader.result as string))
        taskStore.addTask(task);
    } catch (error) {
      // If the file is in the wrong format
      if (error instanceof SyntaxError) {
        fileFormatError.value = true;
        setTimeout(() => {
          fileFormatError.value = false;
        }, 2000);
        return;
      }
      // If the file cannot be parsed into task items
      if (error instanceof TypeError) {
        fileContentError.value = true;
        setTimeout(() => {
          fileContentError.value = false;
        }, 2000);
        return;
      }
      // If unknown error is encountered
      unknownError.value = true;
      setTimeout(() => {
        unknownError.value = false;
      }, 2000);
      return;
    }
    // If all success
    fileUploadSuccess.value = true;
    setTimeout(() => {
      fileUploadSuccess.value = false;
    }, 2000);
  };
};
</script>
