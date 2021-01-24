import fs from 'fs';
import WordCount from '../src/WordCount'
import WordFrequency from '../src/WordFrequency';

const basicTest = (text: string, expectedCounts: number, word: string = 'word') => {
  const wordCount = new WordCount();
  expect(wordCount.analyze()
    .calculateFrequencyForWord(text, word))
    .toEqual(expectedCounts)
}

describe('Word Count', () => {

  it('count one word', () => {
    const expectedCounts = 1;
    const text = 'word ';
    basicTest(text, expectedCounts);
  })

  it('count multiple words', () => {
    const expectedCount = 2;
    const text = 'The sun shines over the lake';
    basicTest(text, expectedCount, 'The');
  })

  it('count non existent word', () => {
    const expectedCount = 0;
    const text = 'The sun shines over the lake';
    basicTest(text, expectedCount, 'THISDOESNOTEXIST');
  })

  it('counts multiple words', () => {
    const expectedCount = 6;
    const text = 'The sun shines over the lake';
    const wordCount = new WordCount();
    const result = wordCount.analyze().count(text);
    expect(result).toEqual(expectedCount)
  })

  it('case sensitive text and input are compared as lowercase', () => {
    let expectedCounts = 0;
    const text = 'The sun Shines shines SHINes OVer tHe lake';
    expectedCounts = 2;
    basicTest(text, expectedCounts, 'the');
    expectedCounts = 3;
    basicTest(text, expectedCounts, 'SHINES');
  })

  it('convert multiple spaces between words to a single space', () => {
    let expectedCounts = 5;
    const text = 'The sun  shines   sun  sun sun        sun';
    basicTest(text, expectedCounts, 'SUN');
  })

  it('multiple seperator characters', () => {
    let expectedCounts = 0;
    const text = 'The sun,shines sun, shines   over \nthe lake \tLake LAKE';
    expectedCounts = 2;
    basicTest(text, expectedCounts, 'shines');
    expectedCounts = 3;
    basicTest(text, expectedCounts, 'Lake');
  })

  it('ignore numerical characters', () => {
    let expectedCounts = 0;
    const text = '0 The 123,shines sun888, shines, 987t987   over \nthe lake \tLake LAKE';
    basicTest(text, expectedCounts, '123');
    basicTest(text, expectedCounts, '987t987');
  })

  it('sort words in order of highest frequency', () => {
    const text = 'the twee twee over over OvER over over over over over Lake Lake Lake Lake Lake LAKE';
    const wordCount = new WordCount();
    const expectedCounts = 8;
    expect(wordCount.analyze()
      .calculateHighestFrequency(text))
      .toEqual(expectedCounts)
  })

  it('runs on a large text file with identical common resultset from rosetta code', () => {
    const text = fs.readFileSync('./test/resources/book.txt', 'utf8');
    const expectedResult: Array<WordFrequency> = Array(
      new WordFrequency('the', 41092),
      new WordFrequency('of', 19954),
      new WordFrequency('and', 14943),
      new WordFrequency('a', 14545),
      new WordFrequency('to', 13953),
      new WordFrequency('in', 11219),
      new WordFrequency('he', 9649),
      new WordFrequency('was', 8622),
      new WordFrequency('that', 7924),
      new WordFrequency('it', 6661)
    )

    const wordCount = new WordCount();
    let result = wordCount.analyze().calculateMostFrequentNWords(text, 10);
    expect(result).toEqual(expectedResult);
  })

})