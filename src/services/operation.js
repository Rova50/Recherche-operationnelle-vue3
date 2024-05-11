import { cloneArray } from '@/utils/clone-array';
import { calculZ } from '@/utils/array-sum-calcul-z';

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
    this.matPCopied = [];

    this.matDiff = cloneArray(mat) || [];
    this.finishedBase = false;
    this.finishedSteppingStone = false;
    this.Z = 0;
    // stepping stone
    this.Vx = [];
    this.Vy = [];
    this.firstTimeInMarquage = true;
    //color
    this.toColor=[];
    //won
    this.gains=[];
    this.minus = 0;

    // initialisation
    this.initArrays();
  }

  initArrays() {
    this.initMatP();
    this.initColTemp();
    this.initToColor();
  }

  initMatP() {
    this.matP = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => '')
    );
  }

  initColTemp() {
    this.colTemp = Array.from({ length: this.rows }, () => []);
  }

  initToColor() {
    this.toColor = Array.from({ length: this.rows }, () => []);
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
    let finished=false;  
    if (row != null)
          for (let index = 0; index < row.length; index++) {
              this.traitX(row[index]).forEach((element) => {
                  if (element == col && nb != 0)
                      finished= true;
              })
          }
      return finished;
  }

  fillToColor = (row, col) => {
    if(typeof this.toColor[row] === 'undefined'){
      this.toColor[row]=[];
    }
    this.toColor[row].push(col);
  }

  boucle = (obj, ok) => {
    if (obj.parent == null) return;
    else {
        let prefixe = '+';
        if (obj.method == 'X') {
            prefixe = '-'
        }
        this.matP[obj.id][obj.jd] = prefixe + this.matP[(obj.id)][(obj.jd)];
        this.fillToColor(obj.id,obj.jd);
        this.boucle(this.getCell(obj.parent, obj.cd, ok), ok)
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
    this.initToColor();

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
    this.matP[i][j] = '+';
    this.fillToColor(i,j);
    

    // if (this.firstTimeInMarquage) {
    //   this.firstTimeInMarquage = false;
    //     this.matP[(i)][(j)] = '+';
    // }
  }

  infoRowNegative = () => {
    const negInfo = [];
    for (let i = 0; i < this.matPCopied.length; i++) {
      for (let j = 0; j < this.matPCopied[i].length; j++) {
        if (this.matPCopied[i][j] === '-') {
          const x = this.Vx[i];
          const m = parseInt(this.matrice[i][j], 10);
          const y = this.Vy[j];
          const sigma = x + m - y;
          if (sigma < 0) {
            negInfo.push([i,j,sigma]);
          }
        }
      }
    }
    this.gains = this.gains.length!==negInfo.length 
                  ? Array.from({ length: negInfo.length}, () => [])
                  :this.gains;
    return negInfo;
  }

  processMark = (click_count) => {
    const click = click_count - this.minus;
    let data = new Array();
    const negInfo = this.infoRowNegative();
    const len = negInfo.length;

    if(len===0){
      this.finishedSteppingStone = true;
      return;
    }

    for (let index = 0; index <= click; index++) {
      if(index<len){
        this.matP = cloneArray(this.matPCopied);
        this.nettoieTable();
        data = negInfo[index];
        this.marqueTab(parseInt(data[0]), parseInt(data[1]));
        this.calculGain(index);
      }
    }

    if (len <= click) {
      this.matP = cloneArray(this.matPCopied);
      this.nettoieTable();
      data = negInfo[this.getMaxGain()];
      this.marqueTab(parseInt(data[0]), parseInt(data[1]));
      this.actualiserTable();
      this.initToColor();
      this.Z = calculZ(this.matrice,this.matP,this.colTemp);
      this.maxMatP();
      this.minus += click+1;
      this.gains = [];
    }
  }

  getNegatif = () => {
    const rep = [];
    this.matP.forEach((row)=> row.forEach(
      (col)=>{
      col.toString().includes('-')?rep.push(parseInt(col.toString().substr(1))):'';
    }))
    let min = Number.MAX_VALUE;
    for (let index = 0; index < rep.length; index++) {
        if (rep[index] < min) {
            min = rep[index];
        }
    }
    return min;
  }

  calculGain = (i) => {
    const neg = this.getNegatif();
    const negInfo = this.infoRowNegative();
    const  gain = [neg,negInfo[i][2]];
    this.gains[i] = gain;
  }

  getMaxGain = () => {
    const gainList = this.gains.map((gain)=> {
      return (-1*gain[0])*gain[1];
    });
    let max = 0;
    let i = 0;
    for (let index = 0; index < gainList.length; index++) {
        const element = gainList[index];
        if (max < element) {
            max = element;
            i = index;
        }
    }
    return i;
  }

  actualiserTable = () => {
    let neg = this.getNegatif();
    for (let index = 0; index < this.matP.length; index++) {
      for (let i = 0; i < this.matP[index].length; i++) {
        if (this.matP[index][i].toString().indexOf("-") != -1) {
            this.matP[index][i] = 
            ((parseInt(this.matP[index][i].toString().substr(1)) - neg) == 0) 
            ? '' 
            : (parseInt(this.matP[index][i].toString().substr(1)) - neg);

        } 
        else if (this.matP[index][i] == '+') 
        {
          this.matP[index][i] = neg;
        } else if (this.matP[index][i].toString().indexOf("+") != -1) 
        {
          this.matP[index][i] = parseInt(this.matP[index][i].toString().substr(1)) + neg;
        }
      }
    }

    this.matP = this.matP.map(row => row.map((column)=>{
      return (column==='')?'-':column;
    }));

    this.matPCopied = cloneArray(this.matP);
    this.matPtoColTemp();
  }

  matPtoColTemp = () => {
    this.initColTemp();
    this.matP.forEach(
      (row,row_index) => row.forEach(
        (column,col_index)=>{
          if (column!=='-') {
            this.colTemp[row_index].push(col_index);
          }
        }
      )
    )
  }

}