<template>
  <div class="shadow shadow-slate-300 max-h-[50vh] overflow-y-auto relative">
    <table class="w-full">
      <thead class="relative">
        <tr class="bg-slate-200 bg-opacity-90 sticky top-0">
          <th class="">Name</th>
          <th>Gender</th>
          <th>Birth</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(pacient, index) in pacientsData"
          :key="index"
          class="border-y border-slate-300 hover:bg-zinc-200 bg-white"
        >
          <td>{{ `${pacient.name.first} ${pacient.name.last}` }}</td>
          <td>{{ pacient.gender }}</td>
          <td>{{ pacient.dob.date }}</td>
          <td class="text-center">
            <button
              class="py-1 px-5 bg-slate-800 text-slate-50 rounded-md shadow shadow-slate-600"
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
const props = defineProps({
  pacientsData: {
    type: Array,
    default: [],
  },
});
</script>
