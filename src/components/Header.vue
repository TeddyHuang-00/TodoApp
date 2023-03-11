<template>
  <div class="w-full justify-between p-3 flex">
    <div class="pl-5">
      <a href="https://github.com/TeddyHuang-00/TodoApp">
        <i class="fa-brands fa-github text-2xl"></i>
      </a>
    </div>
    <div @click="handleSwitchTheme" class="pr-5 text-2xl cursor-pointer">
      <TransitionGroup name="toggle-theme">
        <i class="fa-solid fa-sun" v-if="themeStore.theme === 'light'"></i>
        <i class="fa-solid fa-moon" v-else-if="themeStore.theme === 'dark'"></i>
        <i class="fa-solid fa-wand-magic-sparkles" v-else></i>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/ThemeStore";

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
