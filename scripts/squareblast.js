var SquareBlastGame = function () {
    var self = this;
    self.player = undefined;
    self.enemySquares = [];

    this.initialize = function () {
        self.player = new Player();

        var htmlToInsert = "";
        for (var currentIndex = 0; currentIndex < 10; currentIndex++) {
            var enemySquareToPush = new EnemySquare(currentIndex)
            self.enemySquares.push(enemySquareToPush);
            htmlToInsert += enemySquareToPush.htmlDivString;
        }
        document.getElementById("enemySquaresTargetDiv").outerHTML = htmlToInsert;
        self.enemySquares.forEach(enemySquare => {
            enemySquare.updateAssociatedDiv();
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
    };

    this.initialize();

}

var Player = function () {
    var self = this;
    self.xPosition = 0;
    self.yPosition = 0;
    self.moveDx = 4;
    self.moveDy = 4;
    self.playerDiv = document.getElementById('player');

    self.updateSprite = function () {
        self.playerDiv.style.left = self.xPosition + 'px';
        self.playerDiv.style.top = self.yPosition + 'px';
    }

    self.movePlayerUp = function () {
        self.yPosition -= self.moveDx;
    }
    self.movePlayerLeft = function () {
        self.xPosition -= self.moveDx;
    }
    self.movePlayerRight = function () {
        self.xPosition += self.moveDx;
    }
    self.movePlayerDown = function () {
        self.yPosition += self.moveDx;
    }
}


var EnemySquare = function (squareIndex) {
    var self = this;
    self.xPosition = 0;
    self.yPos = 0;
    self.xSpeed = Math.floor(Math.random() * 10);
    self.ySpeed = Math.floor(Math.random() * 10);
    self.squareID = "enemySquare" + squareIndex;
    self.htmlDivString = "<div id='" + self.squareID + "'></div>";
    self.associatedDiv = null;

    self.updateAssociatedDiv = function () {
        self.associatedDiv = document.getElementById(self.squareID);
    }

    self.onTick = function () {
        self.xPosition += self.xSpeed
        self.yPos += self.ySpeed
    }

    self.updateSprite = function () {
        self.associatedDiv.style.left = self.xPosition + 'px';
        self.associatedDiv.style.top = self.yPosition + 'px';
    }
}