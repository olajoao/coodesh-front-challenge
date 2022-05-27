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

      <Pagination
        v-if="pacients.length > 0"
        :totalRecords="pacients.length"
        :perPageOptions="perPageOptions"
        @changePage="setPagination"
      />

      <PacientTable
        :pacientsData="computedPacients"
        :headConfig="tableConfig"
      />

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
import Pagination from "./Pagination.vue";
import { computed } from "@vue/runtime-core";

const PacientStore = usePacientStore();

let pacients = ref([]);
let perPageOptions = ["20", "50", "100"];
let pagination = ref({
  page: 1,
  perPage: perPageOptions[0],
});

function setPagination(obj) {
  pagination.value = obj;
}

const tableConfig = [
  {
    key: "name",
    title: "name",
  },
  {
    key: "gender",
    title: "Gender",
  },
  {
    key: "birth",
    title: "Birth",
  },
  {
    key: "action",
    title: "Action",
  },
];

PacientStore.getPacients().then(({ data }) => {
  PacientStore.pacients = data.results;
  pacients.value = PacientStore.pacients;
});

const computedPacients = computed(() => {
  if (!pacients) return [];

  const fisrtIndex = (pagination.value.page - 1) * pagination.value.perPage;
  const lastIndex = pagination.value.page * pagination.value.perPage;

  return pacients.value.slice(fisrtIndex, lastIndex);
});
</script>

<style>
main {
  height: calc(100vh - 72px);
}
</style>
