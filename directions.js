export class Directions {
    constructor(head = null) {
        this.head = head;
    }
}

export class Direction {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export const NORTH = new Direction('NORTH');
export const EAST =  new Direction('EAST');
export const WEST =  new Direction('WEST');
export const SOUTH =  new Direction('SOUTH');

NORTH.next = EAST;
NORTH.prev = WEST;
EAST.next = SOUTH;
EAST.prev = NORTH;
SOUTH.next = WEST;
SOUTH.prev = EAST;
WEST.next = NORTH;
WEST.prev = SOUTH;