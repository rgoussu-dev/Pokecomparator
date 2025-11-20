import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalize a simple name', () => {
    expect(pipe.transform('pikachu')).toBe('Pikachu');
  });

  it('should handle hyphenated names', () => {
    expect(pipe.transform('tapu-koko')).toBe('Tapu Koko');
  });

  it('should handle special case: mr-mime', () => {
    expect(pipe.transform('mr-mime')).toBe('Mr. Mime');
  });

  it('should handle special case: ho-oh', () => {
    expect(pipe.transform('ho-oh')).toBe('Ho-Oh');
  });

  it('should handle special case: porygon-z', () => {
    expect(pipe.transform('porygon-z')).toBe('Porygon-Z');
  });

  it('should handle special case: nidoran-f', () => {
    expect(pipe.transform('nidoran-f')).toBe('Nidoran ♀');
  });

  it('should handle special case: nidoran-m', () => {
    expect(pipe.transform('nidoran-m')).toBe('Nidoran ♂');
  });

  it('should handle empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should handle multiple hyphens', () => {
    expect(pipe.transform('farfetch-d')).toBe('Farfetch D');
  });
});
