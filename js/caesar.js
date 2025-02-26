function caesarCipher(sentence, shift = 3) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const shiftedAlphabet = alphabet.slice(shift).concat(alphabet.slice(0, shift));

    return sentence
        .split('')
        .map(char => {
        const lowerChar = char.toLowerCase();
        const index = alphabet.indexOf(lowerChar);
        if (index === -1) return char;
        return char === lowerChar ? shiftedAlphabet[index] : shiftedAlphabet[index].toUpperCase();
        })
        .join('');
}


function caesarUnCipher(sentence) {
    let tab = []
    for (let i = 1; i < 25; i++) {
        tab.push(caesarCipher(sentence, -i));
    }
    return tab;
}

let crypt = caesarCipher('Hello World', 12)

console.log(crypt); 

console.log(caesarUnCipher(crypt)); 
