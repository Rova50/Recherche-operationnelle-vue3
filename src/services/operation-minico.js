import { calculZ } from '@/utils/array-sum-calcul-z'
import { Operation } from './operation';

export default class extends Operation{
  constructor(mat, tabLign, tabCol) {
    super(mat,tabLign,tabCol)
  }

  opererColonne(column) {
    
    if (column >= this.cols) {
      this.finishedBase = true;
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
    if(this.finishedBase){
        this.Z = calculZ(this.matrice,this.matP,this.colTemp);
    }
  }
}
