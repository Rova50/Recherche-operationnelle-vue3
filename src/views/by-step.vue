<style scoped>
</style>

<template>
  <v-content style="margin-top: 50px;">
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
    <v-container>
      <v-card>
        <v-card-text>
          <div class="row" style="display:block">
            <div class="" style="display:inline-block">
              <table-view 
                :tables="tables" 
                :tableColumn="tableColumn" 
                :tableLine="tableLine" 
                :action="'yes'"
                :inputType="'number'"
                :tableToColor="colToColored"
                @default-data-option="openDialog=true"
                @save="handleSave"
              />
            </div>
            <div 
              v-if="tableTreatedDiff.length>2 && showAction" 
              style="display:inline-block;"
            >
              <table-view 
                :tables="tableTreatedDiff" 
                :tableColumn="tableColumnTreated" 
                :tableLine="tableLineTreated" 
                :action="'no'"
              />
            </div>	    	
            <div class="" style="display:inline-block;">
              <table-view 
                :tables="tablesTreated" 
                :tableColumn="tableColumnTreated" 
                :tableLine="tableLineTreated" 
                :action="'no'"
                :tableToColor="colToColoredStepping"
                :color="'grey'"
              />	
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
    <v-container v-if="calculZ">
      <v-card >
        <v-card-text>
          <div  style="text-align:center;">
            {{ `Z = ${calculZ}` }}
          </div>
        </v-card-text>
      </v-card>
    </v-container>
    <v-container style="display:flex; gap:20px;">
      <div id="GRP" style="display:inline-block">
        <svg-view
          :Vx="vx"
          :Vy="vy"
          :colTemp="colToColored"
          :matrice="tables"
        />
      </div>
      <div id="step">
        <table-step-view
          :Vx="vx"
          :Vy="vy"
          :colTemp="colToColored"
          :matrice="tables"
          :matP="tablesTreatedStep"
        />
        <table-gain-view
          v-if="gains.length>0"
          :gains="gains"
        />
        <finish-view 
          v-if="finishedStepping"
        />
      </div>
    </v-container>
  </v-content>
</template>

<script setup>
  import { onMounted, inject, ref, watch } from 'vue';
  import TableView from '@/components/table.vue';
  import TableConfigView from '@/components/table-config.vue';
  import useMatrixInit from '@/composables/useMatrixInit';
  import TableDialogView from '@/components/exemple-table-dialog.vue';
  import SvgView from '@/components/svg-show.vue';
  import TableStepView from '@/components/table-step.vue';
  import TableGainView from '@/components/table-gain.vue';
  import FinishView from '@/components/finish.vue';
  import {OperationFactory} from '@/services/operation-factory'

  const showAction = ref(false);

  const tableCol = ref(6);
  const tableRow = ref(4);
  const { tables, tableLine, tableColumn} = useMatrixInit(tableRow.value,tableCol.value);

  const tablesTreated = ref([[]])
  const tablesTreatedStep = ref([[]])
  const tableLineTreated = ref([]);
  const tableColumnTreated = ref([]);
  const tableTreatedDiff = ref([]);

  const calculZ=ref(0);
  const colToColored=ref([]);
  const vx=ref([]);
  const vy=ref([]);
  const colToColoredStepping = ref([]);

  const gains = ref([[]]);

  const finishedStepping = ref(false);

  let factory = null;
  let matrixOps = null;

  const handleSave = (tables, table_rows, tables_column) => {
    showAction.value = true;
    factory = new OperationFactory(tables, table_rows, tables_column);
  }


  const handleClick = (type, count) => {
    factory.setType(type);
    matrixOps = factory.getOperation();
    matrixOps.process(count);
    (type!='diffmax')?1:tableTreatedDiff.value = matrixOps.matDiff;
    tablesTreated.value = matrixOps.matP;
    tablesTreatedStep.value = matrixOps.matPCopied;
    tableColumnTreated.value = matrixOps.tabCol;
    tableLineTreated.value = matrixOps.tabLign;
    showAction.value = !matrixOps.finishedBase;
    colToColored.value = matrixOps.colTemp;
    calculZ.value = matrixOps.Z;
    if(matrixOps.finishedBase) {
      matrixOps.maxMatP();
      vx.value = matrixOps.Vx;
      vy.value = matrixOps.Vy;
    }
  }

  const handleRefresh = (count) => {
    matrixOps.processMark(count);
    tablesTreated.value = matrixOps.matP;
    tablesTreatedStep.value = matrixOps.matPCopied;
    colToColoredStepping.value = matrixOps.toColor;
    gains.value = matrixOps.gains;
    gains.value.push([]);
    calculZ.value = matrixOps.Z;
    colToColored.value = matrixOps.colTemp;
    vx.value = matrixOps.Vx;
    vy.value = matrixOps.Vy;
    finishedStepping.value = matrixOps.finishedSteppingStone;
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
