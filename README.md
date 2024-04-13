# PiChi 📸

PiChi (ピチッ) is a simple tool meant to help Japanese language learners save time during their studies. I got tired of spending so much time just looking for example sentences with terms I’m learning to *study later* rather than actually studying them, and this tool was born. 

PiChi saves you time by taking a file of terms and grabbing several example sentences containing each term from [Jisho.org](http://Jisho.org) and dumping them into a file.

## Installation

To use this tool, clone or download the repo and put it somewhere you like.

## Requirements

To use PiChi you’ll need to have node.js installed.

## How to use it

Navigate to the /src/ directory of PiChi is and run `index.js`

```bash
node index.js
```

After it’s done running, all of the content will go into the `/bin/data/generated_files` folder. Export it any way you like!

## Features in Development
### Coming Next
- **shorter sentences option** - some of the top results for term sentences are quite long, in the beginning it can be easier to use shorter. easier to understand sentences. I'm working out how to allow a users a choice to grab shorter sentences.
- **fill in the blank drill sheets/tables for terms and their readings** - This will be a simple, printable worksheet for you to drill writing the terms from the readings, or vice versa. There will be several formats:
    1. a basic chart that takes up the entire page with terms in the first column in randomized order.
    2. an ordered list (following the rank in New Master JLPT N2 Kanji workbook) of sections with the character on the left of the page, and that character's terms from the unit listed to their right, with blanks beside each of them for alternating drilling.
    3. An 'answer key' for both, listed seperately so you can check your work easily as you go.

I have a lot of plans for additional functionality, including:
- **Better Formatting for Generated Content** - instead of material just being written to a file inside the project directory, actual PDF worksheets complete with headings, subheadings, boxes containing different terms to fill into sentences, etc. will be created.
- **More Robust File Import/Export Options** - you will be able to import terms from other locations and file formats, name generated files and specify the separating characters between terms (for example, terms seperated line by line, by space, by comma, etc…) You will also be able to set different locations for generated files.
- **Image to Text Functionality** - you will be able to take a photo of your textbook page, JLPT book page, or study guide and instantly get a list of all the terms on the page. You will be able to choose what information you want to get for each term (Kanji (if applicable), reading, english meanings, example sentence & how many, JLPT level, etc). You can then funnel the terms to the relevent functions of your choice.
