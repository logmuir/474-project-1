var SquareBlastGame = function () {
    var self = this;

    self.enemySquares = [];

    this.initialize = function () {
        var htmlToInsert = "";
        for (var currentIndex = 0; currentIndex < 10; currentIndex++) {
            self.enemySquares.push(new enemySquare());
            htmlToInsert += "<div id='enemySquare" + currentIndex + "'></div>";
        }

        document.getElementById("randomSquaresTargetDiv").outerHTML = htmlToInsert;
        console.log(self.enemySquares);
    };

    this.update = function () {


        return 0;

    };

    this.initialize();

}

var enemySquare = function () {
    this.xPos = 0;
    this.yPos = 0;

    //direction

}