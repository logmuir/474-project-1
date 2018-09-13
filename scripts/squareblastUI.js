var SquareBlastUI = function () {
    var self = this;
    this.game = undefined;
    this.running = false;
    this.initialize = function () {
        self.game = new SquareBlastGame()

        $('#GameStopped').show();
        $('#GameRunning').hide();

        $('body').keypress(function (event) {
            if (event.which == 97) // Presses 'A' key
            {

            }
            else if (event.which = 122) // Presses 'D' key
            {

            }
        });
        $('#StartBtn').on('click', function () {
            $('#GameStopped').hide();
            $('#GameRunning').show();
            $('#Status').text('Get Ready...');
            self.running = true;
        });
        $('#StopBtn').on('click', function () {
            $('#GameStopped').show();
            $('#GameRunning').hide();
            self.running = false;
            self.refreshView();
        });
    };
    this.refreshView = function () {

    };

    this.updateUI = function () {
        if (self.running == false) {
            return;
        }
        var result = self.game.update();
        self.refreshView();

        if (result == 0) {
            setTimeout(function () { self.updateUI(); }, 10);
            return;
        }
    }
    this.initialize();
}
