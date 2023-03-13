<template>
  <div class="w-8 transition-all duration-300" :class="{ grow: expandInput }">
    <form @submit.prevent="handleSubmit">
      <input
        class="px-3 py-1 w-full rounded-3xl shadow-md bg-gray-200 dark:bg-slate-700 dark:drop-shadow-md focus:outline-primary hover:outline-primary"
        type="text"
        placeholder="+"
        @keypress.Enter="handleSubmit"
        @focusin="delayedIn"
        @focusout="delayedOut"
        v-model="newTag"
      />
      <div v-if="showDropdown">
        <TransitionGroup
          tag="ul"
          name="dropdown"
          class="flex flex-wrap gap-2 pt-4"
          appear
        >
          <li
            v-for="tag in taskStore.allTags.filter(
              (t) => !props.task.tags?.includes(t)
            )"
            :key="tag"
          >
            <p
              class="px-3 py-1 rounded-3xl shadow-md bg-gray-200 dark:bg-slate-700 dark:drop-shadow-md cursor-pointer"
              @click="
                taskStore.addTag(props.task.uuid, tag);
                showDropdown = false;
              "
            >
              {{ tag }}
            </p>
          </li>
        </TransitionGroup>
      </div>
    </form>
    <Teleport to="#app">
      <Transition name="toast">
        <ToastNotification
          message="Tag should not be empty!"
          msgtype="error"
          v-if="showToast"
        ></ToastNotification>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/TaskStore";
import type TaskItemType from "@/types/TaskItemType";
import { ref, type PropType } from "vue";
import ToastNotification from "./ToastNotification.vue";

const taskStore = useTaskStore();
const props = defineProps({
  task: {
    type: Object as PropType<TaskItemType>,
    required: true,
  },
});
const newTag = ref("");
const showToast = ref(false);
const showDropdown = ref(false);
const expandInput = ref(false);
const handleSubmit = () => {
  if (newTag.value.length) {
    setTimeout(() => {
      taskStore.addTag(props.task.uuid, newTag.value);
      newTag.value = "";
    }, 300);
  } else {
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  }
};
const delayedIn = () => {
  expandInput.value = true;
  setTimeout(() => {
    showDropdown.value = true;
  }, 300);
};
const delayedOut = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 100);
  setTimeout(() => {
    expandInput.value = false;
  }, 200);
};
</script>

<style>
.dropdown-enter-active,
.dropdown-leave-active,
.dropdown-move {
  @apply transition-all duration-300;
}
.dropdown-enter-from,
.dropdown-leave-to {
  @apply opacity-0 scale-75;
}
.dropdown-leave-from {
  @apply overflow-hidden;
}
</style>
