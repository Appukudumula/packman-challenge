import { NORTH, Directions } from './directions';
import { DOMHelper } from './dom-helper';
import { Pacman } from './pacman';

const directions = new Directions(NORTH);

let pacman = null;
let dom = new DOMHelper();
dom.handleEvents(handleCommand);

function handleCommand(command) {
    if (!command.startsWith('PLACE') && !pacman) {
        return dom.message('PLACE the pacman first!');
    }
    if (command === 'MOVE') {
        pacman.move();
        console.log(pacman);
    } else if (command === 'LEFT') {
        pacman.left();
        console.log(pacman);
    } else if (command === 'RIGHT') {
        pacman.right();
        console.log(pacman);
    } else if (command === 'REPORT') {
        dom.message(`Pacman coordinates x: ${pacman.x}, y: ${pacman.y}, direction: ${pacman.face.value}`);
        pacman = null;
        dom.clearInput();
    } else if (command.startsWith('PLACE')) {
        let cmd = command.split(' ')[1];
        let [x, y, face] = cmd.split(',');
        try {
            x = parseInt(x, 10);
            y = parseInt(y, 10);
            let i = 0, direction, tmp = directions.head;
            while(tmp && i < 6) {
                if (tmp.value === face) {
                    direction = tmp;
                    break;
                }
                tmp = tmp.next;
                i++;
            }
            if (isNaN(x) || x > 4 || isNaN(y) || y > 4 || !direction) {
                return dom.message('Not a valid command!');
            }
            pacman = new Pacman(x, y, direction);
            console.log(pacman);
        } catch(err) {
            return dom.message('Not a valid command!');
        }
        

    }
    
}