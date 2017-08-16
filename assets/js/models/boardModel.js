const EMPTY = 0,
      SNAKE = 1,
      APPLE = 2;

class BoardModel {
  constructor(height, width, length){
    this.snake = [];
    this.direction = 'left';
    this.width = width;
    this.height = height;
    this.placeSnake(length);
    this.placeApple();
  }

  getTiles() {
    var tiles = [];
    for(var i = 0; i < this.height * this.width; i++) {
      tiles.push(EMPTY);
    }
    for(var i = 0; i < this.snake.length; i++){
      var snakeIndex = this.snake[i];
      tiles[snakeIndex] = SNAKE;
    }
    tiles[this.apple] = APPLE;
    return tiles;
  }

  placeSnake(length) {
    var index = ((this.height * this.width) / 2) - this.width/2;
    for(var i = 0; i < length; i++){
      this.snake.push(index + i);
    }
  }

  placeApple(){
    var total = this.height * this.width;
    var apple = Math.floor(Math.random() * (total - 1));

    if (this.snake.includes(apple)) {
      apple = this.placeApple();
    } else {
      this.apple = apple;
    }
  }

  move(by) {
    var length  = this.snake.length,
        head    = this.snake[0],
        newHead = head + by;

    this.snake = [newHead, ...this.snake];

    if (newHead !== this.apple) {
      this.snake.pop();
    }

    return this.snake;
  }

  isSnake () {
    var [head, ...body] = this.snake;

    return body.includes(head);
  }

  moveSnake() {
    if (this.isEdge() || this.isSnake()) {
      alert('Game Over');
      location.reload();
    } else if(this.direction === 'left') {
      this.move(-1);
    } else if(this.direction === 'up') {
      this.move(-this.width);
    } else if(this.direction === 'right') {
      this.move(1);
    } else if(this.direction === 'down') {
      this.move(this.width);
    }
    if (this.snake[0] === this.apple) {
      this.placeApple();
    }
  }

  changeDirection(direction) {
    this.direction = direction;
  }

  isEdge() {
    return this.isOnLeftEdge() || this.isOnRightEdge() || this.isOnBottomEdge() || this.isOnTopEdge();
  }

  isOnLeftEdge() {
    return this.snake[0] % this.width === 0 && this.direction === 'left';
  }

  isOnRightEdge() {
    return this.snake[0] % this.width === (this.width - 1) && this.direction === 'right';
  }

  isOnBottomEdge() {
    return this.snake[0] >= (this.height * this.width) - this.width && this.direction === 'down';
  }

  isOnTopEdge() {
    return this.snake[0] < this.width && this.direction === 'up';
  }
}
