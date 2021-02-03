import { NORTH, EAST, SOUTH, WEST } from './directions';

export class Pacman {
    grid = new Array(5).fill(1).map(v => new Array(5).fill(1));
    constructor(x, y, face) {
        this.x = x;
        this.y = y;
        this.face = face;
    }
    move() {
        if (this.face === NORTH && this.grid[this.x] && this.grid[this.x][this.y+1]) {
            this.y++;
        }
        if (this.face === SOUTH && this.grid[this.x] && this.grid[this.x][this.y-1]) {
            this.y--;
        }
        if (this.face === EAST && this.grid[this.x+1] && this.grid[this.x+1][this.y]) {
            this.x++;
        }
        if (this.face === WEST && this.grid[this.x-1] && this.grid[this.x-1][this.y]) {
            this.x--;
        }
    }
    left() {
        this.face = this.face.prev;
    }
    right() {
        this.face = this.face.next;
    }
}

