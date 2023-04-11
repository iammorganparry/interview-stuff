import { describe, expect, it, vi, beforeEach, afterEach, MockedFunction } from "vitest";
import { checkGridSize, checkNumberOfRobots, checkStartingPositionsAndCommands, getCommands, getStartingPositions } from "../utils";
import { prompt } from "../prompt";


vi.mock('../prompt.ts')

describe("checkNumberOfRobots", () => {


    let mockPrompt: MockedFunction<typeof prompt>;

    beforeEach(() => {
        mockPrompt = vi.mocked(prompt);
    })


    afterEach(() => {
        vi.resetAllMocks()
    })

    it("should return a number on correct input", async () => {
        mockPrompt.mockReturnValueOnce("1");
        expect(checkNumberOfRobots()).toBe(1);
    });

    it.todo("Should show a console message on incorrect input", () => {
        const consoleLog = vi.spyOn(console, 'log');
        mockPrompt.mockReturnValue("foo");
        expect(checkNumberOfRobots()).toBe("foo");
        expect(consoleLog).toHaveBeenCalled();
    })
});

describe('checkStartingPositionsAndCommands', () => {
    let mockPrompt: MockedFunction<typeof prompt>;

    beforeEach(() => {
        mockPrompt = vi.mocked(prompt);
    })


    afterEach(() => {
        vi.resetAllMocks()
    })
    it('should return a starting position and commands', () => {
        mockPrompt.mockReturnValueOnce('(1, 2, N) FRL');
        const expected = {
            startingPositions: {
                x: 1,
                y: 2,
                orientation: 'N'
            },
            commands: ['F', 'R', 'L']
        }
        expect(checkStartingPositionsAndCommands(1)).toEqual(expected);
    })
});

describe('checkGridSize', () => {
    let mockPrompt: MockedFunction<typeof prompt>;

    beforeEach(() => {
        mockPrompt = vi.mocked(prompt);
    })

    it('should return a grid size', () => {
        mockPrompt.mockReturnValueOnce('5 x 5');
        const expected = {
            x: 5,
            y: 5
        }
        expect(checkGridSize()).toEqual(expected);
    })
});

describe('getCommands', () => {
    it('should return an array of commands', () => {
        const input = '(1, 2, N) FRL';
        const expected = ['F', 'R', 'L'];
        expect(getCommands(input)).toEqual(expected);
    })
});

describe('getStartingPositions', () => {
    it('should return an object of starting positions', () => {
        const input = '(1, 2, N) FRL';
        const expected = {
            x: 1,
            y: 2,
            orientation: 'N'
        }
        expect(getStartingPositions(input)).toEqual(expected);
    })
});