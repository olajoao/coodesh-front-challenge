import { defineStore } from "pinia";

const pacientStore = defineStore("pacientStore", {
  state: () => {
    pacients: [];
  },
});
