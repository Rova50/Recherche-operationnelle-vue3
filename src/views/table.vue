<template>
  <v-container style="text-align: center; margin-top: 10px;">
    <div>
      <v-row v-if="action=='yes'">
          <v-btn
            small
            color="secondary"
            style="width: 150px;margin: 15px;"
            @click="$emit('default-data-option')"
            v-if="showDefaultData"
          >
            Default Data
          </v-btn>
          <v-btn
            small
            color="success"
            style="width: 150px; margin: 15px;"
            @click="handleSave"
            v-if="showSave"
          >
            Save
          </v-btn>
      </v-row>
    </div>
    <div class="content1" :disabled="action=='no'">
      <div style="display: block; text-align: left;">
        <!-- Tableau principal -->
        <div style="display: inline-block;">
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th v-for="col in cols" :key="'col-' + col">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in rows" :key="'row-' + r">
                <td>{{ lettre[r - 1] }}</td>
                <td v-for="c in cols" :key="'cell-' + r + '-' + c">
                  <input
                    :type="inputType"
                    :style="{
                      width: '45px', 
                      textAlign: 'center', 
                      backgroundColor: tableToColor && tableToColor[r-1] && tableToColor[r-1].includes(c-1) 
                      ? (typeof color==='undefined'?'yellow':color) : 'white', 
                      color: 'black', 
                      border: '1px solid grey'
                    }"
                    :class="'input-' + r + '-' + c"
                    v-model="tables[r-1][c-1]"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Tableau des quantités disponibles -->
        <div style="display: inline-block; position: relative; margin-top: 22px;">
          <table class="tablelIn">
            <tbody>
              <tr v-for="r in rows" :key="'lin-' + r">
                <td>
                  <input
                    :type="inputType"
                    style="width: 45px; text-align: center; background-color: white; color: black; border: 1px solid red;"
                    :class="'l' + r"
                    v-model="tableLine[r-1]"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Tableau des quantités demandées -->
      <div>
        <table class="tableCol" style="margin-left: 15px;">
          <tr>
            <td v-for="c in cols" :key="'col-' + c">
              <input
                :type="inputType"
                style="width: 45px; text-align: center; background-color: white; color: black; border: 1px solid red;"
                :class="'c' + c"
                v-model="tableColumn[c-1]"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { convertRange } from '@/utils/number-to-letter-range'
import { numberRange } from '@/utils/number-range'

const props = defineProps({
  tables: Array,
  tableLine:Array,
  tableColumn:Array,
  tableToColor:Array,
  action: "yes"|"no",
  inputType: "number"|"text",
  color: String,
})

const emit = defineEmits(['default-data-option','save']);

const tables = ref([[]])
const tableLine = ref([]);
const tableColumn = ref([]);

const rows = ref([]);
const cols = ref([]);
const lettre = ref([]);
const showSave = ref(true);
const showDefaultData = ref(false);

onMounted(()=>{

  tables.value = props.tables;
  tableLine.value = props.tableLine;
  tableColumn.value = props.tableColumn;
  
  rows.value = numberRange(props.tableLine.length);
  lettre.value = convertRange(props.tableLine.length);
  cols.value = numberRange(props.tableColumn.length);
  showDefaultData.value = rows.value.length==4 && cols.value.length==6;
})

watch(
  [() => props.tableLine, () => props.tableColumn, ()=> props.tables],
  ([newRows, newCols, newTabs]) => {
    tables.value = newTabs;
    tableLine.value = newRows;
    tableColumn.value = newCols;

    rows.value = numberRange(newRows.length);
    lettre.value = convertRange(newRows.length);
    cols.value = numberRange(newCols.length);
    showDefaultData.value = newRows==4 && newCols==6;
  }
);

const handleSave = () => {
  // Code pour la sauvegarde
  showSave.value = false;
  emit('save', tables.value, tableLine.value, tableColumn.value);
};

</script>

<style scoped>
/* Ajoutez des styles supplémentaires ici si nécessaire */
</style>
