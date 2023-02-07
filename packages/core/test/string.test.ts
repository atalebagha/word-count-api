import { sanitizeText, filterExcludedList, getWordCountMap, splitBySpace } from "../src/string";
import { test, expect, describe } from 'vitest';

describe('string', () => {
	describe('sanitizeText', () => {
		test('removes puncuation', () => {
			expect(sanitizeText('abc?!$@;.xyz')).toBe('abcxyz');
		});
		test('removes line breaks', () => {
			expect(sanitizeText('abc xyz')).toBe('abc xyz');
		});
		test('replaces multiple spaces with single space', () => {
			expect(sanitizeText('abc  xyz')).toBe('abc xyz');
		});
		test('removes words with numbers', () => {
			expect(sanitizeText('abc  123')).toBe('abc');
		});
	});
	describe('filterExcludedList', () => {
		test('removes excluded words', () => {
			expect(filterExcludedList(['the', 'she', 'most'])("The thing she missed most after she moved was the restaurant's from the city."))
				.toBe("thing missed after moved was restaurant's from city")
		})
	});
	describe('splitBySpace', () => {
		test('returns array of words', () => {
			expect(splitBySpace("the thing she missed most after she moved was the restaurant from the city"))
				.toEqual([
					"the", "thing", "she", "missed", "most", "after", "she", "moved", "was", "the", "restaurant", "from", "the", "city"
				])
		})
	})
	describe('getWordCountMap', () => {
		test('has count of words', () => {
			expect(getWordCountMap("the thing she missed most after she moved was the restaurant from the city".split(' ')))
				.toEqual(new Map(Object.entries({
					the: 3,
					thing: 1,
					she: 2,
					missed: 1,
					most: 1,
					after: 1,
					moved: 1,
					was: 1,
					restaurant: 1,
					from: 1,
					city: 1,
				})))
		})
	})
})
