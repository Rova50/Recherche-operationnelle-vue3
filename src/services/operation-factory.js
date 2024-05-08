import Minili from '@/services/operation-minili.js';
import Minico from '@/services/operation-minico.js';
import MaxDiff from '@/services/operation-diffmax.js';

export class OperationFactory {
    constructor(mat, tabLign, tabCol,type){
        this.type = type;
        this.mat = mat || [];
        this.tabLign = tabLign || [];
        this.tabCol = tabCol || [];
    }

    getOperation()
    {
        if(this.type=='minili'){
            return new Minili(this.mat,this.tabLign,this.tabCol);
        }
        if(this.type=="minico"){
            return new Minico(this.mat,this.tabLign,this.tabCol);
        }
        if(this.type=="maxdiff"){
            return new MaxDiff(this.mat,this.tabLign,this.tabCol);
        }

        throw new Error('operation not found');
    }
}