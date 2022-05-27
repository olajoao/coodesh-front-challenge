<template>
  <main class="bg-slate-100">
    <section class="container max-w-3xl mx-auto pt-16">
      <h1 class="text-zinc-700 text-xl leading-7">
        Explore os principais envolvidos nesta nobre causa. Encontre todos os
        dados que você precisa para fazer parte desta equipe.
      </h1>

      <div class="relative mt-5 mb-7">
        <input
          type="text"
          class="font-medium font-sans px-3 border border-slate-300 py-2 w-full rounded-md"
          placeholder="Searching"
        />
        <DocumentSearchIcon
          class="absolute top-2.5 right-2 w-5 h-5 text-slate-400"
        />
      </div>

      <PacientTable :pacientsData="pacients" />

      <div class="text-center my-5">
        <button>+ Load More</button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { DocumentSearchIcon } from "@heroicons/vue/outline";
import PacientTable from "./PacientTable.vue";
import usePacientStore from "../../../store/PacientStore.js";

const PacientStore = usePacientStore();

let pacients = ref([]);

PacientStore.getPacients().then((response) => {
  PacientStore.pacients = response.data.results;
  pacients.value = PacientStore.pacients;
});
</script>

<style>
main {
  height: calc(100vh - 72px);
}
</style>
