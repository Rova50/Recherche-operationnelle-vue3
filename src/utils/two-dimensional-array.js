import { cloneArray } from '@/utils/clone-array'

const maxAndSecondMaxColumn = (array2D_param) => {
    if (!Array.isArray(array2D_param) || !array2D_param.length || !Array.isArray(array2D_param[0])) {
      throw new Error("Invalid 2D array");
    }
    const array2D = cloneArray(array2D_param);
    const numColumns = array2D[0].length;
    const results = Array.from({ length: numColumns }, () => ({
      max: null,
      maxIndex: null,
      secondMax: null,
      secondMaxIndex: null,
    }));
    array2D.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        if(value!=''){
            if (
              results[columnIndex].max === null ||
              value > results[columnIndex].max
            ) {
              // If the current value is greater than max, update secondMax and max
              results[columnIndex].secondMax = results[columnIndex].max;
              results[columnIndex].secondMaxIndex = results[columnIndex].maxIndex;
      
              results[columnIndex].max = value;
              results[columnIndex].maxIndex = rowIndex;
            } else if (
              results[columnIndex].secondMax === null ||
              (value > results[columnIndex].secondMax && value < results[columnIndex].max)
            ) {
              // If it's greater than secondMax but less than max
              results[columnIndex].secondMax = value;
              results[columnIndex].secondMaxIndex = rowIndex;
            }
        }
      });
    });
  return results;
}

const maxAndSecondMaxRow = (array2D_param) => {
    if (!Array.isArray(array2D_param) || !array2D_param.length || !Array.isArray(array2D_param[0])) {
      throw new Error("Invalid 2D array");
    }
    const array2D = cloneArray(array2D_param);
  
    const results = array2D.map(row => {
      let max = null;
      let maxIndex = null;
      let secondMax = null;
      let secondMaxIndex = null;
  
      row.forEach((value, columnIndex) => {
        if(value!=''){
            if (max === null || value > max) {
            // Update secondMax before updating max
            secondMax = max;
            secondMaxIndex = maxIndex;
    
            max = value;
            maxIndex = columnIndex;
            } else if (
            secondMax === null ||
            (value > secondMax && value < max)
            ) {
            secondMax = value;
            secondMaxIndex = columnIndex;
            }
        }
      });
  
      return {
        max,
        maxIndex,
        secondMax,
        secondMaxIndex,
      };
    });
  
  return results;
}

export {maxAndSecondMaxColumn, maxAndSecondMaxRow};
