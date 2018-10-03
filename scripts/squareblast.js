var SquareBlastGame = function () {
    var self = this;
    self.player = undefined;
    self.enemySquares = [];

    self.currentTick = 0;

    ConfigClass.enemySquareMaxXPosition = ConfigClass.getBoardWidth();
    ConfigClass.enemySquareMaxYPosition = ConfigClass.getBoardHeight();

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
        });
    };

    this.checkCollisions = function () {
        collisionDetected = false;
        rect1 = self.player.playerDiv.getBoundingClientRect();
        self.enemySquares.forEach(enemySquare => {
            rect2 = enemySquare.associatedDiv.getBoundingClientRect();
            var overlap = !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
            if (overlap) {
                collisionDetected = true;
                console.log("overap")
            }
        });

        if (collisionDetected) {
            return 1;
        }
        else {
            return 0;
        }
    }

    this.onTick = function (activeKeys) {
        result = 0;
        if (activeKeys.has(68)) {
            self.player.movePlayerRight();
        }
        if (activeKeys.has(65)) {
            self.player.movePlayerLeft();
        }
        if (activeKeys.has(87)) {
            self.player.movePlayerUp();
        }
        if (activeKeys.has(83)) {
            self.player.movePlayerDown();
        }

        self.enemySquares.forEach(enemySquare => {
            enemySquare.onTick(self.currentTick);
        });

        self.updateView();
        result = self.checkCollisions();
        self.currentTick++;
        return result;

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
    self.xPosition = 550;
    self.yPosition = 200;
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
            self.yPosition -= self.moveDy;
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
    self.isActive = false;

    self.initializeAssociatedDiv = function () {
        self.associatedDiv = document.getElementById(self.squareID);
        self.associatedDiv.style.left = self.xPosition + 'px';
        self.associatedDiv.style.top = self.yPosition + 'px';
        self.associatedDiv.style.visibility = 'hidden';
    }

    self.setActive = function () {
        self.associatedDiv.style.visibility = 'visible';
        self.isActive = true;
    }

    self.setInactive = function () {
        self.isActive = false
        self.associatedDiv.style.visibility = 'hidden';
    }

    self.onTick = function (currentGameTick) {
        if (currentGameTick == self.releaseTick) {
            self.setActive();
        }

        if (self.isActive) {
            if (self.xPosition + self.xSpeed <= 0) {
                self.setInactive();
                self.xPosition = 0;
                self.xSpeed *= -1;
            } else if (self.xPosition + self.xSpeed >= ConfigClass.getBoardWidth()) {
                self.setInactive();
                self.xPosition = ConfigClass.getBoardWidth();
                self.xSpeed *= -1;
            }

            if (self.yPosition + self.ySpeed <= 0) {
                self.setInactive();
                self.yPosition = 0;
                self.ySpeed *= -1;
            } else if (self.yPosition + self.ySpeed >= ConfigClass.getBoardHeight()) {
                self.setInactive();
                self.yPositon = ConfigClass.getBoardHeight();
                self.ySpeed *= -1;
            }
            self.xPosition += self.xSpeed;
            self.yPosition += self.ySpeed;
        }
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
