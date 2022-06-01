<template>
  <section @click.self="closeModal" class="fixed inset-0 bg-slate-900/50 flex justify-center items-center">
    <div class="p-8 rounded-md relative bg-slate-50 shadow shadow-slate-400">
      <button @click="closeModal" class="absolute top-5 right-5">
        <XIcon class="w-5 h-5 text-slate-500 hover:text-slate-800"/>
      </button>
      <div class="max-w-[130px] rounded-full mx-auto -mt-24 mb-3">
        <img class="max-w-full rounded-full h-auto shadow shadow-slate-600" :src="pacientInfo.picture.large" alt="description" loading="lazy" >
      </div>
      <div class="text-slate-800">
        <div class="mb-5 text-center">
          <h1 class="font-semibold text-sm lg:text-lg text-slate-800">{{ `${pacientInfo.name.first} ${pacientInfo.name.last}` }}</h1>
          <p class="text-sm text-slate-700">{{ pacientInfo.email }}</p>
        </div>
        <div class="flex gap-8 items-center text-sm">
          <div>
            <span class="text-xs uppercase font-bold text-slate-500">Gender</span>  
            <p>{{ pacientInfo.gender }}</p>  
          </div>
          <div>
            <span class="text-xs uppercase font-bold text-slate-500">Birth</span>  
            <p>{{ new Date(pacientInfo.dob.date).toLocaleDateString() }}</p>
          </div>
          <div>
            <span class="text-xs uppercase font-bold text-slate-500">Nationality</span>  
            <p>{{ pacientInfo.nat }}</p>
          </div>
        </div>
        <div class="flex gap-8 items-center mt-5 text-sm">
          <div>
            <span class="text-xs uppercase font-bold text-slate-500">Cell</span>  
            <p>{{ pacientInfo.cell }}</p>
          </div>
          <div>
            <span class="text-xs uppercase font-bold text-slate-500">ID</span>  
            <p>
              {{ pacientInfo.id.name || '' }} 
              <span v-if="pacientInfo.id.name"> - </span> 
              <span v-else>Absent</span>
              {{ pacientInfo.id.value || '' }}
            </p>
          </div>
        </div>
        <div class="mt-5">
          <span class="text-xs uppercase font-bold text-slate-500">Address</span>  
          <p class="text-sm">{{ `${pacientInfo.location.street.name}, ${pacientInfo.location.street.number} - ${pacientInfo.location.city} ${pacientInfo.location.state}` }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { XIcon } from '@heroicons/vue/outline';
const props = defineProps({
  pacientInfo: {
    type: Object,
    default: {}
  },
  closeModal: {
    type: Function,
    default: Function
  }
})
</script>