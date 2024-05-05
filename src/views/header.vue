<template>
      <v-row class="title">
        <!-- Colonne de gauche -->
        <v-col cols="2" class="corner">
          RECHERCHE OPERATIONNELLE
        </v-col>
  
        <!-- Colonne du milieu -->
        <v-col cols="8" id="sltBase">
          <h3 style="color: red; text-align: center;">
            Solution de base
          </h3>
        </v-col>
  
        <!-- Colonne de droite -->
        <v-col cols="2" class="corner">
          PROBLEME DE TRANSPORT
        </v-col>
      </v-row>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  </script>
  
  <style scoped>
  .corner {
    background-color: green;
  }
  </style>
  