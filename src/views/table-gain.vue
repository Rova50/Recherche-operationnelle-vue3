<template>
    <v-container>
        <v-card v-if="gains[0].length>0">
            <v-card-title class="headline">
                    Calcul gain en rouge ci-dessus
            </v-card-title>
            <v-card-text>
                
                <div v-html="tableGain"></div>
            </v-card-text>
        </v-card>
    </v-container>
</template>
  
<script setup>
  import { computed } from 'vue';
  
  // Define props to accept data into the component
  const props = defineProps({
    gains: {
      type: Array,
      required: true,
    }
  });

  const getMaxGain = (gains) => {
    const gainList = gains
                    .filter((gain)=> {
                        return gain.length>0
                    })
                    .map((gain)=> {
                    return (-1*gain[0])*gain[1];
                    });

    let max = 0;
    let i = 0;
    for (let index = 0; index < gainList.length; index++) {
        const element = gainList[index];
        if (max < element) {
            max = element;
            i = index;
        }
    }
    return i;
  }
  
  // Computed property to generate the table content
  const tableGain = computed(() => {
    let tb = '';
    const gainList = props.gains.filter((gain)=> {
                        return gain.length>0
                    });
    for (let index = 0; index < gainList.length; index++) {
        const element = gainList[index];
        if(index==getMaxGain(props.gains)){
            
            tb+=`<input type='text' style='border:0px; color:red; width:200px; text-align:left;' value='${element[0]} x ${element[1]} = ${element[0]*element[1]}'>`
        }
        else
        {
            tb+=`<input type='text' style='border:0px; width:200px; text-align:left;' value='${element[0]} x ${element[1]} = ${element[0]*element[1]}'>`
        }
    }
    return tb;
  });
</script>