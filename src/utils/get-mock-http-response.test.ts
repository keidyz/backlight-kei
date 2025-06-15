import { getRandomMockHttpResponse } from './get-mock-http-response';

describe('getRandomMockHttpResponse', () => {
    it('should return a non-empty string', () => {
        const response = getRandomMockHttpResponse();
        expect(response).toBeDefined();
        expect(typeof response).toBe('string');
        expect(response.length).toBeGreaterThan(0);
    });
});