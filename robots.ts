import Prompt from 'prompt-sync';
import figlet from 'figlet'
const prompt = Prompt({ sigint: true });

export type Orientation = 'N' | 'E' | 'S' | 'W';
export class Robot {
    lost: boolean;
    constructor(
        public x: number,
        public y: number,
        public orientation: Orientation,
        public maxGridX: number,
        public maxGridY: number,
    ) {
        this.lost = false
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }
    /**
     * 
     * @param commandList A list of commands to be executed by the robot ["F", "R", "L"]
     */
    public moveRobot(commandList: string[]) {
        // loop over the commands
        for (let i = 0; i < commandList.length; i++) {
            const command = commandList[i];
            if (command === 'F') {
                this._moveForward();
            } else if (command === 'R') {
                this._turnRight();
            } else if (command === 'L') {
                this._turnLeft();
            }
            if (this._checkIfCollision()) {
                this.lost = true;
                break;
            }
        }
    }
    /**
     * Prints the final position of the robot
     */
    public printFinalPosition() {
        console.log(`(${this.x}, ${this.y}, ${this.orientation})${this.lost ? ' LOST' : ''}`);
    }
    /**
     * Moves the robot forward one space
     */
    private _moveForward() {

        if (this.orientation === 'N') {
            this.y++;
        } else if (this.orientation === 'E') {
            this.x++;
        } else if (this.orientation === 'S') {
            this.y--;
        } else if (this.orientation === 'W') {
            this.x--;
        }
    }

    private _checkIfCollision() {
        // it has collided once the robot is out of bounds
        if (this.x > this.maxGridX || this.x < 0 || this.y > this.maxGridY || this.y < 0) {
            // reset the robot to its previous position so we can report at which point it went OOB!
            this.x = this.x < 0 ? 0 : this.x;
            this.x = this.x > this.maxGridX ? this.maxGridX : this.x;
            this.y = this.y < 0 ? 0 : this.y;
            this.y = this.y > this.maxGridY ? this.maxGridY : this.y;
            return true;
        }
    }
    /**
     * Turns the robot right
     */
    private _turnRight() {
        if (this.orientation === 'N') {
            this.orientation = 'E';
        } else if (this.orientation === 'E') {
            this.orientation = 'S';
        } else if (this.orientation === 'S') {
            this.orientation = 'W';
        } else if (this.orientation === 'W') {
            this.orientation = 'N';
        }
    }
    /**
     * Turns the robot left
     */
    private _turnLeft() {
        if (this.orientation === 'N') {
            this.orientation = 'W';
        } else if (this.orientation === 'E') {
            this.orientation = 'N';
        } else if (this.orientation === 'S') {
            this.orientation = 'E';
        } else if (this.orientation === 'W') {
            this.orientation = 'S';
        }
    }
}

const GRID_SIZE_TEXT = 'What size grid would you like? (ex: 5 x 5) ';
const NUMBER_OF_ROBOTS_TEXT = 'How many robots would you like to create? (ex: 2): ';
const createRobotPositionText = (index: number) => `What is the starting position of robot ${index + 1}? ex: (2, 3, E) LFRFF: `;

export const checkGridSize = () => {
    let gridSize = prompt(GRID_SIZE_TEXT);

    while (!gridSize) {
        console.log('Please enter a valid grid size');
        gridSize = prompt(GRID_SIZE_TEXT);
    }
    const gridRegex = /^\d+\s*x\s*\d+$/;
    // we need the grid size to be a valid string of "X x Y"
    // so we need to check that the string is valid
    while (!gridRegex.test(gridSize)) {
        console.log('Please enter a valid grid size');
        gridSize = prompt(GRID_SIZE_TEXT);
    }

    const x = parseInt(gridSize.split('x')[0].trim());
    const y = parseInt(gridSize.split('x')[1].trim());

    // we need to check that the grid size is valid
    while (isNaN(x) || isNaN(y)) {
        console.log('Please enter a valid grid size');
        gridSize = prompt(GRID_SIZE_TEXT);
    }

    return {
        x,
        y
    };
}


export const checkNumberOfRobots = () => {
    let numberOfRobots = prompt(NUMBER_OF_ROBOTS_TEXT);

    while (!numberOfRobots) {
        console.log('Please enter a number for the number of robots');
        numberOfRobots = prompt(NUMBER_OF_ROBOTS_TEXT);
    }
    // handle if we cant parse the number of robots
    while (isNaN(parseInt(numberOfRobots))) {
        console.log('Please enter a number for the number of robots');
        numberOfRobots = prompt(NUMBER_OF_ROBOTS_TEXT);
    }

    return numberOfRobots;
}


const checkStartingPositionsAndCommands = (i: number) => {
    let startingPositionAndCommands = prompt(createRobotPositionText(i));

        while (!startingPositionAndCommands) {
            console.log('Please enter a starting position and commands for the robot');
            startingPositionAndCommands = prompt(createRobotPositionText(i));
        }
        // we need to check that the starting position and commands are valid
        // const startingPositionAndCommandsRegex = /^\(\d+\s*,\s*\d+\s*,\s*[NESW]\)\s*[LRF]+$/g;
        const pattern = /\(-?\d+, -?\d+, [NESW]\) [FRL]+/;
        while (!pattern.test(startingPositionAndCommands)) {
            console.log('Please enter a valid starting position and commands for the robot');
            startingPositionAndCommands = prompt(createRobotPositionText(i));
        }
        // we need to parse the starting position and commands
        let startingPositions = getStartingPositions(startingPositionAndCommands);

        let commands = getCommands(startingPositionAndCommands);
        // we need to check that the starting position and commands are valid
        while (
            (startingPositions.x < 0) ||
            (startingPositions.y < 0) ||
            !startingPositions.orientation ||
            commands.length === 0
        ) {
            console.log('Please enter a valid starting position and commands for the robot');
            startingPositions = getStartingPositions(startingPositionAndCommands);
            commands = getCommands(startingPositionAndCommands);
            startingPositionAndCommands = prompt(createRobotPositionText(i));

        }

    return {
        startingPositions,
        commands
    }
}

export const main = () => {
    // create ASCII art
    console.log(figlet.textSync('Robot Simulator', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }));

    // type exit to exit the program
    console.log('At any time to exit the program use CTRL + C / CMD + C');
    // first we prompt the user for a size of the grid
    let { x, y } = checkGridSize()
    // ask for number of robots
    let numberOfRobots = checkNumberOfRobots();

    // for each robot we need to ask for the starting position and a list of commands
    for (let i = 0; i < parseInt(numberOfRobots); i++) {
        // ask for the starting position
        const {
            startingPositions,
            commands
        } = checkStartingPositionsAndCommands(i);
        // create the robot
        const robot = new Robot(startingPositions.x, startingPositions.y, startingPositions.orientation, x, y);
        // move the robot
        robot.moveRobot(commands);
        // output the final position of the robot
        robot.printFinalPosition();
    }
}

const getStartingPositions = (startingPositionAndCommands: string) => {
    const positions = startingPositionAndCommands.trim().split(')')[0].replace('(', '').split(',');
    if (positions.length !== 3) {
        return {
            x: -1,
            y: -1,
            orientation: null
        }
    }

    return {
        x: parseInt(positions[0]),
        y: parseInt(positions[1]),
        orientation: positions[2].trim() as Orientation
    }

}

const getCommands = (startingPositionAndCommands: string) => {
    const commands = startingPositionAndCommands.split(')')[1].trim().split('');
    if (commands.length === 0) {
        return [];
    }
    return commands;
}



main();

