import { addition } from '.';

describe('index', () => {
  describe('addition', () => {
    test('2 and 3 adds up to 5', () => {
      expect(addition(2, 3)).toEqual(5);
    });
  });
});
