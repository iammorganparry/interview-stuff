import { describe, it, expect, vi, afterEach } from 'vitest'
import { Robot } from '../service';
import { Orientation } from '../types';

describe('Robot Challenge', () => {
  
    const consoleLog = vi.spyOn(console, 'log');
    afterEach(() => {
        vi.resetAllMocks()
    })


    it("should output the correct location for a given Robot", () => {
        const startingPositions = {
            x: 2,
            y: 3,
            orientation: 'E' as Orientation
        }
        const commands = ['L','F','R','F','F'];
        const robot = new Robot(startingPositions.x, startingPositions.y, startingPositions.orientation, 4, 8);
        robot.moveRobot(commands);
        robot.printFinalPosition();
        expect(consoleLog).toHaveBeenCalledWith('(4, 4, E)');
    })

    it('Should handle a robot falling off the grid X', () => {
        const startingPositions = {
            x: 0,
            y: 2,
            orientation: 'N' as Orientation
        }
        const commands = ['F','F','L','F','R','F','F'];
        const robot = new Robot(startingPositions.x, startingPositions.y, startingPositions.orientation, 4, 8);
        robot.moveRobot(commands);
        robot.printFinalPosition();
        expect(consoleLog).toHaveBeenCalledWith('(0, 4, W) LOST');
    })

    it('Should handle a robot falling off the grid Y', () => {
    const startingPositions = {
        x: 0,
        y: 2,
        orientation: 'N' as Orientation
    }
    const commands = ['F','F','F','F']
    const robot = new Robot(startingPositions.x, startingPositions.y, startingPositions.orientation, 4, 3);
    robot.moveRobot(commands);
    robot.printFinalPosition();
    expect(consoleLog).toHaveBeenCalledWith('(0, 3, N) LOST');
    })
});