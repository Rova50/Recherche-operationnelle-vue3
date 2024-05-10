<template>
    <div v-html="svgContent"></div> <!-- Render SVG content -->
  </template>
  
  <script setup>
  import { computed,ref } from 'vue';
  import { convertRange } from '@/utils/number-to-letter-range';

  // Retrieve props
  const props = defineProps({
    colTemp: {
      type: Array,
      required: true,
    },
    matrice: {
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
  });

  
  const lettre = ref([]);
  
  // Computed property to generate the SVG content using the props
  const svgContent = computed(() => {
    lettre.value = convertRange(props.matrice.length);
    let svg = `<svg height="400" width="400" style="border: 1px solid black">
      <marker id="fleche" markerHeight="10" refX="0" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="red"></path>
      </marker>`;
    
    let htr1 = 60;
    let htr2 = 60;
    let id = 0;
  
    // Create lines and labels using the props
    for (let i = 0; i < props.colTemp.length; i++) {
      for (const j of props.colTemp[i]) {
        svg += `<path stroke="red" marker-end="url(#fleche)" id="p${id}" d="M50 ${60 * (i + 1)} l225 ${60 * (j - i)}" />
                <text x="150"><textPath href="#p${id}">${props.matrice[i][j]}</textPath></text>`;
        id++;
      }
    }
  
    // Create row circles
    for (let i = 0; i < props.matrice.length; i++) {
      const h = htr1 + 5;
      svg += `<circle cx="50" cy="${htr1}" r="20" stroke="green" stroke-width="1" fill="yellow" />
              <text x="45" y="${h}">${lettre.value[i]}</text>
              <text x="5" y="${h}">
                ${typeof props.Vx[i]=='undefined' ?'':props.Vx[i]}
              </text>`;
      htr1 += 60;
    }
  
    // Create column circles
    for (let i = 0; i < props.matrice[0].length; i++) {
      const h = htr2 + 5;
      svg += `<circle cx="300" cy="${htr2}" r="20" stroke="green" stroke-width="1" fill="yellow" />
              <text x="295" y="${h}">${i + 1}</text>
              <text x="335" y="${h}">
                ${typeof props.Vy[i]=='undefined' ?'':props.Vy[i]}
              </text>`;
      htr2 += 60;
    }
  
    svg += '</svg>';
  
    return svg;
  });
  </script>
  