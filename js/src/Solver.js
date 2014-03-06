/*
Solver
Author: Arlefreak
*/

Solver = function (game, boardI, boardF) {
    this.game = game;
    this.open = [];
    this.close = [];
    this.moves = 0;
    this.boardI = boardI;
    this.boardF = boardF;
    this.open.push(Phaser.Utils.extend(true,{},boardI));
};

Solver.prototype.solve = function(){
    var count = 0;

    while(!this.open[this.open.length - 1].equals(this.boardF) && this.open.length > 0){
        //console.log('\n --- while --- \n');
        //console.log('Open length: ' + this.open.length);
        //console.log(this.open[0].arrNumbs);
        var boardC = this.open.pop();
        var i = 0;
        var position = 0;
        //console.log('Open: ' + this.open[this.open.length - 1].arrNumbs);

        this.close.push(Phaser.Utils.extend(true,{},boardC));
       /* console.log('*** CLOSE *** ' + this.close.length);
        for (var i = this.close.length - 1; i >= 0; i--) {
            console.log(this.close[i].arrNumbs);
        }*/

        for (i = boardC.arrNumbs.length - 1; i >= 0; i--) {
            if(boardC.arrNumbs[i] === 0){position = i;}
        }
        //console.log("Position : " + position);
        switch(position){
            case 0:
            this.swap(boardC,3,position);
            this.swap(boardC,4,position);
            break;
            case 1:
            this.swap(boardC,1,position);
            this.swap(boardC,3,position);
            this.swap(boardC,4,position);
            break;
            case 2:
            this.swap(boardC,1,position);
            this.swap(boardC,4,position);
            break;
            case 3:
            this.swap(boardC,2,position);
            this.swap(boardC,3,position);
            this.swap(boardC,4,position);
            break;
            case 4:
            this.swap(boardC,1,position);
            this.swap(boardC,2,position);
            this.swap(boardC,3,position);
            this.swap(boardC,4,position);
            break;
            case 5:
            this.swap(boardC,1,position);
            this.swap(boardC,2,position);
            this.swap(boardC,4,position);
            break;
            case 6:
            this.swap(boardC,2,position);
            this.swap(boardC,3,position);
            break;
            case 7:
            this.swap(boardC,1,position);
            this.swap(boardC,2,position);
            this.swap(boardC,3,position);
            break;
            case 8:
            this.swap(boardC,1,position);
            this.swap(boardC,2,position);
            break;
        }
        this.open.sort(this.compare);
       /* console.log('\n ***  OPEN *** ' + this.open.length);
        for (var i = this.open.length - 1; i >= 0; i--) {
            console.log(this.open[i].arrNumbs + ' - ' +  this.open[i].totalCost);
        }*/
        /*i = 0;
        for (i = this.open.length - 1; i > 0; i--) {
            this.close.push(this.open.pop());
        }*/

        if(this.open.length !== 0){
            this.boardI.arrNumbs = this.open[this.open.length - 1].arrNumbs;
            
            count++;
            console.log('solving - ' + 'count: ' + count + ' - board: ' + this.open[0].arrNumbs + ' - closed-size: ' + this.close.length + ' - position: ' + position);
        }

        /*console.log('*** CLOSE2 *** ' + this.close.length);
        for (var i = this.close.length - 1; i >= 0; i--) {
            console.log(this.close[i].arrNumbs);
        }*/


    }
    this.boardI.draw();
    console.log('Solved: ' + this.open[this.open.length - 1].arrNumbs);
};

Solver.prototype.swap = function(boardC,direction,position){
    this.position = position;
    var bTemp = Phaser.Utils.extend(true,{},boardC);
    var arrTemp = [];
    //console.log("Direccion: " + direction);
    switch(direction){
        case 1: // x <- 0
        bTemp.arrNumbs[this.position] =  bTemp.arrNumbs[this.position - 1];
        bTemp.arrNumbs[this.position - 1] = 0;
        break;
        case 2: // up
        switch (this.position){
            case 3:
            bTemp.arrNumbs[3] = bTemp.arrNumbs[0];
            bTemp.arrNumbs[0] = 0;
            break;
            case 4:
            bTemp.arrNumbs[4] = bTemp.arrNumbs[1];
            bTemp.arrNumbs[1] = 0;
            break;
            case 5:
            bTemp.arrNumbs[5] = bTemp.arrNumbs[2];
            bTemp.arrNumbs[2] = 0;
            break;
            case 6:
            bTemp.arrNumbs[6] = bTemp.arrNumbs[3];
            bTemp.arrNumbs[3] = 0;
            break;
            case 7:
            bTemp.arrNumbs[7] = bTemp.arrNumbs[4];
            bTemp.arrNumbs[4] = 0;
            break;
            case 8:
            bTemp.arrNumbs[8] = bTemp.arrNumbs[5];
            bTemp.arrNumbs[5] = 0;
            break;
        }
        break;
        case 3: // 0 -> x
        bTemp.arrNumbs[this.position] = bTemp.arrNumbs[this.position + 1];
        bTemp.arrNumbs[this.position + 1] = 0;
        break;
        case 4: // down
        switch (this.position){
            case 0:
            bTemp.arrNumbs[0] = bTemp.arrNumbs[3];
            bTemp.arrNumbs[3] = 0;
            break;
            case 1:
            bTemp.arrNumbs[1] = bTemp.arrNumbs[4];
            bTemp.arrNumbs[4] = 0;
            break;
            case 2:
            bTemp.arrNumbs[2] = bTemp.arrNumbs[5];
            bTemp.arrNumbs[5] = 0;
            break;
            case 3:
            bTemp.arrNumbs[3] = bTemp.arrNumbs[6];
            bTemp.arrNumbs[6] = 0;
            break;
            case 4:
            bTemp.arrNumbs[4] = bTemp.arrNumbs[7];
            bTemp.arrNumbs[7] = 0;
            break;
            case 5:
            bTemp.arrNumbs[5] = bTemp.arrNumbs[8];
            bTemp.arrNumbs[8] = 0;
            break;
        }
        break;
    }
    //console.log("Swap : " + bTemp.arrNumbs);
    arrTemp = bTemp.arrNumbs;
    bTemp= new Board(this.game,arrTemp,boardC);
    bTemp.moves = boardC.moves + 1;
    bTemp.calcHueristic();
    bTemp.calcTotalCost();
    if(!this.checkClosed(bTemp)){
        this.open.push(bTemp);
    }
     //console.log("Total Cost: " + bTemp.totalCost + " hueristic: " + bTemp.h);
 };

 Solver.prototype.checkClosed = function(board){

    var i = 0;
    for (i = this.close.length - 1; i >= 0; i--) {
        if (this.close[i].equals(board)){
            return true;
        }
    }
    return false;
};

Solver.prototype.compare = function(a,b) {
    if (a.totalCost > b.totalCost){
        return -1;
    }
    if (a.totalCost < b.totalCost){
        return 1;
    }
    return 0;
};