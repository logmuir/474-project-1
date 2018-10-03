var SquareBlastUI = function () {
    var self = this;
    self.game = undefined;
    self.running = false;

    self.activeKeys = new Set([])

    self.initialize = function () {
        self.game = new SquareBlastGame()

        $('#GameStopped').show();
        $('#GameRunning').hide();

        document.addEventListener('keydown', function (event) {
            if (self.running) {
                if (event.keyCode == 68) { //right
                    self.activeKeys.add(68);
                }
                if (event.keyCode == 65) { //left
                    self.activeKeys.add(65);
                }
                if (event.keyCode == 87) { //up
                    self.activeKeys.add(87);
                }
                if (event.keyCode == 83) { //down
                    self.activeKeys.add(83);
                }
            }
        });

        document.addEventListener('keyup', function (event) {
            if (self.running) {
                if (event.keyCode == 68) { //right
                    self.activeKeys.delete(68);
                }
                if (event.keyCode == 65) { //left
                    self.activeKeys.delete(65);
                }
                if (event.keyCode == 87) { //up
                    self.activeKeys.delete(87);
                }
                if (event.keyCode == 83) { //down
                    self.activeKeys.delete(83);
                }
            }
        });

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
            location.reload();
        });

    };

    this.onTick = function () {
        if (self.running == false) {
            return;
        }
        var result = self.game.onTick(self.activeKeys);
        $('#scorePanel').text('Score: ' + self.game.currentTick);
        if (result == 0) {
            setTimeout(function () { self.onTick(); }, 10);
            return;
        }

        else {

        }
    }
    this.initialize();
}
