<template>
  <div class="shadow shadow-slate-300 max-h-[50vh] overflow-y-auto relative">
    <table class="w-full">
      <thead class="relative">
        <tr
          class="bg-slate-200 bg-opacity-90 sticky top-0 text-xs uppercase text-slate-500/70"
        >
          <th
            v-for="(thItem, index) in headConfig"
            :key="index"
            class="last:text-center"
          >
            {{ thItem.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(pacient, index) in pacientsData"
          :key="index"
          class="hover:bg-zinc-200 bg-white text-sm even:border even:border-slate-100"
        >
          <td>{{ `${pacient.name.first} ${pacient.name.last}` }}</td>
          <td>{{ pacient.gender }}</td>
          <td>{{ new Date(pacient.dob.date).toLocaleDateString() }}</td>
          <td class="text-center py-2">
            <button
            @click="showPacientInfo(pacient)"
              class="px-5 bg-slate-800 text-slate-50 rounded-md shadow shadow-slate-600"
            >
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Transition name="infos">
    <PacientInfoModal v-if="isOpen" :pacientInfo="pacientInfo" :closeModal="closeModal" />
  </Transition>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import PacientInfoModal from './PacientInfoModal.vue';

const props = defineProps({
  pacientsData: {
    type: Array,
    default: [],
  },
  headConfig: {
    type: Array,
    default: [],
  },
});

let pacientInfo = ref({})
let isOpen = ref(false)

function showPacientInfo(pacient) {
  console.log(pacient)
  isOpen.value = true
  pacientInfo.value = pacient
}

function closeModal() {
  isOpen.value = false
}
</script>
