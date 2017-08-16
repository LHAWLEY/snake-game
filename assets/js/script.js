$(document).ready(function() {
  var board = new BoardModel(20, 20, 4);
  var el = document.querySelector('.board');
  var view = new BoardView(el, board);
  view.render();

  $(document).on('keyup', function(event) {
    switch (event.keyCode) {
      case 37:
        board.changeDirection('left');
        break;
      case 38:
        board.changeDirection('up');
        break;
      case 39:
        board.changeDirection('right');
        break;
      case 40:
        board.changeDirection('down');
        break;
    }
    view.render();
  })

  setInterval(function() {
    board.moveSnake();
    view.render();
  }, 200);
});
