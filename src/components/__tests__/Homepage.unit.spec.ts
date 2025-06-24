import { describe, it, expect } from 'vitest';

function convert(amount: number, rate: number): string {
  return (amount * rate).toFixed(2);
}

describe('Homepage business logic', () => {
  it('správne konvertuje sumu podľa kurzu', () => {
    expect(convert(10, 1.1)).toBe('11.00');
    expect(convert(5, 0.5)).toBe('2.50');
    expect(convert(0, 1.5)).toBe('0.00');
  });

  it('vráti sumu ako string ak je kurz 1', () => {
    expect(convert(7, 1)).toBe('7.00');
  });
});
