# Lorem Ipsum Generator on JavaScript

## Description

Latin dummy text generator written on JS. You can either generate a sentence or a whole paragraph

## Usage

There two functions that are exported from the file: `getLoremSentence` and `getLoremParagraph`.

```ts
// Returns randomly generated sentence of specified length
getLoremSentence(sentenceLength: number): string

// Returns randomly generated paragraph of specified length
// Starts with 'Lorem ipsum dolor sit amet.' unless the second argument is set to true
getLoremParagraph(wordsLength: number, totalRandom: boolean = false) : string
```

## Implementation

The sentence is generated by picking each word randomly(from hardcoded dataset), excluding from selection the previous two words of the sentence.

The paragraph is generated from sentences of random length (from 5 to 15 inclusive).

## Dataset

The dataset was found in this repo: https://github.com/Riamse/lorem-ipsum-generator/

Thank you, Riamse!