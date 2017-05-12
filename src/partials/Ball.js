import { SVG_NS } from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;

    this.reset();
  }

  //Center ball in board initially
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    //generating a random number between -5 & 5, that's no 0
    this.vy = 0;

    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }


    //ends up being a number between -5 & 5 based on vy calc
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  paddleCollision(player1, player2) {
    // if moving right, player2..
    if (this.vx > 0) {
      let paddleR = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let [leftX, rightX, topY, bottomY] = paddleR;

      if (
        //if the right edge of the ball is >= left edge of paddle
        this.x + this.radius >= leftX
        //&& the right edge of the ball is <= right edge of paddle
        && this.x + this.radius <= rightX
        //&& the ball Y >= top edge of the paddle
        && this.y >= topY
        //&& the ball Y <= bottom edge of the paddle
        && this.y <= bottomY
      ) {
        this.vx = -this.vx;
      }
    } else { //check for collision on player1
      let paddleL = player1.coordinates(player1.x, player1.y, player1.width, player1.height)
      let [leftX, rightX, topY, bottomY] = paddleL;
      if (
        //if the left edge of the ball is <= right edge of paddle
        this.x - this.radius <= rightX
        //&& the right edge of the ball is <= right edge of paddle
        && this.x - this.radius >= leftX
        //&& the ball Y >= top edge of the paddle
        && this.y >= topY
        //&& the ball Y <= bottom edge of the paddle
        && this.y <= bottomY
        ){
        this.vx = -this.vx;

      }
    }
  }

  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2);

    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'fill', 'magenta');
    svg.appendChild(circle);
  }
}