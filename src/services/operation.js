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
    this.finishedBase = false;
    this.finishedSteppingStone = false;
    this.Z = 0;
    this.initArrays();
    // stepping stone
    this.Vx = [];
    this.Vy = [];
    this.firstTimeInMarquage = true;
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
    this.Vx = Array.from({ length: this.rows }, () => '')
    this.Vy = Array.from({ length: this.cols }, () => '')
  };

  maxLn = () => {
    let max = 0;
    this.initialise();

    for (let i = 0; i < this.matrice.length; i++) {
      for (const col of this.colTemp[i]) {
        const val = parseInt(this.matrice[i][col], 10);
        if (max < val) {
          this.initialise();
          this.Vx[i] = 0;
          max = val;
        }
      }
    }
  };

  traitX = (ligne) => {
    return this.matP[ligne].reduce((possible, col, i) => {
      if (typeof col === 'number') {
        possible.push(i);
      }
      return possible;
    }, []);
  };

  traitY = (colonne) => {
    return this.matP.reduce((possible, row, i) => {
      if (typeof row[colonne] === 'number') {
        possible.push(i);
      }
      return possible;
    }, []);
  };

  maxMatP = () => {
    this.maxLn();

    const traiteX = this.Vx.map(() => false);
    const traiteY = this.Vy.map(() => false);

    while (!this.complet()) {
      for (let i = 0; i < this.Vx.length; i++) {
        if (typeof this.Vx[i] === 'number' && !traiteX[i]) {
          traiteX[i] = true;

          for (const index of this.traitX(i)) {
            if (!traiteY[index]) {
              this.Vy[index] = this.Vx[i] + parseInt(this.matrice[i][index], 10);
            }
          }

          for (let o = 0; o < this.Vy.length; o++) {
            if (typeof this.Vy[o] === 'number' && !traiteY[o]) {
              traiteY[o] = true;
              for (const index of this.traitY(o)) {
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

  nettoieTable = () => {
    this.matP = this.matP.map(rows=>rows.map(cols=>{
      return (cols==='-' || cols ==='+')?'':parseInt(cols);
    }))
  }

  finishMarquage = (row, col, nb) => {
      if (row != null)
          for (let index = 0; index < row.length; index++) {
              this.traitX(row[index]).forEach((element) => {
                  if (element == col && nb != 0)
                      return true;
              })
          }
      return false;
  }

  boucle = (obj, ok) => {
    if (obj.parent == null) return;
    else {
        let prefixe = '+';
        if (obj.method == 'X') {
            prefixe = '-'
        }
        this.matP[(l.id + 1)][(l.jd + 1)] = prefixe + this.matP[(l.id + 1)][(l.jd + 1)].children[0].value;
        boucle(getCell(l.parent, l.cd, ok), ok)
    }
  }

  getCell = (row, j, ok) => {
    for (let index = 0; index < ok.length; index++) {
        if (ok[index].id == row && ok[index].jd == j)
            return ok[index];
    }
    return null;
  }

  marqueTab = (i, j) => {
    let l = false;
    let c = true;
    let cl = new Array();
    let tb = new Array();
    let ok = new Array();
    let nb = 0;
    let nb1 = 0;
    let nb2 = 1;

    let ans = { 
      parent: null, 
      id: i, 
      jd: j, 
      cd: null, 
      method: '' 
    }
    tb.push(ans);
    ok.push(ans);
    let current = new Array();

    while (!this.finishMarquage(current, j, nb)) {
        current = [];
        if (l) {
            l = !l;
            c = !c;
            for (let index = 1; index <= nb1; index++) {
                this.traitY(cl[(cl.length - index)].id).forEach((element) => {
                    if (cl[(cl.length - index)].jd != element) {
                        let tp = { parent: cl[(cl.length - index)].jd, id: element, jd: cl[(cl.length - index)].id, cd: cl[cl.length - index].id, method: 'Y' }
                        tb.push(tp);
                        ok.push(tp);
                        nb++;
                        nb2++;
                    }
                });
            }
            nb1 = 0;
        } else if (c) {
            c = !c;
            l = !l;
            for (let index = 1; index <= nb2; index++) {
                current.push(tb[(tb.length - index)].id);
                this.traitX(tb[(tb.length - index)].id).forEach((element) => {
                    if (tb[(tb.length - index)].jd != element || tb[(tb.length - index)].method == '') {
                        let tp = { parent: tb[(tb.length - index)].id, id: element, jd: tb[(tb.length - index)].id, cd: tb[tb.length - index].jd, method: 'X' }
                        cl.push(tp);
                        ok.push(tp);
                        nb1++;
                    }
                });
            }
            nb2 = 0;
        }
    }
    //permutation
    for (let a = 0; a < ok.length; a++) {
        if (ok[a].method == 'X') {
            let l = ok[a].id;
            ok[a].id = ok[a].jd;
            ok[a].jd = l;
        }
    }

    let ob = null;
    for (let index = 0; index < ok.length; index++) {
        const element = ok[index];
        if (element.jd == j) {
            ob = element;
        }
    }

    this.boucle(ob, ok)
    this.matP[(i + 1)][(j + 1)] = '+';

    if (this.firstTimeInMarquage) {
      this.firstTimeInMarquage = false;
        this.matP[(i + 1)][(j + 1)] = '+';
    }
  }

  infoRowNegative = () => {
    const negInfo = [];
    for (let i = 0; i < this.matP.length; i++) {
      for (let j = 0; j < this.matP[i].length; j++) {
        if (this.matP[i][j] === '-') {
          const x = this.Vx[i];
          const m = parseInt(this.matrice[i][j], 10);
          const y = this.Vy[j];
          const sigma = x + m - y;
          if (sigma < 0) {
            negInfo.push([i,j]);
          }
        }
      }
    }
    return negInfo;
  }

  processMark = (click) => {
    let data = new Array();
    const negInfo = this.infoRowNegative();
    const len = negInfo.length;
    if (len == 0) {
      this.finishedSteppingStone = true;
    } else if (click < len) {
        this.nettoieTable();
        data = negInfo[click];
        this.marqueTab(parseInt(data[0]), parseInt(data[1]));
        //this.calculGain(click);
    } else if (len == click) {
        // nettoieTable();
        // data = negInfo[this.getMaxGain()];
        // MarqueTab(parseInt(data[0]), parseInt(data[1]));
        // actualiserTable();
    } else if ((len + 1) == click) {
        // initialiser();
        // ColTemp2();
        // calculZ(matrice);
        // maxMatP();
        // dinamCercle();
        // afficheStep();
    } else {
        click = -1;
    }
    click++;
  }

}