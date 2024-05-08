import { calculZ } from '@/utils/array-sum-calcul-z'
import { Operation } from './operation';
export default class extends Operation {
  constructor(mat, tabLign, tabCol) {
    super(mat, tabLign, tabCol)
  }

  // Function to operate on a row based on given conditions
  opererLi(row) {
    // Ensure proper initialization before operation
    if (row >= this.rows) {
      this.finished = true;
      return;
    }
    let keepLooping = true;

    while (keepLooping) {
      let minColIndex = 0;
      let minValue = parseInt(this.mat[row][0]);

      // Find the minimum value in the row that is not already marked
      for (let col = 0; col < this.mat[row].length; col++) {
        const currentValue = parseInt(this.mat[row][col]);

        if (!this.isIndexInColTemp(row, col)) {
          this.matP[row][col] = '-'; // Mark as processed
          
          if (currentValue < minValue) {
            minValue = currentValue;
            minColIndex = col;
          }
        }
      }

      // Add the minimum index to colTemp
      this.colTemp[row].push(minColIndex);

      // Determine adjustments based on tabLign and tabCol
      const currentTabLign = parseInt(this.tabLign[row]);
      const currentTabCol = parseInt(this.tabCol[minColIndex]);

      if (currentTabLign > currentTabCol) {
        this.matP[row][minColIndex] = currentTabCol; // assign the remainder
        this.tabLign[row] = currentTabLign - currentTabCol; // adjust remaining line value
        this.tabCol[minColIndex] = 0; // column is exhausted
      } else {
        this.matP[row][minColIndex] = currentTabLign; // assign the whole line
        this.tabCol[minColIndex] = currentTabCol - currentTabLign; // adjust remaining column value
        this.tabLign[row] = 0; // line is exhausted
      }

      // Determine if the loop should continue
      if (this.tabLign[row] === 0) {
        this.barrerLigne(row); // marks the line as complete
        keepLooping = false;
      } else if (this.tabCol[minColIndex] === 0) {
        this.barrerColonne(minColIndex); // marks the column as complete
      }
    }
  }

  process(row){
    for (let index = 0; index <= row; index++) {
      this.opererLi(index);
    }
    if(this.finished){
        this.Z = calculZ(this.matrice,this.matP,this.colTemp);
    }
  }

}
