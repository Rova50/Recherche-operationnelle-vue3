import { cloneArray } from '@/utils/clone-array'

export default class {
  constructor(mat, tabLign, tabCol) {
    this.rows = tabLign.length;
    this.cols = tabCol.length;
    this.mat = cloneArray(mat) || [];
    this.tabLign = cloneArray(tabLign) || [];
    this.tabCol = cloneArray(tabCol) || [];
    this.colTemp = [];
    this.matP = [];
    this.finished = false;
    this.initArrays();
  }

  // Function to initialize matP with default values
  initMatP() {
    this.matP = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => '')
    );
  }

  // Function to initialize colTemp with empty arrays for each row
  initColTemp() {
    this.colTemp = Array.from({ length: this.rows }, () => []);
  }

  // Function to initialize other arrays (like tabLign and tabCol)
  initArrays() {
    this.initMatP();   // Initialize matP
    this.initColTemp(); // Initialize colTemp
  }

  // Helper function to check if index is in colTemp
  isIndexInColTemp(row, index) {
    return this.colTemp[row].includes(index);
  }

  // Function to mark a whole row as invalid
  barrerLigne(row) {
    for (let col = 0; col < this.cols; col++) {
      this.mat[row][col] = 10000000000; // Mark as invalid
      if (!this.isIndexInColTemp(row, col)) {
        this.matP[row][col] = '-'; // Indicate invalid position in matP
      }
    }
  }

  // Function to mark a whole column as invalid
  barrerColonne(colIndex) {
    for (let row = 0; row < this.rows; row++) {
      this.mat[row][colIndex] = 10000000000; // Mark as invalid
      if (!this.isIndexInColTemp(row, colIndex)) {
        this.matP[row][colIndex] = '-'; // Indicate invalid position in matP
      }
    }
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
  }
}
