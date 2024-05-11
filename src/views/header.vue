<template>
  <v-app-bar
    color="default"
    title="Recherche operationnelle"
    flat
    elevation="2"
  >
    <template v-slot:append>
        <v-switch
          v-model="darkMode"
          label="Mode"
        ></v-switch>
    </template>
  </v-app-bar>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const darkMode = ref(false);
  const method = ref(null);
  const selectedLanguage = ref('english');
  const languages = ['french', 'english', 'german'];
  </script>
  
  <style scoped>
  .corner {
    background-color: green;
  }
  </style>
  