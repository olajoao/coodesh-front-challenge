<template>
  <header class="flex justify-between items-center py-2 px-6">
    <div class="flex items-center gap-3">
      <router-link to="/" class="w-14 h-14">
        <img
          class="w-full object-contain"
          src="https://picsum.photos/200"
          alt="Company Logo Image"
        />
        <span class="sr-only">
          Company logo image. Click to go to home page.
        </span>
      </router-link>
      <h1 class="font-bold text-2xl">Challengesh</h1>
    </div>
    <button class="bg-slate-200 text-slate-700 rounded-full w-12 h-12">
      <UserIcon class="w-5 h-5 mx-auto" />
    </button>
  </header>
</template>
<script setup>
import { UserIcon } from "@heroicons/vue/outline";
</script>
