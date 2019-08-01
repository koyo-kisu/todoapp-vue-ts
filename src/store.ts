import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: null
  },
  mutations: {
    setItems: state => {
      let items:any = []
 
      db.collection('items').orderBy('created_at').onSnapshot((snapshot:any) => {
        items = []
        snapshot.forEach((doc:any) => {
          items.push({ id: doc.id, title: doc.data().title })
        })
 
        state.items = items
      })
    }
  },
  actions: {
    setItems: context => {
      context.commit('setItems')
    }
  }
})
