var SquareBlastGame = function () {
    var self = this;
    self.player = undefined;
    self.enemySquares = [];

    self.currentTick = 0;

    ConfigClass.enemySquareMaxXPosition = ConfigClass.getBoardHeight();
    ConfigClass.enemySquareMaxYPosition = ConfigClass.getBoardWidth();
    ConfigClass.enemySquareMaxXSpeed = 3;
    ConfigClass.enemySquareMaxYSpeed = 3;
    ConfigClass.totalEnemySquaresToGenerate = 100;
    ConfigClass.enemySquareReleaseInterval = 10;


    this.initialize = function () {
        self.player = new player(self.gameWidth, self.gameHeight);

        var htmlToInsert = "";
        for (var currentIndex = 0; currentIndex < ConfigClass.totalEnemySquaresToGenerate; currentIndex++) {
            var enemySquareToPush = new EnemySquare(currentIndex, ConfigClass.enemySquareReleaseInterval * currentIndex);
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
            enemySquare.onTick(self.currentTick);
        });

        self.updateView();
        self.currentTick++;
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
        if (self.xPosition >= ConfigClass.getBoardWidth()) {
            self.xPosition = ConfigClass.getBoardWidth();
        } else {
            self.xPosition += self.moveDx;
        }
    }
    self.movePlayerDown = function () {
        if (self.yPosition >= ConfigClass.getBoardHeight()) {
            self.yPosition = ConfigClass.getBoardHeight();
        } else {
            self.yPosition += self.moveDx;
        }
    }
}

var EnemySquare = function (squareIndex, releaseTick) {
    var self = this;
    startPositionAndSpeedTuple = ConfigClass.getEnemySquareStartPositionsAndSpeeds();
    self.xPosition = startPositionAndSpeedTuple[0];
    self.yPosition = startPositionAndSpeedTuple[1];
    self.xSpeed = startPositionAndSpeedTuple[2];
    self.ySpeed = startPositionAndSpeedTuple[3];
    self.squareID = "enemySquare" + squareIndex;
    self.htmlDivString = "<div id='" + self.squareID + "' class='enemySquare'></div>";
    self.associatedDiv = null;
    self.releaseTick = releaseTick;

    self.initializeAssociatedDiv = function () {
        self.associatedDiv = document.getElementById(self.squareID);
        self.associatedDiv.style.left = self.xPosition + 'px';
        self.associatedDiv.style.top = self.yPosition + 'px';
        self.associatedDiv.style.visibility = 'hidden';
    }

    self.onTick = function (currentGameTick) {

        if (currentGameTick == self.releaseTick) {
            self.associatedDiv.style.visibility = 'visible';
        }

        self.xPosition += self.xSpeed;
        self.yPosition += self.ySpeed;
    }

    self.updateSprite = function () {
        self.associatedDiv.style.left = self.xPosition + 'px';
        self.associatedDiv.style.top = self.yPosition + 'px';
    }
}

class ConfigClass {

    static getEnemySquareStartPositionsAndSpeeds() {
        this.startSide = Math.floor(Math.random() * 4);

        this.startPositionArrayToReturn = [];

        if (this.startSide == 0) { // Top
            this.startPositionArrayToReturn.push(this.getEnemySquareXPositionValue());
            this.startPositionArrayToReturn.push(0);
            this.startPositionArrayToReturn.push(Math.pow(-1, Math.floor(Math.random() * 2) + 1) * ConfigClass.getEnemySquareXSpeedValue());
            this.startPositionArrayToReturn.push(ConfigClass.getEnemySquareYSpeedValue());
        }
        else if (this.startSide == 1) { // Right
            this.startPositionArrayToReturn.push(this.enemySquareMaxXPosition);
            this.startPositionArrayToReturn.push(this.getEnemySquareYPositionValue());
            this.startPositionArrayToReturn.push(-1 * ConfigClass.getEnemySquareXSpeedValue());
            this.startPositionArrayToReturn.push(Math.pow(-1, Math.floor(Math.random() * 2) + 1) * ConfigClass.getEnemySquareYSpeedValue());
        }
        else if (this.startSide == 2) { // Bottom
            this.startPositionArrayToReturn.push(this.getEnemySquareXPositionValue());
            this.startPositionArrayToReturn.push(this.enemySquareMaxYPosition);
            this.startPositionArrayToReturn.push(Math.pow(-1, Math.floor(Math.random() * 2) + 1) * ConfigClass.getEnemySquareXSpeedValue());
            this.startPositionArrayToReturn.push(-1 * ConfigClass.getEnemySquareYSpeedValue());
        }
        else if (this.startSide == 3) { // Left
            this.startPositionArrayToReturn.push(0);
            this.startPositionArrayToReturn.push(this.getEnemySquareYPositionValue());
            this.startPositionArrayToReturn.push(ConfigClass.getEnemySquareXSpeedValue());
            this.startPositionArrayToReturn.push(Math.pow(-1, Math.floor(Math.random() * 2) + 1) * ConfigClass.getEnemySquareYSpeedValue());
        }

        return this.startPositionArrayToReturn;
    }

    static getEnemySquareXPositionValue() {
        return Math.floor(Math.random() * this.enemySquareMaxXPosition);
    }
    static getEnemySquareYPositionValue() {
        return Math.floor(Math.random() * this.enemySquareMaxYPosition);
    }
    static getEnemySquareXSpeedValue() {
        return (Math.floor(Math.random() * this.enemySquareMaxXSpeed) + 1);
    }
    static getEnemySquareYSpeedValue() {
        return (Math.floor(Math.random() * this.enemySquareMaxYSpeed) + 1);
    }
    static getBoardHeight() {
        return document.getElementById('playBoard').offsetHeight;
    }

    static getBoardWidth() {
        return document.getElementById('playBoard').offsetWidth - 4;
    }
}
