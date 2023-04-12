
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

    describe('Orientation of Robot', () => {
        it('should right from N', () => {
            const robot = new Robot(0, 0, 'N', 5, 5);
            robot.moveRobot(['R']);
            expect(robot.orientation).toBe('E');  
        });
        
        it('should turn right from E', () => {
            const robot = new Robot(0, 0, 'E', 5, 5);
            robot.moveRobot(['R']);
            expect(robot.orientation).toBe('S');
        });

        it('should right from S', () => {
            const robot = new Robot(0, 0, 'S', 5, 5);
            robot.moveRobot(['R']);
            expect(robot.orientation).toBe('W');  
        });

        it('should right from W', () => {
            const robot = new Robot(0, 0, 'W', 5, 5);
            robot.moveRobot(['R']);
            expect(robot.orientation).toBe('N');
        });



        it('should left from N', () => {
            const robot = new Robot(0, 0, 'N', 5, 5);
            robot.moveRobot(['L']);
            expect(robot.orientation).toBe('W');  
        })

        it('should left from E', () => {
            const robot = new Robot(0, 0, 'E', 5, 5);
            robot.moveRobot(['L']);
            expect(robot.orientation).toBe('N');
        });

        it('should left from S', () => {
            const robot = new Robot(0, 0, 'S', 5, 5);
            robot.moveRobot(['L']);
            expect(robot.orientation).toBe('E');  
        })

        it('should left from W', () => {
            const robot = new Robot(0, 0, 'W', 5, 5);
            robot.moveRobot(['L']);
            expect(robot.orientation).toBe('S');
        }
        );
    });


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