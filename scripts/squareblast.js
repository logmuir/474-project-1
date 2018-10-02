var SquareBlastGame = function () {
    var self = this;
    self.player = undefined;
    self.enemySquares = [];

    ConfigClass.enemySquareMaxXPosition = self.gameWidth;
    ConfigClass.enemySquareMaxYPosition = self.gameHeight;
    ConfigClass.enemySquareMaxXSpeed = 3;
    ConfigClass.enemySquareMaxYSpeed = 3;
    ConfigClass.totalEnemySquaresToGenerate = 10


    this.initialize = function () {
        self.player = new player(self.gameWidth, self.gameHeight);

        var htmlToInsert = "";
        for (var currentIndex = 0; currentIndex < ConfigClass.totalEnemySquaresToGenerate; currentIndex++) {
            var enemySquareToPush = new EnemySquare(currentIndex)
            self.enemySquares.push(enemySquareToPush);
            htmlToInsert += enemySquareToPush.htmlDivString;
        }
        document.getElementById("enemySquaresTargetDiv").outerHTML = htmlToInsert;
        self.enemySquares.forEach(enemySquare => {
            enemySquare.initializeAssociatedDiv();
        });


        self.enemySquares.forEach(enemySquare => {
            console.log(enemySquare);
        });
    };

    this.onTick = function () {

        self.enemySquares.forEach(enemySquare => {
            enemySquare.onTick();
        });

        self.updateView();
        return 0;

    }

    this.updateView = function () {
        self.player.updateSprite();
        self.enemySquares.forEach(enemySquare => {
            enemySquare.updateSprite();
        });
    };

    this.initialize();


}

var player = function (width, height) {
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
    
    self.movePlayerUp = function () {
        if (self.yPosition <= 4) {
            self.yPosition = 0;
        } else {
            self.yPosition -= self.moveDx;
        }
    }
    self.movePlayerLeft = function () {
        if (self.xPosition <= 4) {
            self.xPosition = 0;
        } else {
            self.xPosition -= self.moveDx;
        }
    }
    self.movePlayerRight = function () {
        if (self.xPosition >= getBoardWidth()) {
            self.xPosition = getBoardWidth();
        } else {
            self.xPosition += self.moveDx;
        }
    }
    self.movePlayerDown = function () {
        if (self.yPosition >= getBoardHeight()) {
            self.yPosition = getBoardHeight();
        } else {
            self.yPosition += self.moveDx;
        }
    }
}

var EnemySquare = function (squareIndex) {
    var self = this;
    self.xPosition = ConfigClass.getEnemySquareXPositionValue();
    self.yPosition = ConfigClass.getEnemySquareYPositionValue();
    self.xSpeed = ConfigClass.getEnemySquareXSpeedValue();
    self.ySpeed = ConfigClass.getEnemySquareYSpeedValue();
    self.squareID = "enemySquare" + squareIndex;
    self.htmlDivString = "<div id='" + self.squareID + "' class='enemySquare'></div>";
    self.associatedDiv = null;

    self.initializeAssociatedDiv = function () {
        self.associatedDiv = document.getElementById(self.squareID);
        self.associatedDiv.style.left = self.xPosition + 'px';
        self.associatedDiv.style.top = self.yPosition + 'px';
    }

    self.onTick = function () {
        self.xPosition += self.xSpeed;
        self.yPosition += self.ySpeed;
    }

    self.updateSprite = function () {
        self.associatedDiv.style.left = self.xPosition + 'px';
        self.associatedDiv.style.top = self.yPosition + 'px';
    }
}

class ConfigClass {
    static getEnemySquareXPositionValue() {
        return Math.floor(Math.random() * this.enemySquareMaxXPosition);
    }
    static getEnemySquareYPositionValue() {
        return Math.floor(Math.random() * this.enemySquareMaxYPosition);
    }
    static getEnemySquareXSpeedValue() {
        return Math.pow(-1, Math.floor(Math.random() * 2) + 1) * (Math.floor(Math.random() * this.enemySquareMaxXSpeed) + 1);
    }
    static getEnemySquareYSpeedValue() {
        return Math.pow(-1, Math.floor(Math.random() * 2) + 1) * (Math.floor(Math.random() * this.enemySquareMaxYSpeed) + 1);
    }
    static getBoardHeight(){	
	return document.getElementById('playBoard').offsetHeight; 
    }

    static getBoardWidth(){
	return document.getElementById('playBoard').offsetWidth - 4;
    }
}
