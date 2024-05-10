<script setup>
  import { onMounted, inject, ref, watch } from 'vue';
  import HeaderView from './views/header.vue';
  import TableView from './views/table.vue';
  import TableConfigView from './views/table-config.vue';
  import useMatrixInit from './composables/useMatrixInit';
  import TableDialogView from './views/exemple-table-dialog.vue';
  import SvgView from './views/svg-show.vue';
  import TableStepView from './views/table-step.vue';
  import {OperationFactory} from '@/services/operation-factory'

  const showAction = ref(false);

  const tableCol = ref(6);
  const tableRow = ref(4);
  const { tables, tableLine, tableColumn} = useMatrixInit(tableRow.value,tableCol.value);

  const tablesTreated = ref([[]]) 
  const tableLineTreated = ref([]);
  const tableColumnTreated = ref([]);
  const tableTreatedDiff = ref([]);

  const calculZ=ref(0);
  const colTemp=ref([]);
  const vx=ref([]);
  const vy=ref([]);

  const nbClickOperation = ref([]);

  const handleSave = (tables, table_rows, tables_column) => {
    showAction.value = true;
  }

  const handleClick = (type, count) => {
    const factory = new OperationFactory(tables.value, tableLine.value, tableColumn.value,type);
    const matrixOps = factory.getOperation();
    matrixOps.process(count);
    (type!='diffmax')?1:tableTreatedDiff.value = matrixOps.matDiff;
    tablesTreated.value = matrixOps.matP;
    tableColumnTreated.value = matrixOps.tabCol;
    tableLineTreated.value = matrixOps.tabLign;
    showAction.value = !matrixOps.finishedBase;
    colTemp.value = matrixOps.colTemp;
    calculZ.value = matrixOps.Z;
    nbClickOperation.value = [type,count];
    if(matrixOps.finishedBase) {
      matrixOps.maxMatP();
      vx.value = matrixOps.Vx;
      vy.value = matrixOps.Vy;
    }
  }

  const handleRefresh = (count) => {
    const factory = new OperationFactory(tables.value, tableLine.value, tableColumn.value,nbClickOperation.value[0]);
    const matrixOps = factory.getOperation();
    matrixOps.process(nbClickOperation.value[1]);
    matrixOps.maxMatP();
    colTemp.value = matrixOps.colTemp;
    vx.value = matrixOps.Vx;
    vy.value = matrixOps.Vy;
    const nbClickRefresh = count - nbClickOperation.value[1];
    matrixOps.processMark(0);
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

  <header-view/>
  <div style="padding:10px;">
    <table-config-view 
      :isActions="showAction"
      @input:col-count-changed="(n) => tableCol = parseInt(n)" 
      @input:row-count-changed="(n) => tableRow = parseInt(n)"
      @click:one-step="handleClick"
      @click:actualised="handleRefresh"
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
          :tableToColor="colTemp"
          @default-data-option="openDialog=true"
          @save="handleSave"
        />
      </div>
      <div v-if="tableTreatedDiff.length>2 && showAction" id="content0" class="" style="display:inline-block; margin-left:50px;">
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

    <div id="Z" v-if="calculZ" style="text-align:center; border:1px dashed red">
      {{ `Z = ${calculZ}` }}
    </div>
    <div style="display:block;">
      <div id="GRP" style="display:inline-block">
        <svg-view
          :Vx="vx"
          :Vy="vy"
          :colTemp="colTemp"
          :matrice="tables"
         />
      </div>
      <div id="step" style="display:inline-block; position:absolute; margin-left:50px;">
        <table-step-view
          :Vx="vx"
          :Vy="vy"
          :colTemp="colTemp"
          :matrice="tables"
          :matP="tablesTreated"
        />
      </div>
    </div>
  </div>

</template>

<style scoped>
</style>
