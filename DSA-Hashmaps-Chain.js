class HashMapChain {
    constructor(initialCapacity = 8) {
        this.length = 0
        this._hashTable = []
        this._capacity = initialCapacity
        this._deleted = 0
    }

    // helper function to see what's going on in our lists
    // note: doesn't show empty slots
    display() {
        this._hashTable.forEach(item => {
            if (item) {
                console.log(item)
                while (item.next) {
                    console.log(item.next)
                    item = item.next
                }
            }
        })
    }

    // LinkedList Compare:  This is our 'find'
    get(key) {
        const index = this._findSlot(key)

        // set variable for current item at the _hashTable index
        // this represents our 'Node' head 
        let currItem = this._hashTable[index]

        if (this._hashTable[index] === undefined) {
            throw new Error('Key error')
            // console.log('Key Error')
        }
        
        // loop through until key is found
        while (currItem.key !== key) {
            currItem = currItem.next
        }

        // return the value of the requested key
        return currItem.value
    }

    // LinkedList Compare:  This function will represent our 'Insert'
    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity
        
        if (loadRatio > HashMapChain.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMapChain.SIZE_RATIO)
        }
        // Find the slot where the key should be in
        const index = this._findSlot(key)

        // set variable for current item
        // LinkedList Compare: we need a currItem to iterate through
        // this._hashTable[index] represents a Node
        let currItem = this._hashTable[index]

        // check if key exists
        // LinkedList Compare: think of this as insertFirst   
        if (!currItem) {
            this.length++

            this._hashTable[index] = {
                key,
                value,
                next: null, // set a pointer so we can point to the next item in a list
                DELETED: false
            }
        } else {
            // LinkedList Compare: think of this as insertLast
            // we need to start at beginning of our 'list' and loop through
            while (currItem.key !== key) {
                // console.log(currItem.key)

                // no more items on the list? insert our 'Node' representation
                if (currItem.next === null) {
                    currItem.next = {
                        key,
                        value,
                        next: null,  // set a pointer so we can point to the next item in a list
                        DELETED: false
                    }
                    this.length++
                    return
                }

                // currItem = currItem.next
                // if (currItem.key === key) {
                //     console.log('updating', key)

                //     currItem.value = value
                //     return
                // }
            }

            // if key receives a new value, update it
            currItem.value = value
        }
    }

    // LinkedList Compare: This is our 'Remove'
    delete(key) {
        // declare a variable for our index based off our key
        const index = this._findSlot(key)
        // this represents our 'Node' head
        let slot = this._hashTable[index]
        // let prevSlot = this._hashTable[index]   // **
        
        while (slot.key !== key && slot) {
            // prevSlot = slot    // **
            slot = slot.next
        }
        
        if (!slot) {
            throw new Error('Key error')
        }
        // prevSlot.next = slot.next  // **
        slot.DELETED = true
        this.length--
        this._deleted++
    }

    _findSlot(key) {
        const hash = HashMapChain._hashString(key)
        const start = hash % this._capacity

        for (let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity

            const slot = this._hashTable[index]
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index
            }
            
            return index            
        }
    }

    // _findSlot(key) {
    //     const hash = HashMap._hashString(key)
    //     const start = hash % this._capacity

    //     for (let i = start; i < start + this._capacity; i++) {
    //         const index = i % this._capacity
    //         const slot = this._hashTable[index]
    //         if (slot === undefined || (slot.key === key && !slot.DELETED)) {
    //             return index
    //         }
    //     }
    // }

    _resize(size) {
        const oldSlots = this._hashTable
        this._capacity = size
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0
        this._deleted = 0
        this._hashTable = []

        for (let slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                while (slot !== null) {
                    this.set(slot.key, slot.value)
                    slot = slot.next
                }
            }
        }
    }

    static _hashString(string) {
        let hash = 5381
        for (let i = 0; i < string.length; i++) {
            // Bitwise, left shift with 5 0s = this would be similar to hash*31
            // 31 being the decent prime number but bit shifting is a faster way
            // to do this tradeoff 
            hash = (hash << 5) + hash + string.charCodeAt(i)
            // converting hash to a 32 bit integer
            hash = hash & hash
        }
        // making sure hash is unsigned - meaning non-negative number
        return hash >>> 0
    }
}
  
  
  
function main() {
    const lotr = new HashMapChain()

    HashMapChain.MAX_LOAD_RATIO = .5
    HashMapChain.SIZE_RATIO = 3

    lotr.set('Hobbit', 'Bilbo')
    lotr.set('Hobbit', 'Frodo')
    lotr.set('Wizard', 'Gandalf')
    lotr.set('Human', 'Aragorn')
    lotr.set('Elf', 'Legolas')
    lotr.set('Maiar', 'The Necromancer')
    lotr.set('Maiar', 'Sauron')
    lotr.set('RingBearer', 'Gollum')
    lotr.set('LadyOfLight', 'Galadriel')
    lotr.set('HalfElven', 'Arwen')
    lotr.set('Ent', 'Treebeard')
    lotr.delete('Wizard', 'Gandalf')
    lotr.delete('RingBearer', 'Gollum')


    console.log('LOTR', lotr); 
    console.log(lotr.get('Maiar')); 
    console.log(lotr.get('Hobbit'));  
    console.log(lotr._capacity); 
    console.log(lotr.get('RingBearer'))

    lotr.display() // See the linked lists
    // console.log(lotr.get('VampireSlayer')) // Check for error handling, Buffy's got her own show
}

main()
