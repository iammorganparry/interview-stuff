import { checkGridSize, checkNumberOfRobots, checkStartingPositionsAndCommands, createHeading } from './utils';
import { Robot } from './service';
/**
 * @name main
 * This is the main function of the application
 */
export const main = () => {
    // create ASCII art
    createHeading()

    // first we prompt the user for a size of the grid
    const { x, y } = checkGridSize()
        
    // ask for number of robots
    const numberOfRobots = checkNumberOfRobots();

    // for each robot we need to ask for the starting position and a list of commands
    for (let i = 0; i < numberOfRobots; i++) {
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


    // main();
