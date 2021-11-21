// Utilities
function getRandomInt(min, max, exceptions=[]) {
    let result = Math.floor(Math.random() * (max - min + 1)) + min;
    if (exceptions.includes(result)) {
        if (result + 1 <= max) {
            result += 1
        } else if (result - 1 >= min) {
            result -= 1
        } else {
            throw Error(`Can't generate random number from [${min}:${max}] with exceptions: ${exceptions}`)
        }
    }
    return result
}

function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// All words, seperated by semicolon
// Link to github repo with this dataset: https://github.com/Riamse/lorem-ipsum-generator/
const dataset = 'lorem;ipsum;dolor;ac;accumsan;ad;adipiscing;aenean;aliquam;aliquet;amet;ante;aptent;arcu;at;auctor;augue;bibendum;blandit;class;commodo;condimentum;congue;consectetuer;consequat;conubia;convallis;cras;cubilia;cum;curabitur;curae;cursus;dapibus;diam;dictum;dictumst;dignissim;dis;donec;dui;duis;egestas;eget;eleifend;elementum;elit;eni;enim;erat;eros;est;et;etiam;eu;euismod;facilisi;facilisis;fames;faucibus;felis;fermentum;feugiat;fringilla;fusce;gravida;habitant;habitasse;hac;hendrerit;hymenaeos;iaculis;id;imperdiet;in;inceptos;integer;interdum;justo;lacinia;lacus;laoreet;lectus;leo;libero;ligula;litora;lobortis;luctus;maecenas;magna;magnis;malesuada;massa;mattis;mauris;metus;mi;molestie;mollis;montes;morbi;mus;nam;nascetur;natoque;nec;neque;netus;nibh;nisi;nisl;non;nonummy;nostra;nulla;nullam;nunc;odio;orci;ornare;parturient;pede;pellentesque;penatibus;per;pharetra;phasellus;placerat;platea;porta;porttitor;posuere;potenti;praesent;pretium;primis;proin;pulvinar;purus;quam;quis;quisque;rhoncus;ridiculus;risus;rutrum;sagittis;sapien;scelerisque;sed;sem;semper;senectus;sit;sociis;sociosqu;sodales;sollicitudin;suscipit;suspendisse;taciti;tellus;tempor;tempus;tincidunt;torquent;tortor;tristique;turpis;ullamcorper;ultrices;ultricies;urna;ut;varius;ve;vehicula;vel;velit;venenatis;vestibulum;vitae;vivamus;viverra;volutpat;vulputate;'

const words = dataset.split(';')

function getLoremSentence(sentenceLength) {
    let sequence = []
    sequence.push(getRandomInt(0, words.length-1))
    sequence.push(getRandomInt(0, words.length-1, [sequence[0]]))
    if (sentenceLength < 2) {
        sequence = sequence.slice(1)
    }

    while (sentenceLength > sequence.length) {
        let previous = sequence[sequence.length - 1]
        let preprevious = sequence[sequence.length - 2]
        let exceptions = [previous, preprevious]
        let nextWord = getRandomInt(0, words.length - 1, exceptions)
        sequence.push(nextWord)
    }
    
    function sentenceReducer(curSentence, cur, idx, sequence) {        
        if (idx == 0) {
            if (idx == sequence.length - 1) {
                return `${capitalise(words[cur])}.`
            }
            return `${capitalise(words[cur])}`
        }
        if (idx == sequence.length - 1) {
            return `${curSentence} ${words[cur]}.`
        }
        return `${curSentence} ${words[cur]}`
    }
    
    return sequence.reduce(sentenceReducer, '')
}


function getLoremParagraph(wordsLen, totalRandom=false) {
    let currentLen = 0
    let paragraph = ''

    if (!totalRandom) {
        paragraph += 'Lorem ipsum dolor sit amet. '
        currentLen = 5
    
        if (wordsLen < currentLen) {
            return paragraph.split(' ').slice(0, wordsLen).join(' ') + '.'
        }
    }
    

    while (currentLen < wordsLen) {
        let sentenceLen = Math.min(wordsLen - currentLen, getRandomInt(5, 15))
        currentLen += sentenceLen
        paragraph += (getLoremSentence(sentenceLen) + ' ')
    }
    return paragraph
}

console.log(getLoremSentence(1))

export {getLoremSentence, getLoremParagraph}