<template>
  <main class="font-Noto min-h-screen bg-gray-100 text-gray-800 m-0">
    <header class="bg-gray-100 py-5 text-center items-center shadow-xl">
      <div class="w-full flex flex-col justify-center items-center">
        <img src="./assets/Logo.svg" alt="Site logo" class="max-w-[5rem]" />
        <h1 class="m-0 text-2xl pt-0 ml-4 text-gray-700 font-extrabold">
          To-do list
        </h1>
      </div>
    </header>

    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>
