# Working with hashmaps

## 1) Create a Hashmap class

Walk through the HashMap implementation in the curriculum and understand it well. Then write a HashMap class and its core functions with open addressing as the collision resolution mechanism.

* Export your HashMap module

````
class HashMap {
    constructor(initialCapacity = 8) {
        this.length = 0
        this._hashTable = []
        this._capacity = initialCapacity
        this._deleted = 0
    }

    get(key) {
        const index = this._findSlot(key)
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error')
        }
        return this._hashTable[index].value
    }

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO)
        }
        const index = this._findSlot(key)

        if (!this._hashTable[index]){
            this.length++
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        }
    }

    delete(key) {
        const index = this._findslot(key)
        const slot = this._hashTable[index]
        if (slot === undefined) {
            throw new Error('Key error')
        }
        slot.DELETED = true
        this.length--
        this._deleted++
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key)
        const start = hash % this._capacity

        for (let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity
            const slot = this._hashTable[index]
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index
            }
        }
    }

    _resize(size) {
        const oldSlots = this._hashTable
        this._capacity = size
        this.length = 0
        this._deleted = 0
        this._hashTable = []

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value)
            }
        }
    }

    static _hashString(string) {
        let hash = 5381
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i)
            hash = hash & hash
        }
        return hash >>> 0
    }
}

module.exports = HashMap
````

* Create a .js file called HashMaps_drills. In the file import the HashMap module. Create a function called main()

* Inside your main() function, create a hash map called lotr.

* For your hash map that you have created, set the MAX_LOAD_RATIO = 0.5 and SIZE_RATIO = 3.

* Add the following items to your hash map: {"Hobbit": "Bilbo"}, {"Hobbit": "Frodo"}, {"Wizard": "Gandalf"}, {"Human": "Aragorn"}, {"Elf": "Legolas"}, {"Maiar": "The Necromancer"}, {"Maiar": "Sauron"}, {"RingBearer": "Gollum"}, {"LadyOfLight": "Galadriel"}, {"HalfElven": "Arwen"}, {"Ent": "Treebeard"}

* Print your hash map and notice the length and items that are hashed in your hash map. Have you hashed all the items you were asked to?

* Retrieve the value that is hashed in the key "Maiar" and Hobbit.

* What are the values of Maiar and Hobbit that you have? Is there a discrepancy? Explain your answer.

* What is the capacity of your hash table after you have hashed all the above items? Explain your answer.

## 2) WhatDoesThisDo

DO NOT run the following code before solving the problem.

What is the output of the following code? explain your answer.

````
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
````

````
A:

Because str1 and str2 have the same key, when we set them in map1, str2's value replaces str1's value for the key: 'Hello World.'   This behavior is repeated for str3 and str 4 in map2.
````

## 3) Demonstrate understanding of Hash maps

*You don't need to write code for the following two drills. use any drawing app or simple pen and paper *

1) Show your hash map after the insertion of keys 10, 22, 31, 4, 15, 28, 17, 88, 59 into a hash map of length 11 using open addressing and a hash function k mod m, where k is the key and m is the length.

````
A:
[22, 88, emp, emp, 4, 15, 28, 17, 59, 31, 10]
````

2) Show your hash map after the insertion of the keys 5, 28, 19, 15, 20, 33, 12, 17, 10 into the hash map with collisions resolved by separate chaining. Let the hash table have a length m = 9, and let the hash function be k mod m.

````
A: 
[emp, [28, 19, 10], 20, 12, emp, 5, [15, 33], emp, 17]
````

## 4) Remove duplicates

Implement a function to delete all duplicated characters in a string and keep only the first occurrence of each character. For example, if the input is string “google”, the result after deletion is “gole”. Test your program with a sentence as well such as "google all that you think can think of".

````
function removeDuplicates(str) {
    const noDuplicates = new HashMap();

    let newStr = ''

    for (let i = 0; i < str.length; i++) {
        noDuplicates.set(i, str[i])
    }
    
    for (let i = 0; i < str.length; i++) {
        if (!newStr.includes(noDuplicates.get(i))) {
            newStr += str[i]
        }
    }

    return newStr
}
````

## 5) Any permutation a palindrome

Write an algorithm to check whether any anagram of some string is a palindrome. Given some string, "acecarr", the algorithm should return true, because the letters in "acecarr" can be rearranged to the anagram "racecar", which itself is a palindrome. In contrast, given the word "north", the algorithm should return false, because there's no anagram for "north" that would be a palindrome.

````
function isPalindrome(str) {
    let countMap = new HashMap()
    let odd = 0
    str = str.toLowerCase(str).replace(/\s+/g, '').replace(/["']/g, '')

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
````

## 6) Anagram grouping

Write an algorithm to group a list of words into anagrams. For example, if the input was
````
['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']
````
the output should be: 
````
[['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]
````

````
A:

function anagramGroups(arr) {
    let anagramMap = new HashMap();
    let resultLists = [];
    
    for (let i = 0; i < arr.length; i++) {
        let group = arr[i].split('').sort().join('');
        
        try {
            let index = anagramMap.get(group);
            resultLists[index].push(arr[i]);
        } catch (e) {
            anagramMap.set(group, resultLists.length);
            resultLists.push([arr[i]]);
        }
    }

    return resultLists;
}
````

## 7) Write another hash map implementation as above, but use separate chaining as the collision resolution mechanism.

* Test your hash map with the same values from the lotr hash map.