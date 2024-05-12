<template>
  <v-app-bar
    color="default"
    title="Recherche operationnelle"
    flat
    elevation="2"
  >
    <template v-slot:append>
        <v-switch
          v-model="mode"
          label="Immediat"
          @update:modelValue="handleChange"
        ></v-switch>
    </template>
  </v-app-bar>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const props = defineProps({
    onShotLabel: String
  });

  const router = useRouter();

  const mode = ref(false);

  const handleChange = (value) => {
    const name = (value)?'on-shot':'by-step';
    router.push({
      name:name
    })
  }

  </script>
  
  <style scoped>
  .corner {
    background-color: green;
  }
  </style>
  