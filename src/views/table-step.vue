<template>
    <div v-html="tableContent"></div> <!-- Render the table content -->
</template>
  
<script setup>
  import { computed } from 'vue';
  
  // Define props to accept data into the component
  const props = defineProps({
    matP: {
      type: Array,
      required: true,
    },
    Vx: {
      type: Array,
      required: true,
    },
    Vy: {
      type: Array,
      required: true,
    },
    matrice: {
      type: Array,
      required: true,
    },
    lettre: {
      type: Array,
      required: true,
    },
  });
  
  // Helper function to calculate the number of rows in the table
  const nbLinTabStep = () => {
    let nb = 0;
    props.matP.forEach((row) => {
      nb += row.filter((val) => val === '-').length;
    });
    return Math.ceil(nb / 3);
  };
  
  // Computed property to generate the table content
  const tableContent = computed(() => {
    const nbl = nbLinTabStep();
    const step = [];
    const negStep = [];
  
    for (let i = 0; i < props.matP.length; i++) {
      for (let j = 0; j < props.matP[i].length; j++) {
        if (props.matP[i][j] === '-') {
          const x = props.Vx[i];
          const m = parseInt(props.matrice[i][j], 10);
          const y = props.Vy[j];
          const sigma = x + m - y;
  
          const stepText = `σ(${props.lettre[i]}, ${j}) = ${x} + ${m} - ${y} = ${sigma}`;
          step.push(stepText);
  
          if (sigma < 0) {
            negStep.push(`<input type="text" style="border:0px; width:200px; text-align:left; color:red" value="${stepText}">`);
          }
        }
      }
    }
  
    let tb = '<h3>Algorithme de Stepping Stone</h3><table>';
    let k = 0;
    for (let i = 0; i < nbl; i++) {
      tb += '<tr>';
      for (let j = 0; j < 3; j++) {
        if (step[k]) {
          tb += `<td><input type="text" style="border:0px; width:200px; text-align:left" value="${step[k]}"></td>`;
          k++;
        }
      }
      tb += '</tr>';
    }
    tb += '</table>';
  
    if (negStep.length > 0) {
      tb += '<br><table id="neg">';
      for (const ns of negStep) {
        tb += `<tr><td>${ns}</td></tr>`;
      }
      tb += '</table>';
    }
  
    return tb;
  });
</script>