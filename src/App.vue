<script setup>
  import { onMounted, inject, ref, watch } from 'vue';
  import HeaderView from './views/header.vue';
  import TableView from './views/table.vue';
  import TableConfigView from './views/table-config.vue';
  import useMatrixInit from './composables/useMatrixInit';
  import TableDialogView from './views/exemple-table-dialog.vue';
  import Minili from '@/services/minili-operation.js';
  import Minico from '@/services/minico-operation.js';
  import MaxDiff from '@/services/diffmax-operation.js';

  const showAction = ref(false);

  const tableCol = ref(6);
  const tableRow = ref(4);
  const { tables, tableLine, tableColumn} = useMatrixInit(tableRow.value,tableCol.value);

  const tablesTreated = ref([[]]) 
  const tableLineTreated = ref([]);
  const tableColumnTreated = ref([]);

  const tableTreatedDiff = ref([]);

  const handleSave = (tables, table_rows, tables_column) => {
    showAction.value = true;
  }

  const handleClick = (type, count) => {
    if(type=='minili'){
      const matrixOps = new Minili(tables.value, tableLine.value, tableColumn.value);
      matrixOps.process(count);
      tablesTreated.value = matrixOps.matP;
      tableColumnTreated.value = matrixOps.tabCol;
      tableLineTreated.value = matrixOps.tabLign;
      showAction.value = !matrixOps.finished;
    }
    if(type=="minico"){
      const matrixOps = new Minico(tables.value, tableLine.value, tableColumn.value);
      matrixOps.process(count);
      tablesTreated.value = matrixOps.matP;
      tableColumnTreated.value = matrixOps.tabCol;
      tableLineTreated.value = matrixOps.tabLign;
      showAction.value = !matrixOps.finished;
    }
    if(type=="maxdiff"){
      const matrixOps = new MaxDiff(tables.value, tableLine.value, tableColumn.value);
      matrixOps.process(count);
      tableTreatedDiff.value = matrixOps.matDiff;
      tablesTreated.value = matrixOps.matP;
      tableColumnTreated.value = matrixOps.tabCol;
      tableLineTreated.value = matrixOps.tabLign;
      showAction.value = !matrixOps.finished;
    }
  }


  watch(
    [() => tableRow.value, () => tableCol.value],
    ([newRows, newCols]) => {
      const { tables: newTables, tableLine: newTableLine, tableColumn: newTableColumn } = useMatrixInit(newRows, newCols);
      // Réattribuer les valeurs
      tables.value = newTables.value;
      tableLine.value = newTableLine.value;
      tableColumn.value = newTableColumn.value;
    }
  );

  const openDialog = ref(false);

</script>

<template>
  <header>
    <h1>✨ RECHERCHE OPERATIONNELLE ✨</h1>
  </header>

  <header-view/>
  <div style="padding:10px;">
    <table-config-view 
      :isActions="showAction"
      @input:col-count-changed="(n) => tableCol = parseInt(n)" 
      @input:row-count-changed="(n) => tableRow = parseInt(n)"
      @click:one-step="handleClick"
    />
    <table-dialog-view 
      :dialog="openDialog"
      @exemple-chosen="(item)=>{
        tables=item.DT;
        tableLine=item.DTL;
        tableColumn=item.DTC;
      }"
    />
    <div id="content" class="row" style="display:block">
      <div id="content1" class="" style="display:inline-block">
        <table-view 
          :tables="tables" 
          :tableColumn="tableColumn" 
          :tableLine="tableLine" 
          :action="'yes'"
          :inputType="'number'"
          @default-data-option="openDialog=true"
          @save="handleSave"
        />
      </div>
      <div v-if="tableTreatedDiff.length>2" id="content0" class="" style="display:inline-block; margin-left:50px;">
        <table-view 
          :tables="tableTreatedDiff" 
          :tableColumn="tableColumnTreated" 
          :tableLine="tableLineTreated" 
          :action="'no'"
        />
      </div>	    	
      <div id="content2" class="" style="display:inline-block; margin-left:50px;">
        <table-view 
          :tables="tablesTreated" 
          :tableColumn="tableColumnTreated" 
          :tableLine="tableLineTreated" 
          :action="'no'"
        />	
      </div>
    </div>

    <div id="Z" style="text-align:center;">
    </div>
    <div style="display:block;">
      <div id="GRP" style="display:inline-block"></div>
      <div id="step" style="display:inline-block; position:absolute; margin-left:50px;"></div>
    </div>
  </div>

</template>

<style scoped>
  h1 {
    text-align: center;
  }
</style>
