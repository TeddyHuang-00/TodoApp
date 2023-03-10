<template>
  <div>
    <!-- Filters -->
    <nav class="max-w-screen-sm mt-5 mx-auto text-center">
      <button class="nav-button" @click="filter = 'all'">All</button>
      <button class="nav-button" @click="filter = 'favs'">Favorites</button>
    </nav>

    <!-- Task list -->
    <Transition name="switch" mode="out-in">
      <div class="container max-w-screen-sm" v-if="filter == 'all'">
        <Transition name="switch" mode="out-in">
          <div v-if="!taskStore.tasks.length">
            <p class="my-10 text-center">Nothing to do yet... Add one now!</p>
          </div>
          <div v-else>
            <p class="my-5 mx-auto">All tasks</p>
            <TransitionGroup tag="div" name="task-list" appear>
              <div
                v-for="task in taskStore.pinnedFirst"
                :key="task.uuid"
                class="todo-item-container"
              >
                <TaskOverview :task="task"></TaskOverview>
              </div>
            </TransitionGroup>
          </div>
        </Transition>
      </div>
      <div class="container max-w-screen-sm" v-else>
        <Transition name="switch" mode="out-in">
          <div v-if="!taskStore.favorites.length">
            <p class="my-10 text-center">
              No favorite tasks yet... Add one now!
            </p>
          </div>
          <div v-else>
            <p class="my-5 mx-auto">Favorite tasks</p>
            <TransitionGroup tag="div" name="task-list" appear>
              <div
                v-for="task in taskStore.favorites"
                :key="task.uuid"
                class="todo-item-container"
              >
                <TaskOverview :task="task"></TaskOverview>
              </div>
            </TransitionGroup>
          </div>
        </Transition>
      </div>
    </Transition>

    <Teleport to="header">
      <!-- New Task -->
      <TaskForm @complainEmptyString="handleComplaint"></TaskForm>
    </Teleport>

    <Teleport to="#app">
      <Transition name="toast">
        <ToastNotification
          message="To-do item should not be empty!"
          type="error"
          v-if="showToast"
        ></ToastNotification>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/TaskStore";
import TaskOverview from "@/components/TaskOverview.vue";
import { ref } from "vue";
import type FilterType from "@/types/FilterType";
import TaskForm from "@/components/TaskForm.vue";
import ToastNotification from "@/components/ToastNotification.vue";

const taskStore = useTaskStore();
taskStore.loadFromLocalStorage();
const filter = ref("all" as FilterType);
const showToast = ref(false);
const handleComplaint = () => {
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 2000);
};
</script>

<style>
.nav-button {
  @apply inline-block ml-5 bg-gray-50 rounded-md border-none shadow-lg py-2 px-4 cursor-pointer text-sm font-medium text-gray-700 hover:shadow-md hover:bg-gray-100 transition-all;
}
.todo-item-container {
  @apply my-5 mx-auto;
}

/* Toast animation */
.toast-enter-active,
.toast-leave-active {
  @apply transition-all duration-300;
}
.toast-enter-from,
.toast-leave-to {
  @apply opacity-0 -translate-y-20 scale-75;
}

/* Task list animation */
.task-list-enter-active,
.task-list-leave-active,
.task-list-move {
  @apply transition-all duration-300;
}
.task-list-enter-from {
  @apply opacity-0 scale-75;
}
.task-list-leave-to {
  @apply opacity-0 scale-50;
}

/* Switch status animation */
.switch-enter-from,
.switch-leave-to {
  @apply opacity-0 translate-y-5;
}
.switch-enter-active,
.switch-leave-active {
  @apply transition-all duration-300;
}
</style>
