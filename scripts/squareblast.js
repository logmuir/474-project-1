var SquareBlastGame = function () {
    var self = this;
    self.player = undefined;
    self.enemySquares = [];

    this.initialize = function () {
        self.player = new Player();

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

var Player = function() {
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

    self.movePlayerUp = function() {
        self.yPosition -= self.moveDx;
    }
    self.movePlayerLeft = function() {
        self.xPosition -= self.moveDx;
    }
    self.movePlayerRight = function() {
        self.xPosition += self.moveDx;
    }
    self.movePlayerDown = function() {
        self.yPosition += self.moveDx;
    }
}


var EnemySquare =function () {
    this.xPos = 0;
    this.yPos = 0;

    //direction

}