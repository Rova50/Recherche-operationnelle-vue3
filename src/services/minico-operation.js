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

  opererColonne(column) {
    
    if (column >= this.cols) {
      this.finished = true;
      return;
    }
    let rowIndex = 0;
    let keepLooping = true;
    while (keepLooping) {
        let minValue = parseInt(this.mat[0][column]);
        rowIndex = 0;
        for (let row = 0; row < this.mat.length; row++) {
            if (!this.isIndexInColTemp(row, column)) {
              const currentValue = parseInt(this.mat[row][column]);
              if (minValue > currentValue) {
                minValue = currentValue;
                rowIndex = row;
              }
            }
        }
        this.colTemp[rowIndex].push(column);

        // Determine adjustments based on tabLign and tabCol
        const currentTabLign = parseInt(this.tabLign[rowIndex]);
        const currentTabCol = parseInt(this.tabCol[column]);

        if (currentTabLign > currentTabCol) {
            this.matP[rowIndex][column] = currentTabCol;
            this.tabLign[rowIndex] = currentTabLign - currentTabCol;
            this.tabCol[column] = 0;
        } else {
            this.matP[rowIndex][column] = currentTabLign;
            this.tabCol[column] = currentTabCol - currentTabLign;
            this.tabLign[rowIndex] = 0;
        }
        if (
          parseInt(this.tabCol[column]) === 0
        ) {
            this.barrerColonne(column);
            keepLooping = false;
        } else if (
          parseInt(this.tabLign[rowIndex]) === 0
        ) {
            this.barrerLigne(rowIndex);
        }
    }
  }

  process(column){
    for (let index = 0; index <= column; index++) {
      this.opererColonne(index);
    }
  }
}
