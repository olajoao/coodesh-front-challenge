<template>
  <main class="bg-slate-100">
    <section class="container max-w-3xl mx-auto pt-8 2xl:pt-16">
      <h1 class="text-zinc-700 text-xl leading-7">
        Explore os principais envolvidos nesta nobre causa. Encontre todos os
        dados que você precisa para fazer parte desta equipe.
      </h1>

      <div class="relative mt-5 mb-7">
        <input
          type="text"
          class="font-medium font-sans px-3 border border-slate-300 py-2 w-full rounded-md"
          placeholder="Searching"
          v-model="search"
          @input="searchPacient"
        />
        <DocumentSearchIcon
          class="absolute top-2.5 right-2 w-5 h-5 text-slate-400"
        />
      </div>

      <PacientTable :pacientsData="fakePacients" :headConfig="tableConfig" />

      <LoadMoreButton :loading="requestStatus" @click="loadMorePacients" />
    </section>
  </main>
</template>

<script setup>
import { DocumentSearchIcon } from '@heroicons/vue/outline';
import PacientTable from './Table.vue';
import usePacientStore from '../../../store/PacientStore.js';
import { computed, reactive, ref, watchEffect } from '@vue/runtime-core';
import LoadMoreButton from './LoadMoreButton.vue';

const PacientStore = usePacientStore();

let pacients = reactive([])
let fakePacients = ref([])
let search = ref(null);
let page = 1;
let requestStatus = ref(true);

pacients = computed(() => PacientStore.pacientsList)
watchEffect(() => {
  fakePacients.value = pacients.value;
})

function getPacientList() {
  requestStatus.value = true;

  PacientStore.getPacients(page)
    .then(({ data }) => {
      requestStatus.value = false;

      if(page === 1) PacientStore.pacientsList = [];

      let pacientList = data.results;
      pacientList.forEach(pacient => PacientStore.fillList(pacient)) 
    })
    .catch((error) => {
      requestStatus.value = false;
      console.log(error)
    })
}
getPacientList()

function loadMorePacients() {
  page++;
  getPacientList();
}

function searchPacient() {
  if(!search.value || search.value === '') return getPacientList();

  fakePacients.value = PacientStore.search(search.value)
}

const tableConfig = [
  {
    key: 'name',
    title: 'name',
  },
  {
    key: 'gender',
    title: 'Gender',
  },
  {
    key: 'birth',
    title: 'Birth',
  },
  {
    key: 'action',
    title: 'Action',
  },
];
</script>

<style>
main {
  height: calc(100vh - 72px);
}
</style>
