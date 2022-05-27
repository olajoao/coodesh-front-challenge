<template>
  <Header />
  <Main />
</template>

<script setup>
import Header from "../../components/TheHeader.vue";
import Main from "./components/MainContent.vue";
import usePacientStore from "../../store/PacientStore.js";

const PacientStore = usePacientStore();

PacientStore.getPacients().then((response) =>
  console.log(response.data.results)
);
</script>
