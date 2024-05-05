import { cloneArray } from '@/utils/clone-array';
import { maxAndSecondMaxColumn, maxAndSecondMaxRow } from '@/utils/two-dimensional-array'

export default class {
  constructor(mat, tabLign, tabCol) {
    this.rows = tabLign.length;
    this.cols = tabCol.length;
    this.mat = cloneArray(mat) || [];
    this.matDiff = cloneArray(mat) || [];
    this.tabLign = cloneArray(tabLign) || [];
    this.tabCol = cloneArray(tabCol) || [];
    this.colTemp = [];
    this.matP = [];
    this.finished = false;

    // Initialize auxiliary arrays
    this.initArrays();
  }

  initArrays() {
    this.initMatP();
    this.initColTemp();
  }

  initMatP() {
    this.matP = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => '')
    );
  }

  initColTemp() {
    this.colTemp = Array.from({ length: this.rows }, () => []);
  }

  isIndexInColTemp(row, colIndex) {
    return this.colTemp[row].includes(colIndex);
  }

  barrerLigne(row) {
    for (let col = 0; col < this.cols; col++) {
      this.mat[row][col] = 10000000000; // Mark invalid
      if (!this.isIndexInColTemp(row, col)) {
        this.matP[row][col] = '-'; // Indicate invalid position
      }
    }
  }

  barrerColonne(colIndex) {
    for (let row = 0; row < this.rows; row++) {
      this.mat[row][colIndex] = 10000000000; // Mark invalid
      if (!this.isIndexInColTemp(row, colIndex)) {
        this.matP[row][colIndex] = '-'; // Indicate invalid position
      }
    }
  }

  opererDI(param) {

    if(this.finished){
        return;
    }

    const maxAndSecondMaxRows = maxAndSecondMaxRow(this.matDiff);
    const diffMaxRow = maxAndSecondMaxRows.map((row) => row.max-row.secondMax)

    const MaxofDiffMaxRow = Math.max(...diffMaxRow);
    const maxRowIndex = diffMaxRow.indexOf(MaxofDiffMaxRow);

    const maxAndSecondMaxColumns = maxAndSecondMaxColumn(this.matDiff);
    const diffMaxColumn = maxAndSecondMaxColumns.map((column) => column.max-column.secondMax)

    const MaxofDiffMaxColumn = Math.max(...diffMaxColumn);
    const maxColumnIndex = diffMaxColumn.indexOf(MaxofDiffMaxColumn);

    if (MaxofDiffMaxRow > MaxofDiffMaxColumn) {
        let indicol = 0;
        let min = parseInt(this.mat[maxRowIndex][0]);
        for (let col = 0; col < this.mat[maxRowIndex].length; col++) {
            const currentValue = parseInt(this.mat[maxRowIndex][col]);
            if (!this.isIndexInColTemp(maxRowIndex,col)) {
                this.matP[maxRowIndex][col] = '-';
                if (min > currentValue) {
                    min = currentValue;
                    indicol = col;
                }
            }
        }

        this.colTemp[maxRowIndex].push(indicol);

        const currentTabLign = parseInt(this.tabLign[maxRowIndex]);
        const currentTabCol = parseInt(this.tabCol[indicol]);

        if (currentTabLign > currentTabCol) {
            this.matP[maxRowIndex][indicol] = currentTabCol;
            this.tabLign[maxRowIndex] = currentTabLign - currentTabCol;
            this.tabCol[indicol] = 0;
        } else {
            this.matP[maxRowIndex][indicol] = currentTabLign;
            this.tabCol[indicol] = currentTabCol - currentTabLign;
            this.tabLign[maxRowIndex] = 0;
        }


        if (
            parseInt(this.tabLign[maxRowIndex]) === 0
        ) {
            this.barrerLigne(maxRowIndex);
            this.supplin(maxRowIndex);
        } else if (
            parseInt(this.tabCol[indicol]) == 0
        ) {
            this.barrerColonne(indicol, maxRowIndex);
            this.suppcol(indicol);
        }

    } else {
        let indl = 0;
        let min = parseInt(this.mat[0][maxColumnIndex]);
        indl = 0;
        for (let row = 0; row < this.mat.length; row++) {
            const currentValue = parseInt(this.mat[row][maxColumnIndex]);

            if (!this.isIndexInColTemp(row,maxColumnIndex)) {
                if (min > currentValue) {
                    min = currentValue;
                    indl = row;
                }
            }
        }
        this.colTemp[indl].push(maxColumnIndex);
        
        const currentTabLign = parseInt(this.tabLign[indl]);
        const currentTabCol = parseInt(this.tabCol[maxColumnIndex]);
        if (currentTabLign > currentTabCol) {
            this.matP[indl][maxColumnIndex] = currentTabCol;
            this.tabLign[indl] = currentTabLign - currentTabCol;
            this.tabCol[maxColumnIndex] = 0;
        } else {
            this.matP[indl][maxColumnIndex] = currentTabLign;
            this.tabCol[maxColumnIndex] = currentTabCol - currentTabLign;;
            this.tabLign[indl] = 0;
        }
        
        if (
            parseInt(this.tabCol[maxColumnIndex]) === 0
        ) {
            this.barrerColonne(maxColumnIndex);
            this.suppcol(maxColumnIndex);
        } else if (
            parseInt(this.tabLign[indl]) == 0
        ) {
            this.barrerLigne(indl);
            this.supplin(indl);
        }
    }

    this.finished = this.tabCol.every(value => value==0) 
            && this.tabLign.every(value => value==0);
}

  supplin(rowIndex) {
    // Supplementary logic when a row is marked as completed
    console.log(`Supplementing row: ${rowIndex}`);
    
    for (let c = 0; c < this.cols; c++) {
        this.matDiff[rowIndex][c] = '';
    }
    
  }

  suppcol(colIndex) {
    // Supplementary logic when a column is marked as completed
    console.log(`Supplementing column: ${colIndex}`);
    for (let r = 0; r < this.rows; r++) {
        this.matDiff[r][colIndex] = '';
    }
  }

  process(column){
    for (let index = 0; index <= column+1; index++) {
      this.opererDI(index);
    }
  }
}
