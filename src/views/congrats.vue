<template>
  <v-card>
    <v-card-title class="headline">Fin de traitement</v-card-title>
    <v-card-text>
      <p>{{ message }} <v-icon>{{ emoji }}</v-icon></p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="proceed">Continuer <v-icon>mdi-arrow-right</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

const message = ref("Algorithme d'optimisation de problème de transport terminé avec succès. Resultat dans le deuxième tableau");
const emoji = ref("mdi-check-circle-outline");

const proceed = () => {
// Action à effectuer pour passer à l'étape suivante
};
</script>

<style scoped>
.container {
    margin-top: 50px;
}
</style>
