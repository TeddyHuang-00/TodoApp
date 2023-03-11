<template>
  <div class="w-full justify-between p-3 flex text-2xl">
    <div class="pl-5">
      <a href="https://github.com/TeddyHuang-00/TodoApp">
        <i class="fa-brands fa-github"></i>
      </a>
    </div>
    <div class="flex justify-evenly gap-5 pr-5">
      <div
        @click="handleSwitchTheme"
        class="cursor-pointer hover:text-primary pr-3"
      >
        <TransitionGroup name="toggle-theme">
          <i class="fa-solid fa-sun" v-if="themeStore.theme === 'light'"></i>
          <i
            class="fa-solid fa-moon"
            v-else-if="themeStore.theme === 'dark'"
          ></i>
          <i class="fa-solid fa-wand-magic-sparkles" v-else></i>
        </TransitionGroup>
      </div>
      <DownloadButton></DownloadButton>
      <UploadButton></UploadButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/ThemeStore";
import DownloadButton from "./DownloadButton.vue";
import UploadButton from "./UploadButton.vue";

const themeStore = useThemeStore();
const handleSwitchTheme = () => {
  themeStore.switchTheme();
};
</script>

<style>
.toggle-theme-enter-from {
  @apply translate-x-5 opacity-0;
}
.toggle-theme-leave-to {
  @apply -translate-x-5 opacity-0;
}
.toggle-theme-enter-active,
.toggle-theme-leave-active {
  @apply transition-all duration-300;
}
</style>
