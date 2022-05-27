import { defineStore } from "pinia";
import request from "../http";

const usePacientStore = defineStore("usePacientStore", {
  state: () => {
    pacients: [];
  },
  actions: {
    async getPacients() {
      return request.get("?page=10&results=101");
    },
  },
});

export default usePacientStore;
