<template>
  <main class="font-Noto min-h-screen bg-gray-100 text-gray-800 m-0 bg-scroll">
    <header class="bg-gray-100 py-5 text-center items-center shadow-xl">
      <RouterLink :to="{ name: 'home' }">
        <div class="w-full flex flex-col justify-center items-center">
          <img src="./assets/Logo.svg" alt="Site logo" class="max-w-[5rem]" />
          <h1 class="m-0 text-2xl pt-0 ml-4 text-gray-700 font-extrabold">
            To-do list
          </h1>
        </div>
      </RouterLink>
    </header>

    <RouterView v-slot="{ Component }">
      <Transition name="routes" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </RouterView>
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<style>
.routes-enter-active {
  @apply transition-all ease-in duration-300;
}
.routes-enter-from {
  @apply opacity-0 translate-x-24;
}
.routes-leave-active {
  @apply transition-all ease-out duration-300;
}
.routes-leave-to {
  @apply opacity-0 -translate-x-24;
}
</style>
