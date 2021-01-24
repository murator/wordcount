import iWordFrequency from './interfaces/iWordFrequency';

class WordFrequency implements iWordFrequency {
  word: string;
  frequency: number;

  constructor(word: string, frequency: number) { 
    this.word = word;
    this.frequency = frequency;
  }
  getWord(): string {
    return this.word;
  }
  getFrequency(): number {
    return this.frequency;
  }
}

export default WordFrequency;