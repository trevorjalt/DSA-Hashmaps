const HashMap = require('./DSA-Hashmaps')
const HashMapChain = require('./DSA-Hashmaps-Chain')

function main() {
    const lotr = new HashMap()

    HashMap.MAX_LOAD_RATIO = .5
    HashMap.SIZE_RATIO = 3

    lotr.set("Hobbit", "Bilbo")
    lotr.set("Hobbit", "Frodo")
    lotr.set("Wizard", "Gandalf")
    lotr.set("Human", "Aragorn")
    lotr.set("Elf", "Legolas")
    lotr.set("Maiar", "The Necromancer")
    lotr.set("Maiar", "Sauron")
    lotr.set("RingBearer", "Gollum")
    lotr.set("LadyOfLight", "Galadriel")
    lotr.set("HalfElven", "Arwen")
    lotr.set("Ent", "Treebeard")


    console.log("LOTR", lotr); //length is 9, there are collisions in the data under "Hobbit" and "Maiar" for keys.
    console.log(lotr.get("Maiar"));  // Sauron, the key for "Maiar" is being reset
    console.log(lotr.get("Hobbit")); // Frodo, the key for "Hobbit" is being reset 
    console.log(lotr._capacity); // 24, since we exceed the initial length of 8 we must multiply by size ratio to accomodate, 8 x 3.

    console.log(lotr.get('VampireSlayer')) // Check for error handling, Buffy's got her own show

}

main()


const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}

// WhatDoesThisDo()


10, 22, 31, 4, 15, 28, 17, 88, 59
console.log('open addressing')
console.log(10, 10 % 11)
console.log(22, 22 % 11)
console.log(31, 31 % 11)
console.log(4, 4 % 11)
console.log(15, 15 % 11)
console.log(28, 28 % 11)
console.log(17, 17 % 11)
console.log(88, 88 % 11)
console.log(59, 59 % 11)



5, 28, 19, 15, 20, 33, 12, 17, 10
console.log('separate chaining')
console.log(5, 5 % 9)
console.log(28, 28 % 9)
console.log(19, 19 % 9)
console.log(15, 15 % 9)
console.log(20, 20 % 9)
console.log(33, 33 % 9)
console.log(12, 12 % 9)
console.log(17, 17 % 9)
console.log(10, 10 % 9)



function removeDuplicates(str) {
    // create a new hashmap to hold key/value pairs
    const noDuplicates = new HashMap();

    // declare new var for string output 
    let newStr = ''

    // loop through the input str and insert into the hashmap at the index (as key)
    for (let i = 0; i < str.length; i++) {
        noDuplicates.set(i, str[i])
        // console.log(noDuplicates)
    }
    
    // loop through again and check if the new string includes the
    // the value at the same index within the hashmap
    // if it doesn't, add it to the new str
    for (let i = 0; i < str.length; i++) {
        if (!newStr.includes(noDuplicates.get(i))) {
            newStr += str[i]
        }
    }

    // return the newStr
    return newStr
}

console.log(removeDuplicates('google'))
console.log(removeDuplicates('google all that you think can think of'))



function isPalindrome(str) {
    let countMap = new HashMap()
    let odd = 0
    // sanitize for case, spaces, and quotations
    str = str.toLowerCase(str).replace(/\s+/g, '').replace(/["']/g, '')

    // loop through the string
    // retrieve duplicate characters
    // add a value for each time a character appears
    // otherwise get the char, and give it a value of 1

    for (let i = 0; i < str.length; i++) {
        let char = str[i]

        try {
            let value = countMap.get(char)
            value++
            countMap.set(char, value)
        } catch (e) {
            countMap.set(char, 1)
        }
    }

    // loop through to check for palindromes
    // return false if the odd is greater than 1
    // else return true
    for (let i = 0; i < str.length; i++) {
        let palindromeCheck = countMap.get(str[i])

        if (palindromeCheck % 2 !== 0) {           
            odd++
        }
    }

    if (odd > 1) {
        return false
    }

    return true
}

console.log(isPalindrome('acecarr')) // true
console.log(isPalindrome('north')) // false
console.log(isPalindrome('engage')) // false
console.log(isPalindrome('Rotator')) // true
console.log(isPalindrome('step\' on no pets')) // true
console.log(isPalindrome('We did it')) // false
console.log(isPalindrome('Don\'t nod')) // true



// function anagramGroup(arr) {
//     // create Hash Table
//     const anagramMap = new HashMap()

//     //calculate the hash value of each word in such a way that 
//     // all anagrams have the same hash value
    
//     arr.forEach(string => {
//         let char = string.split('').sort().join('')

//         if (anagramMap[char]) {
//             anagramMap[char].push(string)
//         } else {
//             anagramMap[char] = [string]
//         }
//     })

//     let keys = Object.keys(anagramMap)
//     keys.forEach(key => {
//         return anagramMap[key]
//     })
//     return Object.values(anagramMap)
// }


function anagramGroups(arr) {
    // create Hash Table as well as an array to hold our result lists
    let anagramMap = new HashMap();
    let resultLists = [];
    
    // loop through the input array
    for (let i = 0; i < arr.length; i++) {
        // create a variable to hold our anagram 'group'
        let group = arr[i].split('').sort().join('');
        
        try {
            // see if an anagram 'group' exists
            // if it does, push this new version in
            let index = anagramMap.get(group);
            resultLists[index].push(arr[i]);
        } catch (e) {
            // else create a new 'group' to hold our anagram
            anagramMap.set(group, resultLists.length);
            resultLists.push([arr[i]]);
        }
    }

    return resultLists;
}

let anagramTest = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']
console.log(anagramGroups(anagramTest))