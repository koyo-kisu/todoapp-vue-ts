<template>
  <div class="home">
    <div class="title">やることは何？</div>
    <input v-model="myTodo" />今日のやること<button @click="addToDo">Add</button>
    <div v-if="errors !== ''" id="errors">{{ errors }}</div>

    <div v-if="this.$store.getters.getItems && this.$store.getters.getItems.length > 0">
      <div class="title"></div>
 
     <div v-for="item in this.$store.getters.getItems" :key="item.id">
       {{ item.title }}<br /><br /><small style="text-decoration:underline;" @click="deleteItem(item.id)">Delete</small>
       <hr />
     </div>
   </div>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { db } from '@/main'

import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'home',
  beforeCreate: function () {
    this.$store.dispatch('setItems')
  },
  data: function () {
    return {
      myTodo: '',
      errors: '',
    }
  },
  methods: {
    addToDo: function () {
      this.errors = ''
      if (this.myTodo !== '') {
        db.collection('items').add({
          title: this.myTodo,
          created_at: Date.now()
        }).then((response:any) => {
          if (response) {
            this.myTodo = ''
          }
        }).catch((error:any) => {
          this.errors = error
        })
      } else {
        this.errors = '何か文字を記入してください'
      }
    },
    deleteItem: function (id:number) {
      if (id) {
        db.collection("items").doc(id).delete().then(function() {
        console.log('Document successfully deleted')
        }).catch(function(error:any) {
          error = error
        })
      } else {
        this.errors = 'Invalid ID'
      }
    },
  },
});
</script>

<style>
* {
  box-sizing:border-box;
}

body, html, #app {
  background:#E0F8F7;
}

.home {
  width:300px;
  margin:auto;
  margin-top: 200px;
}

#vue-logo {
  width:100px;
}

input, button {
  border:0;
  width:100%;
  margin:0 0 10px;
  padding:7px;
}

input {
  font-size:12px;
}

button {
  background:#43b823;
  border:0;
  text-transform:uppercase;
  color:#fff;
  font-weight:700;
  cursor:pointer;
}

.title {
  font-size:14px;
  font-weight:700;
  padding:0 0 10px 0;
  margin:0 0 10px 0;
  border-bottom:1px solid #666;
}

#errors {
  background:#a52222;
  color:#fff;
  padding:5px;
}
</style>
