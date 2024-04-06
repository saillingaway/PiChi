/**
 * PiChi
 * 
 * This program is a simple tool to help save time for Japanese Language Studiers.
 * Given a list of terms (single characters, verbs, nouns, adjectives, etc...), 
 * PiChi queries Jisho.org for sentence examples with those terms, bundling them
 * into a neat and helpful worksheet.
 * 
 * For instructions, see the README.
 * 
 * Created by Sophie Crouse Thursday, Apr 4 2024
 */

const JishoAPI = require('unofficial-jisho-api'); 

const jisho = new JishoAPI();
const fs = require('fs'); 

// sets dirname to point to the filepath of ../bin/data to be able to read all files
const dirname = __dirname.substring(0, __dirname.lastIndexOf("/") + 1) + 'bin/data/';
let sentencesFile = dirname + 'generated_files/sentence_examples.txt';
let blankSentencesFile = dirname + 'generated_files/sentence_blanks_examples.txt';
const examplesDirName = dirname + '/generated_files/';
let terms = [];

/**
 * Reads and parses a file of terms.
 * @param {string} file - the name of the file containing the list of terms (including the extension)
 * @param {string} filepath - the full path to the file
 */
async function readFile(file, filepath){
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        let words = data.split('\n');
        words.map((entry) => {
            words[entry] = entry.split(',')[0];
            terms.push(entry.split(',')[0]);
        });
        processTerms(terms);
    });
}

/**
 * Clears all the text from an auto-generated example file. The file needs to be in the /bin/data/generated_files/ directory.
 * @param {string} filename - the name of the file (including the extension) that will have its contents wiped.
 */
function clearFileContents(filename){
    fs.writeFile(examplesDirName + filename, '', function(){});
}

/**
 * Retrieves up to five examples sentences for each term in terms and dumps them into /bin/data/generated_files/sentence_examples.txt. 
 * Also clears the contents of 'sentence_examples.txt' beforehand.
 * @param {Array} terms - 
 */
function processTerms(terms){
    // let dir = dirname + '/generated_files/sentence_examples.txt';
    console.log(`Adding sentences from Jiso.org to ${sentencesFile}...`);
    terms.map((term) => {
        clearFileContents('sentence_examples.txt');
        jisho.searchForExamples(term).then(async result => {
            for (let i  = 0; i < 5; i++){
                if(i < result.results.length){
                    try {
                        // save the whole example sentence on one line.
                        let example = result.results[i];
                        saveSentenceToFile(example.kanji, sentencesFile);

                        // also process the sentence to replace the term with a blank space (for worksheets).
                        let blank_sentence = processSentence(example.kanji, term);
                        saveSentenceToFile(blank_sentence, blankSentencesFile);
                    } catch(error){
                        console.error("there was an error: ", error);
                    }
                }
            }
        });
    });
}

/**
 * Replaces a term within a sentence with underscores.
 * @param {*} sentence - the example sentence containting the term.
 * @param {*} term - the term within the sentence that will be replaced with a blank.
 * @returns sentence with a blank where the term goes.
 */
function processSentence(sentence, term){
    try{
        let blank_sentence = "";
        // TODO: update the blank to be proprotionately long to the number of characters in the term
        // one character = 2 underscores
        blank_sentence = sentence.replace(term, "_________________");
     return blank_sentence;
    } catch (err) {
        console.error(`Error: The sentence ${sentence} does not contain ${term}. ` + error);
    }
}

/**
 * Adds a sentence to the end of the 'sentence_examples.txt' file.
 * @param {String} sentence - the sentence that will be saved/written/output to the file.
 * @param {String} file - the name of the file where the sentence will be written to.
 */
function saveSentenceToFile(sentence, file){
    fs.appendFile(file, sentence + '\n', (err) => {
        if(err){
            console.log(err);
        }
        else {
            console.log('\tAdded: ', sentence);
        }
    });
}

async function main(){
    // look through .../bin/data/ to gather files (not directories)
    const dirs = fs.readdirSync(dirname, { withFileTypes: true});
    const files = dirs
        .filter(dir => dir.isFile())
        .map(dir => dir.name);
    try {
        await Promise.all(files.map((file) => {
            // for each file in /bin/data, read the file and save each term
            let filepath = dirname + file;
            readFile(file, filepath);
        }));
    } catch(error) {
        console.error('Error:', error);
    }
}

main();