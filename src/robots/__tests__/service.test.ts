
import { describe, expect, it, vi } from 'vitest';
import { Robot } from '../service';
describe('Robot', () => {
    
    it('should create a robot', () => {
        const robot = new Robot(0, 0, 'N', 5, 5);
        expect(robot).toBeDefined();
    })

    it('should move forward', () => {
        const robot = new Robot(0, 0, 'N', 5, 5);
        robot.moveRobot(['F']);
        expect(robot.y).toBe(1);
    })

    it('should move forward and turn right', () => {
        const robot = new Robot(0, 0, 'N', 5, 5);
        robot.moveRobot(['F', 'R']);
        expect(robot.y).toBe(1);
        expect(robot.orientation).toBe('E');
    })


    it('should move forward and turn right and turn left', () => {
        const robot = new Robot(0, 0, 'N', 5, 5);
        robot.moveRobot(['F', 'R', 'L']);
        expect(robot.y).toBe(1);
        expect(robot.orientation).toBe('N');
    })


    it('Should mark itself as lost if it falls off the grid', () => {
        const robot = new Robot(0, 0, 'S', 1, 1);
        robot.moveRobot(['F']);
        expect(robot.lost).toBe(true);
    })


    it('Should not move if it falls off the grid Y', () => {
        const robot = new Robot(0, 0, 'S', 1, 1);
        robot.moveRobot(['F']);
        expect(robot.y).toBe(0);
    })

    it('Should not move if it falls off the grid X', () => {
        const robot = new Robot(0, 0, 'W', 1, 1);
        robot.moveRobot(['F']);
        expect(robot.x).toBe(0);
    })

    it("Should announce its final position", () =>{
        const logSpy = vi.spyOn(console, 'log');
        const robot = new Robot(0, 0, 'W', 1, 1);
        robot.moveRobot(['F']);
        robot.printFinalPosition();
        expect(logSpy).toHaveBeenCalledWith('(0, 0, W) LOST');
    })


});