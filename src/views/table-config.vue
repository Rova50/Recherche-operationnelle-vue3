<template>
    <v-container style="text-align: center; margin-top: 10px;">
      <v-row>
        <!-- Champs pour les lignes et colonnes -->
        <v-col cols="2">
          <v-text-field
            v-model="ligne"
            type="number"
            label="Ligne"
            outlined
            dense
            @input="$emit('input:row-count-changed',ligne)"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="colone"
            type="number"
            label="Colonne"
            outlined
            dense
            @input="$emit('input:col-count-changed', colone)"
          ></v-text-field>
        </v-col>
      </v-row>
  
      <!-- Boutons d'action -->
      <v-row v-if="showAction">

          <v-btn
            color="info"
            style="width: 150px; margin: 10px;"
            @click="stepMinimumColumn"
            v-if="showMinico"
          >
            MINICO
          </v-btn>
          <v-btn
            color="info"
            style="width: 150px; margin: 10px;"
            @click="stepMinimumLine"
            v-if="showMinili"
          >
            MINILI
          </v-btn>
          <v-btn
            color="warning"
            style="width: 200px; margin: 10px;"
            @click="stepMaxDifference"
            v-if="showDiff"
          >
            DIFFERENCE MAXIMALE
          </v-btn>
      </v-row>
  
      <v-btn
        color="error"
        style="width: 150px; position: fixed; right: 64px; top: 164px;"
        @click="Marquage"
      >
        Actualiser
      </v-btn>
    </v-container>
  </template>
  
  <script setup>
  import { ref,watch,onMounted  } from 'vue';
  
  const ligne = ref(4);
  const colone = ref(6);

  const step = ref(0);

  const showMinico = ref(true);
  const showMinili = ref(true);
  const showDiff = ref(true);

  const showAction = ref(false);
  
  const emit = defineEmits([
    'input:col-count-changed', 
    'input:row-count-changed',
    'click:one-step',
  ]);
  const props = defineProps({
    isActions: Boolean,
  });

  onMounted(()=>{
    showAction.value = props.isActions;
  })

  watch(
    [() => props.isActions],
    ([newOpt]) => {
      showAction.value = newOpt;
    }
  );

  const stepMinimumColumn = () => {
    showMinili.value = false;
    showDiff.value = false;
    emit('click:one-step', 'minico', step.value++);
  };
  
  const stepMinimumLine = () => {
    showMinico.value = false;
    showDiff.value = false;
    emit('click:one-step', 'minili', step.value++);
  };
  
  const stepMaxDifference = () => {
    showMinico.value = false;
    showMinili.value = false;
    emit('click:one-step', 'maxdiff', step.value++);
  };
  
  const Marquage = () => {
    // Code pour Actualiser
  };
  
  </script>
  
  <style scoped>
  /* Ajoutez des styles supplémentaires si nécessaire */
  </style>
  