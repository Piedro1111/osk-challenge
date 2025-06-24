import { describe, it, expect, beforeEach, vi } from 'vitest';

function convert(amount: number, from: string, to: string, rates: Record<string, number>): string {
  if (from === to) return amount.toString();
  const rate = rates[to];
  if (rate) return (amount * rate).toFixed(2);
  return '';
}

describe('Homepage advanced business logic', () => {
  let rates: Record<string, number>;

  beforeEach(() => {
    rates = { USD: 1.1, GBP: 0.9, EUR: 1, CZK: 25 };
  });

  it('vráti prázdny string ak cieľová mena nie je v kurzoch', () => {
    expect(convert(10, 'EUR', 'PLN', rates)).toBe('');
  });

  it('správne konvertuje medzi rôznymi menami', () => {
    expect(convert(10, 'EUR', 'USD', rates)).toBe('11.00');
    expect(convert(10, 'EUR', 'GBP', rates)).toBe('9.00');
    expect(convert(10, 'EUR', 'CZK', rates)).toBe('250.00');
  });

  it('vráti pôvodnú sumu ak je from a to rovnaké', () => {
    expect(convert(10, 'EUR', 'EUR', rates)).toBe('10');
  });

  it('správne zaobchádza s nulovou sumou', () => {
    expect(convert(0, 'EUR', 'USD', rates)).toBe('0.00');
  });

  it('správne zaobchádza s desatinnými číslami', () => {
    expect(convert(2.5, 'EUR', 'USD', rates)).toBe('2.75');
  });
});
