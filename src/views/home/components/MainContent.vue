<template>
  <main class="bg-slate-800">
    <section class="container max-w-3xl mx-auto pt-8 2xl:pt-16">
      <h1 class="text-zinc-200 text-xl leading-7">
        Find all data you need to be part of the team.
      </h1>

      <div class="relative mt-5 mb-7">
        <input
          type="text"
          class="font-medium bg-slate-700 outline-none focus:border-slate-500 font-sans px-3 border border-slate-600 py-2 w-full rounded-md text-slate-300 placeholder:text-slate-400/60"
          placeholder="Search pacient name"
          v-model="search"
          @input="searchPacient"
        />
        <DocumentSearchIcon
          class="absolute top-2.5 right-2 w-5 h-5 text-slate-400"
        />
      </div>

      <PacientTable :pacientsData="fakePacientsList" @getPacient="handlePacientInfos" />

      <Transition name="infos">
        <PacientInfoModal v-if="isOpen" :pacientInfo="pacientInfo" :pacientId="indexID" :closeModal="closeModal" />
      </Transition>

      <LoadMoreButton :loading="requestStatus" @click="loadMorePacients" />
    </section>
  </main>
</template>

<script setup>
import { computed, reactive, ref, watch, watchEffect } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { DocumentSearchIcon } from '@heroicons/vue/outline';
import PacientTable from './Table.vue';
import PacientInfoModal from './PacientInfoModal.vue';
import usePacientStore from '../../../store/PacientStore.js';
import LoadMoreButton from './LoadMoreButton.vue';

const PacientStore = usePacientStore();
const route = useRoute();

// status helpers
let isOpen = ref(false)
let requestStatus = ref(true)

let pacients = reactive([])
let fakePacientsList = ref([])
let pacientInfo = ref({})
let indexID = ref(null)
let search = ref(null)
let page = 1
let routeId = ref(null)


pacients = computed(() => PacientStore.pacientsList)
watchEffect(() => {
  fakePacientsList.value = pacients.value;
})
routeId.value = route.params.id

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

function loadMorePacients() {
  page++;
  getPacientList();
}

function searchPacient() {
  if(!search.value || search.value === '') return getPacientList();

  fakePacientsList.value = PacientStore.search(search.value)
}

function handlePacientInfos(obj) {
  pacientInfo.value = obj.pacient
  indexID.value = obj.index
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}

getPacientList()

watch(fakePacientsList, () => {

   if(route.params.id >= 0) {
    pacientInfo.value = fakePacientsList.value[route.params.id]
    isOpen.value = true
  }
})
</script>

<style>
main {
  height: calc(100vh - 72px);
}

.infos-enter-active,
.infos-leave-active {
  transition: opacity 0.5s ease;
}

.infos-enter-from,
.infos-leave-to {
  opacity: 0;
}
</style>
