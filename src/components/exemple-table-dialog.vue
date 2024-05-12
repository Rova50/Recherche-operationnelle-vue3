<template>
    <div class="text-center pa-4">
      <slot />
  
      <v-dialog
        v-model="openDialog"
        width="auto"
      >
        <v-card
          max-width="1000"
          prepend-icon="mdi-update"
          title="choix exemple"
        >
        <v-list density="compact">
         <v-list-subheader></v-list-subheader>
            <v-list-item
              v-for="(item, i) in data"
              :key="i"
              :value="item"
              color="primary"
            >
              <template v-slot:prepend>
                {{`Ex${i}: `}}
              </template>
      
              <v-list-item-title @click="$emit('exemple-chosen',item)">
                <table-view :tables="item.DT" :tableColumn="item.DTC" :tableLine="item.DTL"  :action="'no'"/>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </div>
</template>
<script setup>
    import {ref, onMounted, watch} from 'vue';
    import TableView from '@/components/table.vue';
    import {data} from '@/composables/exemples';
    const props = defineProps({
      dialog:Boolean
    });

    const openDialog = ref(false);
    onMounted(()=>{
      openDialog.value = props.dialog;
    })

    watch(
      [() => props.dialog],
      ([newOpt]) => {
        openDialog.value = newOpt;
      }
    );

</script>
<style scoped>
  input {
    pointer-events:none;
  }
</style>