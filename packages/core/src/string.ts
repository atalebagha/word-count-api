export * from './string';

type SanitizeTextFunction = (text: string) => string;
export const sanitizeText: SanitizeTextFunction = (text) => {
	let cleanText = text.replace(/["?@.,\/#!$%\^&\*;:{}=\-_`~()]+/g,"")
	cleanText = cleanText.replace(/[\r\n]+/g, ' ')
	cleanText = cleanText.replace(/\S*\d+\S*/g, '')
	cleanText = cleanText.replace(/  +/g, ' ')
	return cleanText;
};

type FilterExcludedListFunction = (excluded: string[]) => (text: string) => string;
export const filterExcludedList: FilterExcludedListFunction = (excluded) => (text) => {
	const expStr = excluded.join(" | ");
	let str = text.replace(new RegExp(expStr, 'gi'), ' ');
	str = str.trim();
	return sanitizeText(str);
};

type GetListOfWordsFunction = (text: string) => string[]
export const getListOfWords: GetListOfWordsFunction = (text) => {
	return text.match(/(\w+\b)(?!.*\1\b)/gi) ?? [];
}

type SplitBySpace = (text: string) => string[]
export const splitBySpace: SplitBySpace = (text) => text.split(' ');

type GetWordCountMapFunction = (textArray: string[]) => Map<string, number>
export const getWordCountMap: GetWordCountMapFunction = (textArray) => {
	const map = new Map();
	for (let x = 0; x < textArray.length; x++) {
		const word = textArray[x];
		const num = map.get(word) ?? 0;
		map.set(word, num + 1);
	}
	return map;
};
