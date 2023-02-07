import { ApiHandler } from "sst/node/api";
import axios from 'axios';
import { sanitizeText, filterExcludedList, getWordCountMap, splitBySpace } from "@top-fifty/core/string";
import { map, pipe, head, take } from 'ramda';

type FetchText = () => Promise<string>
export const fetchText: FetchText =  async () => {
   const response = await axios.get('http://www.gutenberg.org/files/2701/2701-0.txt')
	 return response.data;
}

type SortMapByValueFunction = (map: Map<string, number>) => Map<string, number>
export const sortMapByValue: SortMapByValueFunction = (map) => {
	return new Map([...map.entries()].sort((a,b) => b[1] - a[1]))
}

export const handler = ApiHandler(async (_evt) => {
	const text: string = await fetchText();
	/*
	 The endpoint isn't working as expected
	 This is a FP approach of handling this.
	*/
	const getResult: any = pipe<
		[string], string, string, string[], Map<string, number>, Map<string, number>, Array<Array<any>>, Array<Array<any>>, string[]
		>(
			sanitizeText,
			filterExcludedList("the,of,to,and,a,in,is,it,you,that,he,was,for,on,are,with,as,I,his,they,be,at,one,have,this,from,or,had,by,not,word,but,what,some,we,can,out,other,were,all,there,when,up,use,your,how,said,an,each,she".split(',')),
			splitBySpace,
			getWordCountMap,
			sortMapByValue,
			(map: Map<string, number>) => [...map],
			take(50),
			map((arr: Array<any>) => head(arr))
		);
  const result = getResult(text);

  return {
    body: result,
  };
});
