<style scoped>
</style>

<template>
  <v-app>
    <header-view :onShotLabel="'Immediat'"/>
    <router-view />
  </v-app>
</template>

<script setup>
  import { onMounted, inject, ref, watch } from 'vue';
  import HeaderView from '@/components/header.vue';
  
</script>
