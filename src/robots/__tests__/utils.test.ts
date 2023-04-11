import { describe, expect, it, vi, beforeEach, afterEach, MockedFunction } from "vitest";
import { checkGridSize, checkNumberOfRobots, checkStartingPositionsAndCommands, createHeading, getCommands, getStartingPositions } from "../utils";
import { prompt } from "../prompt";


vi.mock('../prompt.ts')

describe('createHeading', () => {
    it('should create a heading', () => {
        const consoleMock = vi.spyOn(console, 'log');
        createHeading();
        expect(consoleMock).toHaveBeenCalled();
    })
});

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

    it("Should show a console message on incorrect input", () => {
        const consoleLog = vi.spyOn(console, 'log');
        mockPrompt.mockReturnValueOnce("foo").mockReturnValueOnce("1");
        checkNumberOfRobots();
        expect(consoleLog).toHaveBeenCalled();
    })

    it('should handle no input', () => {
        const consoleLog = vi.spyOn(console, 'log');
        mockPrompt.mockReturnValueOnce('').mockReturnValueOnce('1');
        checkNumberOfRobots();
        expect(consoleLog).toHaveBeenCalled();
    });
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

    it('should handle a bad starting position', () => {
        mockPrompt.mockReturnValueOnce('').mockReturnValueOnce('(1, 2, N) FRL');
        const consoleMock = vi.spyOn(console, 'log');
        checkStartingPositionsAndCommands(1);
        expect(consoleMock).toHaveBeenCalled();
    })

    it('should handle a non pattern match', () => {
        mockPrompt.mockReturnValueOnce('foo').mockReturnValueOnce('(1, 2, N) FRL');
        const consoleMock = vi.spyOn(console, 'log');
        checkStartingPositionsAndCommands(1);
        expect(consoleMock).toHaveBeenCalled();
    })

    it('should handle negative numbers', () => {
        mockPrompt.mockReturnValueOnce('(-1, 2, N) FRL').mockReturnValueOnce('(1, 2, N) FRL');
        const consoleMock = vi.spyOn(console, 'log');
        checkStartingPositionsAndCommands(1);
        expect(consoleMock).toHaveBeenCalled();
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

    it('should handle a no input', () => {
        mockPrompt.mockReturnValueOnce('').mockReturnValueOnce('5 x 5');
        const consoleMock = vi.spyOn(console, 'log');
        checkGridSize();
        expect(consoleMock).toHaveBeenCalled();
    })

    it('should handle a bad input', () => {
        mockPrompt.mockReturnValueOnce('5 by 5').mockReturnValueOnce('5 x 5');
        const consoleMock = vi.spyOn(console, 'log');
        checkGridSize();
        expect(consoleMock).toHaveBeenCalled();
    })

});

describe('getCommands', () => {
    it('should return an array of commands', () => {
        const input = '(1, 2, N) FRL';
        const expected = ['F', 'R', 'L'];
        expect(getCommands(input)).toEqual(expected);
    })

    it('should handle no commands input', () => {
        const input = '(1, 2, N)';
        const expected = [] as string[];
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

    it('should handle a bad input', () => {
        const input = '(1, 2) FRL';
        const expected = {
            x: -1,
            y: -1,
            orientation: 'N'
        }
        expect(getStartingPositions(input)).toEqual(expected);
    });
});