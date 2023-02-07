import { sortMapByValue } from '../src/lambda';
import { describe, test, expect } from 'vitest';

describe('lambda handler', () => {
	describe('sortMapByvalue', () => {
		test('should sort maps by value', () => {
			const map = new Map([
				['the', 2],
				['brown', 4],
				['green', 1],
				['he', 3],
				['them', 1],
				['well', 5],
			])
			expect(sortMapByValue(map))
				.toEqual(new Map([
					['well', 5],
					['brown', 4],
					['he', 3],
					['the', 2],
					['green', 1],
					['them', 1],
				]))
		})
	})
})
