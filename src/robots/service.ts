import { Orientation } from "./types";

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
            this.y = this.y > this.maxGridY ? this.maxGridY : this.y + 1;
        } else if (this.orientation === 'E') {
            this.x = this.x > this.maxGridX ? this.maxGridX : this.x + 1;
        } else if (this.orientation === 'S') {
            this.y = this.y < 0 ? 0 : this.y - 1;
        } else if (this.orientation === 'W') {
            this.x = this.x < 0 ? 0 : this.x - 1;
        }
    }

    private _checkIfCollision() {
        // it has collided once the robot is out of bounds
        if (this.x > this.maxGridX || this.x < 0 || this.y > this.maxGridY || this.y < 0) {
            this._setCollisionPosition();
            return true;
        }
    }
    /**
     * Sets the robot's collision position based on the current value or X and Y
     */
    private _setCollisionPosition() {
            this.x = this.x < 0 ? 0 : this.x;
            this.x = this.x > this.maxGridX ? this.maxGridX : this.x;
            this.y = this.y < 0 ? 0 : this.y;
            this.y = this.y > this.maxGridY ? this.maxGridY : this.y;       
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