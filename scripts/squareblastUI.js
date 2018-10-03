var SquareBlastUI = function () {
    var self = this;
    self.game = undefined;
    self.running = false;
    self.initialize = function () {
        self.game = new SquareBlastGame()

        $('#GameStopped').show();
        $('#GameRunning').hide();

        document.addEventListener('keydown', function (event) {
            if (self.running) {
                if (event.keyCode == 68) { //right
                    self.game.player.movePlayerRight();
                }
                if (event.keyCode == 65) { //left
                    self.game.player.movePlayerLeft();
                }
                if (event.keyCode == 87) { //up
                    self.game.player.movePlayerUp();
                }
                if (event.keyCode == 83) { //down
                    self.game.player.movePlayerDown();
                }

            }
        })

        $('#StartBtn').on('click', function () {
            $('#GameStopped').hide();
            $('#GameRunning').show();
            self.running = true;
            self.onTick();
        });
        $('#StopBtn').on('click', function () {
            $('#GameStopped').show();
            $('#GameRunning').hide();
            self.running = false;
        });

    };

    this.onTick = function () {
        if (self.running == false) {
            return;
        }
        var result = self.game.onTick();
          $('#scorePanel').text('Score: ' + self.game.currentTick);
        if (result == 0) {
            setTimeout(function () { self.onTick(); }, 10);
            return;
        }
    }
    this.initialize();
}
