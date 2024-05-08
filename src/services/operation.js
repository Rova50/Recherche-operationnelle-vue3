import { cloneArray } from '@/utils/clone-array';

export class Operation {
  constructor(mat, tabLign, tabCol) {
    this.rows = tabLign.length;
    this.cols = tabCol.length;
    this.mat = cloneArray(mat) || [];
    this.matrice = cloneArray(mat) || [];
    this.tabLign = cloneArray(tabLign) || [];
    this.tabCol = cloneArray(tabCol) || [];
    this.colTemp = [];
    this.matP = [];
    this.matDiff = cloneArray(mat) || [];
    this.finished = false;
    this.Z = 0;
    this.initArrays();
    // stepping stone
    this.Vx = [];
    this.Vy = [];
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
      this.mat[row][col] = 10000000000; // Marquer invalide
      if (!this.isIndexInColTemp(row, col)) {
        this.matP[row][col] = '-'; // Marquer comme invalide
      }
    }
  }

  barrerColonne(colIndex) {
    for (let row = 0; row < this.rows; row++) {
      this.mat[row][colIndex] = 10000000000;
      if (!this.isIndexInColTemp(row, colIndex)) {
        this.matP[row][colIndex] = '-';
      }
    }
  }

  operer(index) {
    // definir dans la classe fille fille
  }

  complet = () => {
    return this.Vx.every((v) => typeof v === 'number') && this.Vy.every((v) => typeof v === 'number');
  };

  initialise = () => {
    this.Vx.fill('');
    this.Vy.fill('');
  };

  maxLn = () => {
    let max = 0;
    initialise();

    for (let i = 0; i < this.matrice.length; i++) {
      for (const col of this.colTemp[i]) {
        const val = parseInt(this.matrice[i][col], 10);
        if (max < val) {
          initialise();
          this.Vx[i] = 0;
          max = val;
        }
      }
    }
  };

  traitX = (ligne) => {
    return matP[ligne].reduce((possible, col, i) => {
      if (typeof col === 'number') {
        possible.push(i);
      }
      return possible;
    }, []);
  };

  traitY = (colonne) => {
    return matP.reduce((possible, row, i) => {
      if (typeof row[colonne] === 'number') {
        possible.push(i);
      }
      return possible;
    }, []);
  };

  maxMatP = () => {
    maxLn();

    const traiteX = this.Vx.map(() => false);
    const traiteY = this.Vy.map(() => false);

    while (!complet()) {
      for (let i = 0; i < this.Vx.length; i++) {
        if (typeof this.Vx[i] === 'number' && !traiteX[i]) {
          traiteX[i] = true;

          for (const index of traitX(i)) {
            if (!traiteY[index]) {
              this.Vy[index] = this.Vx[i] + parseInt(this.matrice[i][index], 10);
            }
          }

          for (let o = 0; o < this.Vy.length; o++) {
            if (typeof this.Vy[o] === 'number' && !traiteY[o]) {
              traiteY[o] = true;
              for (const index of traitY(o)) {
                if (!traiteX[index]) {
                  this.Vx[index] = this.Vy[o] - parseInt(this.matrice[index][o], 10);
                }
              }
            }
          }
        }
      }
    }
  };

}