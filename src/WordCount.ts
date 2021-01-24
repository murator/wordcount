import * as fs from 'fs';
import WordFrequencyAnalyzer from "./WordFrequencyAnalazyer";

class WordCount {
  private wfa: WordFrequencyAnalyzer;

  constructor() {
    this.wfa = new WordFrequencyAnalyzer();
  }

  analyze() {
    return this.wfa;
  }
}

export default WordCount;

const text = fs.readFileSync('./test/resources/book.txt', 'utf8');
const result = new WordCount().analyze().calculateMostFrequentNWords(text, 10);
console.log('Top 10 words');
result.map((w) => {
  const output = `Word: "${w.getWord()}" with frequency: ${w.getFrequency()}`;
  console.log(output);
})