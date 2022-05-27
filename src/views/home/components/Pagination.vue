<template>
  <section>
    <div class="flex items-center justify-end gap-5 mb-3">
      <button @click="changePages(0)">Início</button>
      <button @click="changePages(-1)">
        <ChevronLeftIcon class="w-5 h-5" />
      </button>
      <span>Showing Page {{ page }} of {{ pages }}</span>
      <button @click="changePages(1)">
        <ChevronRightIcon class="w-5 h-5" />
      </button>
      <button @click="changePages(pages)">Fim</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/outline";

const props = defineProps({
  totalRecords: {
    type: Number,
    default: 0,
  },
  perPageOptions: {
    type: Array,
    default: [],
  },
});

let page = ref(1);
let perPage = ref(props.perPageOptions[1]);

const pages = computed(() => {
  const remainder = props.totalRecords % perPage.value;

  if (remainder > 0) {
    return Math.floor(props.totalRecords / perPage.value) + 1;
  } else return props.totalRecords / perPage.value;
});

const emit = defineEmits(["changePage"]);

function changePages(value) {
  switch (value) {
    case 0:
      page.value = 1;
      break;
    case -1:
      page.value = page.value > 1 ? page.value - 1 : page.value;
      break;
    case 1:
      page.value = page.value < pages.value ? page.value + 1 : page.value;
      break;
    case pages.value:
      page.value = pages.value;
      break;
  }

  emit("changePage", { page: page.value, perPage: perPage.value });
}
</script>
