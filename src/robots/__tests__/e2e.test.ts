import { vi, afterEach, MockedFunction, beforeEach, expect, describe, it } from "vitest";
import { main } from "../robots";
import { prompt } from "../prompt";

vi.mock('../prompt.ts')

describe('E2E', () => {
    
    const consoleLog = vi.spyOn(console, 'log');
    afterEach(() => {
        vi.resetAllMocks()
    })

    let mockPrompt: MockedFunction<typeof prompt>;

    beforeEach(() => {
        mockPrompt = vi.mocked(prompt);
    })

    it('should output the correct location for a given Robot', () => {

        mockPrompt.mockReturnValueOnce('5 x 5')
        .mockReturnValueOnce('2')
        .mockReturnValueOnce('(2, 3, E) LFRFF')
        .mockReturnValueOnce('(0, 2, N) FFLFRFF')

        main()
        expect(consoleLog).toHaveBeenCalledWith('(4, 4, E)');
        expect(consoleLog).toHaveBeenCalledWith('(0, 4, W) LOST');
    })
    
});