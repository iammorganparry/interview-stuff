import { Orientation } from "./types";
import { prompt } from './prompt';

export const getStartingPositions = (startingPositionAndCommands: string) => {
    const positions = startingPositionAndCommands.trim().split(')')[0].replace('(', '').split(',');
    if (positions.length !== 3) {
        return {
            x: -1,
            y: -1,
            orientation: 'N' as Orientation
        }
    }

    return {
        x: parseInt(positions[0]),
        y: parseInt(positions[1]),
        orientation: positions[2].trim() as Orientation
    }

}

export const getCommands = (startingPositionAndCommands: string) => {
    const commands = startingPositionAndCommands.split(')')[1].trim().split('');
    if (commands.length === 0) {
        return [];
    }
    return commands;
}


const GRID_SIZE_TEXT = 'What size grid would you like? (ex: 5 x 5) ';

type CheckGridSizeReturn = {
    x: number;
    y: number;
}

export const checkGridSize = (): CheckGridSizeReturn => {

    let gridSize = prompt(GRID_SIZE_TEXT);

    if (!gridSize) {
        console.log('Please enter a valid grid size');
        return checkGridSize();
    }
    const gridRegex = /^\d+\s*x\s*\d+$/;
    // we need the grid size to be a valid string of "X x Y"
    // so we need to check that the string is valid
    if(!gridRegex.test(gridSize)) {
        console.log('Please enter a valid grid size');
        return checkGridSize();
    }

    const x = parseInt(gridSize.split('x')[0].trim());
    const y = parseInt(gridSize.split('x')[1].trim());

    // we need to check that the grid size is valid
    if(isNaN(x) || isNaN(y)) {
        console.log('Please enter a valid grid size');
    }

    return {
        x,
        y
    };
}

type CheckStartingPositionsAndCommandsReturn = {
    startingPositions: ReturnType<typeof getStartingPositions>;
    commands: ReturnType<typeof getCommands>;
}

const createRobotPositionText = (index: number) => `What is the starting position of robot ${index + 1}? ex: (2, 3, E) LFRFF: `;

export const checkStartingPositionsAndCommands = (i: number): CheckStartingPositionsAndCommandsReturn => {
    let startingPositionAndCommands = prompt(createRobotPositionText(i));

        if(!startingPositionAndCommands) {
            console.log('Please enter a starting position and commands for the robot');
            return checkStartingPositionsAndCommands(i);
        }
        // we need to check that the starting position and commands are valid
        const pattern = /\(-?\d+, -?\d+, [NESW]\) [FRL]+/;
        if(!pattern.test(startingPositionAndCommands)) {
            console.log('Please enter a valid starting position and commands for the robot');
            return checkStartingPositionsAndCommands(i);
        }
        // we need to parse the starting position and commands
        let startingPositions = getStartingPositions(startingPositionAndCommands);

        let commands = getCommands(startingPositionAndCommands);
        // we need to check that the starting position and commands are valid
        if(
            (startingPositions.x < 0) ||
            (startingPositions.y < 0) ||
            !startingPositions.orientation ||
            commands.length === 0
        ) {
            console.log('Please enter a valid starting position and commands for the robot');
            return checkStartingPositionsAndCommands(i);
        }

    return {
        startingPositions,
        commands
    }
}

const NUMBER_OF_ROBOTS_TEXT = 'How many robots would you like to create? (ex: 2): ';

export const checkNumberOfRobots = (): string => {
    let numberOfRobots = prompt(NUMBER_OF_ROBOTS_TEXT);
    if(!numberOfRobots) {
        console.log('Please enter a number for the number of robots');
        return checkNumberOfRobots();
    }
    // handle if we cant parse the number of robots
    if(isNaN(parseInt(numberOfRobots))) {
        console.log('Please enter a number for the number of robots');
        return checkNumberOfRobots();
    }

    return numberOfRobots;
}