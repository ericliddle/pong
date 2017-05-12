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

    while(this.vy === 0) {
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
 
    if(hitLeft || hitRight){
    this.vx = -this.vx;
    } else if (hitTop || hitBottom){
      this.vy = -this.vy;
    }
  }


  render(svg) {

    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();

    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'fill', 'magenta');
    svg.appendChild(circle);
  }
}