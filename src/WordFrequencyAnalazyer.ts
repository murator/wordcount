import iWordFrequencyAnalyzer from './interfaces/iWordFrequencyAnalyzer';
import WordFrequency from './WordFrequency';

class WordFrequencyAnalyzer implements iWordFrequencyAnalyzer {
  constructor() { }

  /**
   * CalculateHighestFrequency should return the highest frequency 
   * in the text (several words might actually have this frequency)
   * @param text Text to analyse
   */
  calculateHighestFrequency(text: string): number {
    const topMostFrequentWord = 1;
    const highestFrequency = this.calculateMostFrequentNWords(text, topMostFrequentWord);

    return highestFrequency[0].getFrequency();
  }

  /**
   * CalculateFrequencyForWord should return the frequency of the specified word
   * @param text Text to analyse
   * @param word Word to calculate frequency of
   */
  calculateFrequencyForWord(text: string, word: string): number {
    const inputArray = this.tokeniseInputText(text);
    console.table(inputArray);
    const wordFrequencyMap = this.mapWordFrequency(inputArray);
    console.table(wordFrequencyMap);
    const inputWord = word.toLowerCase();

    return wordFrequencyMap.get(inputWord) || 0;
  }

  /**
   * CalculateMostFrequentNWords should return a list of the most 
   * frequent „n‟ words in the input text, all the words returned in lower case.
   * @param text Text to analyse
   * @param n Specify top range amount of words
   */
  calculateMostFrequentNWords(text: string, n: number): Array<WordFrequency> {
    const inputArray = this.tokeniseInputText(text);
    const wordFrequencyMap = this.mapWordFrequency(inputArray);

    let outputList: Array<WordFrequency> = Array.from(wordFrequencyMap, ([name, value]) => {
      return new WordFrequency(name, value);
    }).slice(0, n)

    return outputList;
  }

  /**
   * Count total number of words in text
   * @param text Text to analyse
   */
  count(text: string): number {
    return this.tokeniseInputText(text).length;
  }

  /**
   * Convert array of words to a map of words and their count
   * @param inputArray 
   */
  private mapWordFrequency(inputArray: Array<string>): Map<string, number> {
    const inputMap = new Map<string, number>();

    for (const word of inputArray) {
      const value = inputMap.get(word) || 0
      inputMap.set(word.trim(), value + 1)
    }

    const sortedOutputMap: Map<string, number> =
      new Map(Array.from(inputMap)
        .sort((f1, f2) => f2[1] - f1[1])
      )

    return sortedOutputMap;
  }

  /**
   * Convert input text to lowercased array of words split by single space
   * Only allow alphabetical characters
   * Compound words and punctuation marked words are treated as two words
   * @param text Text to analyse
   */
  private tokeniseInputText(text: string): Array<string> {
    return text
      .toLowerCase() // lowercase entire text
      //.replace(/-+/g, '') // treat words with separator - as single word
      //.replace(/’+/g, '') // treat words with apostrophe ’ as single word
      .replace(/[^a-zÀ-ÿ+]+/gi, ' ') // only alphabetical characters
      .replace(/  +/g, ' ') // reduce multiple spaces to single space
      .split(' ') // split on single space
      .filter((e) => e !== '') // remove empty entities
  }

}

export default WordFrequencyAnalyzer;