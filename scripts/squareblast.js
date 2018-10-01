var SquareBlastGame = function () {
    var self = this;
    self.player = undefined;
    self.enemySquares = [];
    self.gameHeight = document.getElementById('playBoard').offsetHeight; 
    self.gameWidth = document.getElementById('playBoard').offsetWidth -4; 
 

    this.initialize = function () {
        self.player = new player(self.gameWidth, self.gameHeight);

        var htmlToInsert = "";
        for (var currentIndex = 0; currentIndex < 10; currentIndex++) {
            self.enemySquares.push(new enemySquare());
            htmlToInsert += "<div id='enemySquare" + currentIndex + "'></div>";
        }

        document.getElementById("randomSquaresTargetDiv").outerHTML = htmlToInsert;
    };

    this.updateView = function () {

        self.player.updateSprite();
        return 0;
    };

    this.initialize();
    

}

var player = function(width, height) {
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


var enemySquare =function () {
    this.xPos = 0;
    this.yPos = 0;

    //direction

}
