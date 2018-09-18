var SquareBlastGame = function () {
    var self = this;

    this.initialize = function () {
        var htmlToInsert = "";
        for (var currentIndex = 0; currentIndex < 10; currentIndex++) {
            htmlToInsert += "<div id='enemySquare" + currentIndex + "'></div>";
        }

        document.getElementById("randomSquaresTargetDiv").outerHTML = htmlToInsert;
    };

    this.update = function () {


        return 0;

    };

    this.initialize();

}
