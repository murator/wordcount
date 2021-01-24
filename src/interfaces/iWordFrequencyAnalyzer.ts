import WordFrequency from "./iWordFrequency";

// TODO: check the original doc for what they provide, which might be tricks to get me off
export default interface WordFrequencyAnalyzer {
  calculateHighestFrequency(text: string): number;
  calculateFrequencyForWord(text: string, word: string): number;
  calculateMostFrequentNWords(text: string, n: number): Array<WordFrequency>;
};
