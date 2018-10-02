var SquareBlastGame = function () {
    var self = this;
    self.player = undefined;
    self.enemySquares = [];
    self.gameHeight = document.getElementById('playBoard').offsetHeight -4; 
    self.gameWidth = document.getElementById('playBoard').offsetWidth -4; 
 

    this.initialize = function () {
<<<<<<< HEAD
        self.player = new Player();
=======
        self.player = new player(self.gameWidth, self.gameHeight);
>>>>>>> 73c3f31a6c0de0c5bd988666566d6a73527aa537

        var htmlToInsert = "";
        for (var currentIndex = 0; currentIndex < 10; currentIndex++) {
            self.enemySquares.push(new EnemySquare());
            htmlToInsert += "<div id='enemySquare" + currentIndex + "'></div>";
        }

        document.getElementById("randomSquaresTargetDiv").outerHTML = htmlToInsert;
    };

    this.onTick = function () {

        self.enemySquares.forEach(enemySquare => {
            console.log(enemySquare);
        });

        self.updateView();
        return 0;

    }

    this.updateView = function () {
        self.player.updateSprite();
    };

    this.initialize();
    

}

<<<<<<< HEAD
var Player = function() {
=======
var player = function(width, height) {
>>>>>>> 73c3f31a6c0de0c5bd988666566d6a73527aa537
    var self = this;
    self.xPosition = 0;
    self.yPosition = 0;
    self.moveDx = 4;
    self.moveDy = 4;
    self.width = width;
    self.height = height; 
    self.playerDiv = document.getElementById('player');

    self.updateSprite = function () {
        self.playerDiv.style.left = self.xPosition + 'px';
        self.playerDiv.style.top = self.yPosition + 'px';
    }

    self.movePlayerUp = function() {
	if(self.yPosition <=4){
	    self.yPosition = 0; 
	}else{
            self.yPosition -= self.moveDx;
	}
    }
    self.movePlayerLeft = function() {
	if(self.xPosition <=4){
	    self.xPosition = 0; 
	}else{
            self.xPosition -= self.moveDx;
	}
    }
    self.movePlayerRight = function() {
	if(self.xPosition >= width){
	    self.xPosition = width; 
	}else{
            self.xPosition += self.moveDx;
	}
    }
    self.movePlayerDown = function() {
	if(self.yPosition >= height){
	    self.yPosition = height; 
	}else{
            self.yPosition += self.moveDx;
	}
    }
}


var EnemySquare =function () {
    this.xPos = 0;
    this.yPos = 0;

    //direction

}
