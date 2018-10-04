var SquareBlastGame = function () {
    var self = this;
    self.player = undefined;
    self.enemySquares = [];

    self.currentTick = 0;

    ConfigClass.playerMoveDx = 4;
    ConfigClass.playerMoveDy = 4;

    ConfigClass.enemySquareMaxXPosition = ConfigClass.getBoardWidth();
    ConfigClass.enemySquareMaxYPosition = ConfigClass.getBoardHeight();

    ConfigClass.enemySquareMaxXSpeed = 3;
    ConfigClass.enemySquareMaxYSpeed = 3;
    ConfigClass.totalEnemySquaresToGenerate = 100;
    ConfigClass.enemySquareReleaseInterval = 10;

    this.initialize = function () {
        self.player = new player();

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
    };


    this.checkWithinCircle = function (centerX, centerY, radius, pointX, pointY) {
        d = Math.sqrt(Math.pow(pointX - centerX, 2) + Math.pow(pointY - centerY, 2));
        return (d < radius);
    }

    this.checkCollisions = function () {
        collisionDetected = false;
        playerDivRectangle = self.player.playerDiv.getBoundingClientRect();
        playerDivCenterX = playerDivRectangle.top + (0.50 * playerDivRectangle.height)
        playerDivCenterY = playerDivRectangle.left + (0.50 * playerDivRectangle.width)

        self.enemySquares.forEach(enemySquare => {
            if (enemySquare.isActive) {
                enemySquareDivRectangle = enemySquare.associatedDiv.getBoundingClientRect();
                enemySquareDivCenterX = enemySquareDivRectangle.top + (0.50 * enemySquareDivRectangle.height)
                enemySquareDivCenterY = enemySquareDivRectangle.left + (0.50 * enemySquareDivRectangle.width)

                var overlap = self.checkWithinCircle(playerDivCenterX, playerDivCenterY, 35, enemySquareDivCenterX, enemySquareDivCenterY);
                if (overlap) {
                    console.log("Overlap");
                    console.log(enemySquare);
                    collisionDetected = true;
                }
            }
        });

        if (collisionDetected) {
            return "collisionDetected";
        }
        else {
            return "continueGame";
        }
    }

    this.onTick = function (activeKeys) {
        gameStatus = "continueGame";

        self.handleActiveKeys(activeKeys);

        self.enemySquares.forEach(enemySquare => {
            enemySquare.onTick(self.currentTick);
        });

        self.updateView();
        gameStatus = self.checkCollisions();
        self.currentTick++;
        
        winCondition = true;
        self.enemySquares.forEach(enemySquare => {
            if (enemySquare.isActive) {
                winCondition = false;
            }
        });

        if (winCondition) {
            gameStatus = "winConditionMet";
        }

        return gameStatus;
    }

    this.handleActiveKeys = function (activeKeys) {
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
    }

    this.updateView = function () {
        self.player.updateSprite();
        self.enemySquares.forEach(enemySquare => {
            enemySquare.updateSprite();
        });
    };

    this.initialize();
}

var player = function () {
    var self = this;
    self.xPosition = ConfigClass.getBoardWidth() / 2;
    self.yPosition = ConfigClass.getBoardHeight() / 2;
    self.moveDx = ConfigClass.playerMoveDx;
    self.moveDy = ConfigClass.playerMoveDy;
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
        if (self.xPosition + self.playerDiv.getBoundingClientRect().width >= ConfigClass.getBoardWidth()) {
            self.xPosition = ConfigClass.getBoardWidth() - self.playerDiv.getBoundingClientRect().width;
        } else {
            self.xPosition += self.moveDx;
        }
    }
    self.movePlayerDown = function () {
        if (self.yPosition + self.playerDiv.getBoundingClientRect().height >= ConfigClass.getBoardHeight()) {
            self.yPosition = ConfigClass.getBoardHeight() - self.playerDiv.getBoundingClientRect().height;
        } else {
            self.yPosition += self.moveDx;
        }
    }
}

var EnemySquare = function (squareIndex, releaseTick) {
    var self = this;
    initializePositionAndSpeed();
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

    function initializePositionAndSpeed() {
        this.startSide = Math.floor(Math.random() * 4);

        this.startPositionArrayToReturn = [];

        if (this.startSide == 0) { // Top
            self.xPosition = generateRandomXPositionValue();
            self.yPosition = 0;
            self.xSpeed = Math.pow(-1, Math.floor(Math.random() * 2) + 1) * generateRandomXSpeedValue();
            self.ySpeed = generateRandomYSpeedValue();
        }
        else if (this.startSide == 1) { // Right
            self.xPosition = ConfigClass.enemySquareMaxXPosition;
            self.yPosition = generateRandomYPositionValue();
            self.xSpeed = -1 * generateRandomXSpeedValue();
            self.ySpeed = Math.pow(-1, Math.floor(Math.random() * 2) + 1) * generateRandomYSpeedValue();
        }
        else if (this.startSide == 2) { // Bottom
            self.xPosition = generateRandomXPositionValue();
            self.yPosition = ConfigClass.enemySquareMaxYPosition;
            self.xSpeed = Math.pow(-1, Math.floor(Math.random() * 2) + 1) * generateRandomXSpeedValue();
            self.ySpeed = -1 * generateRandomYSpeedValue();
        }
        else if (this.startSide == 3) { // Left
            self.xPosition = 0;
            self.yPosition = generateRandomYPositionValue();
            self.xSpeed = generateRandomXSpeedValue();
            self.ySpeed = Math.pow(-1, Math.floor(Math.random() * 2) + 1) * generateRandomYSpeedValue();
        }

        return this.startPositionArrayToReturn;
    }

    function generateRandomXPositionValue() {
        return Math.floor(Math.random() * ConfigClass.enemySquareMaxXPosition);
    }
    function generateRandomYPositionValue() {
        return Math.floor(Math.random() * ConfigClass.enemySquareMaxYPosition);
    }
    function generateRandomXSpeedValue() {
        return (Math.floor(Math.random() * ConfigClass.enemySquareMaxXSpeed) + 1);
    }
    function generateRandomYSpeedValue() {
        return (Math.floor(Math.random() * ConfigClass.enemySquareMaxYSpeed) + 1);
    }

    function setActive() {
        self.associatedDiv.style.visibility = 'visible';
        self.isActive = true;
    }

    function setInactive() {
        self.isActive = false
        self.associatedDiv.style.visibility = 'hidden';
    }

    self.onTick = function (currentGameTick) {
        if (currentGameTick == self.releaseTick) {
            setActive();
        }

        if (self.isActive) {
            if (self.xPosition + self.xSpeed <= 0) {
                setInactive();
                self.xPosition = 0;
                self.xSpeed *= -1;
            } else if (self.xPosition + self.xSpeed >= ConfigClass.getBoardWidth()) {
                setInactive();
                self.xPosition = ConfigClass.getBoardWidth();
                self.xSpeed *= -1;
            }

            if (self.yPosition + self.ySpeed <= 0) {
                setInactive();
                self.yPosition = 0;
                self.ySpeed *= -1;
            } else if (self.yPosition + self.ySpeed >= ConfigClass.getBoardHeight()) {
                setInactive();
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
    static getBoardHeight() {
        return document.getElementById('playBoard').offsetHeight;
    }

    static getBoardWidth() {
        return document.getElementById('playBoard').offsetWidth - 4;
    }
}
