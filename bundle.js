(() => {
  // directions.js
  var Directions = class {
    constructor(head = null) {
      this.head = head;
    }
  };
  var Direction = class {
    constructor(value) {
      this.value = value;
      this.next = null;
      this.prev = null;
    }
  };
  var NORTH = new Direction("NORTH");
  var EAST = new Direction("EAST");
  var WEST = new Direction("WEST");
  var SOUTH = new Direction("SOUTH");
  NORTH.next = EAST;
  NORTH.prev = WEST;
  EAST.next = SOUTH;
  EAST.prev = NORTH;
  SOUTH.next = WEST;
  SOUTH.prev = EAST;
  WEST.next = NORTH;
  WEST.prev = SOUTH;

  // dom-helper.js
  var DOMHelper = class {
    constructor() {
    }
    message(msg) {
      document.getElementById("error").innerHTML = msg;
    }
    clearMessage() {
      document.getElementById("error").innerHTML = "";
    }
    handleEvents(cbFn) {
      document.getElementById("commandBtn").addEventListener("click", () => {
        this.clearMessage();
        cbFn.call(this, document.getElementById("command").value);
      });
    }
    clearInput() {
      document.getElementById("command").value = "";
    }
  };

  // pacman.js
  var Pacman = class {
    grid = new Array(5).fill(1).map((v) => new Array(5).fill(1));
    constructor(x, y, face) {
      this.x = x;
      this.y = y;
      this.face = face;
    }
    move() {
      if (this.face === NORTH && this.grid[this.x] && this.grid[this.x][this.y + 1]) {
        this.y++;
      }
      if (this.face === SOUTH && this.grid[this.x] && this.grid[this.x][this.y - 1]) {
        this.y--;
      }
      if (this.face === EAST && this.grid[this.x + 1] && this.grid[this.x + 1][this.y]) {
        this.x++;
      }
      if (this.face === WEST && this.grid[this.x - 1] && this.grid[this.x - 1][this.y]) {
        this.x--;
      }
    }
    left() {
      this.face = this.face.prev;
    }
    right() {
      this.face = this.face.next;
    }
  };

  // index.js
  var directions = new Directions(NORTH);
  var pacman = null;
  var dom = new DOMHelper();
  dom.handleEvents(handleCommand);
  function handleCommand(command) {
    if (!command.startsWith("PLACE") && !pacman) {
      return dom.message("PLACE the pacman first!");
    }
    if (command === "MOVE") {
      pacman.move();
      console.log(pacman);
    } else if (command === "LEFT") {
      pacman.left();
      console.log(pacman);
    } else if (command === "RIGHT") {
      pacman.right();
      console.log(pacman);
    } else if (command === "REPORT") {
      dom.message(`Pacman coordinates x: ${pacman.x}, y: ${pacman.y}, direction: ${pacman.face.value}`);
      pacman = null;
      dom.clearInput();
    } else if (command.startsWith("PLACE")) {
      let cmd = command.split(" ")[1];
      let [x, y, face] = cmd.split(",");
      try {
        x = parseInt(x, 10);
        y = parseInt(y, 10);
        let i = 0, direction, tmp = directions.head;
        while (tmp && i < 6) {
          if (tmp.value === face) {
            direction = tmp;
            break;
          }
          tmp = tmp.next;
          i++;
        }
        if (isNaN(x) || x > 4 || isNaN(y) || y > 4 || !direction) {
          return dom.message("Not a valid command!");
        }
        pacman = new Pacman(x, y, direction);
        console.log(pacman);
      } catch (err) {
        return dom.message("Not a valid command!");
      }
    }
  }
})();
