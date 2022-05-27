import { defineStore } from "pinia";
import request from "../http";

const usePacientStore = defineStore("usePacientStore", {
  state: () => {
    pacients: [];
  },
  actions: {
    async getPacients() {
      return request.get("?results=50");
    },
  },
});

export default usePacientStore;
