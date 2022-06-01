<template>
  <div class="shadow-md shadow-slate-700 max-h-[50vh] overflow-y-auto relative side__infos">
    <table class="w-full">
      <thead class="relative">
        <tr
          class="bg-slate-700 bg-opacity-90 sticky top-0 text-xs uppercase text-slate-200/70"
        >
          <th @click="orderName" class="p-0 m-0">
            <button class="flex items-center justify-between w-full hover:bg-slate-600 py-1 px-5 text-xs uppercase font-bold">
              <span>Name</span>
              <SwitchVerticalIcon class="w-5 h-5" />
            </button>
          </th>
          <th>Gender</th>
          <th>Birth</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(pacient, index) in pacientsData"
          :key="index"
          class="hover:bg-slate-500 bg-slate-600 text-sm even:border-y even:border-slate-700/50 text-slate-300"
        >
          <td>{{ `${pacient.name.first} ${pacient.name.last}` }}</td>
          <td>{{ pacient.gender }}</td>
          <td>{{ new Date(pacient.dob.date).toLocaleDateString() }}</td>
          <td class="text-center py-2">
            <button
            @click="showPacientInfo(pacient, index)"
            class="px-5 bg-slate-800 text-slate-200 rounded-md shadow shadow-slate-600"
            >
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { SwitchVerticalIcon } from '@heroicons/vue/solid';
import usePacientStore from '../../../store/PacientStore';

const PacientStore = usePacientStore();
const emit = defineEmits(['getPacient'])

const props = defineProps({
  pacientsData: {
    type: Array,
    default: [],
  }
});

let order = ref(true);

function showPacientInfo(pacient, index) {
  emit('getPacient', {pacient, index})
}

function compare(a, b) {
  const nameA = a.name.first.toLowerCase();
  const nameB = b.name.first.toLowerCase();

  let comparison = 0;
  
  if (nameA > nameB) comparison = 1;
  else if (nameA < nameB) comparison = -1;
  
  return (
    order.value ? comparison : (comparison * -1)
  )
}

function orderName() {
  PacientStore.orderByName(compare)
  order.value = !order.value
}
</script>