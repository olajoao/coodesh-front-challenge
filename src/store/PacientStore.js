import { defineStore } from 'pinia'
import request from '../http'

const usePacientStore = defineStore('usePacientStore', {
  state: () => {
    return {
      pacientsList: []
    }
  },
  actions: {
    async getPacients (page) {
      return request.get(`?page=${page}&results=50&seed=foobar`)
    },
    fillList (data) {
      this.pacientsList.push(data)
    },
    search (search) {
      let results = []

      let names = this.pacientsList.map(pacient => {
        return `${pacient.name.first} ${pacient.name.last}`
      })
      
      for (let index = 0; index < names.length; index++) {
        if (names[index].toLowerCase().search(search.toLowerCase()) >= 0) {
          results.push(this.pacientsList[index])
        }
      }
      
      return results
    }
  }
})

export default usePacientStore
