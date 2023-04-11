import figlet from 'figlet'
import { checkGridSize, checkNumberOfRobots, checkStartingPositionsAndCommands } from './utils';
import { Robot } from './service';



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


    // main();
