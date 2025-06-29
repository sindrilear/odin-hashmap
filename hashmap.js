const {LinkedList, Node } = require('../odin-linkedlist/linkedlist.js');

class HashMap {
  constructor() {
    this.loadfactor = 0.8;
    this.capacity = 0;
    this.size = 16;
    this.buckets = [];
  }

  keyIndex(key) {
    const index = hash(key) % this.size;
    return index;
  }
  
  set(key, value) {
    const keyIndex = this.keyIndex(key);
    let object = {
      key: key,
      value: value
    };
    if (this.buckets[keyIndex] === undefined) {
      const bucketlist = new LinkedList();
      bucketlist.append(object);
      this.buckets[keyIndex] = bucketlist;
    } else {
      const index = this.buckets[keyIndex].findKey(key);
      if (index !== "Key not found") {
        this.buckets[keyIndex].index(index).value.value = value;
      } else {
        this.buckets[keyIndex].append(object);
      }
    }
  }

  get(key) {
     const keyIndex = this.keyIndex(key);
     if (this.buckets[keyIndex].findKey(key) != "Key not found") {
      let linkedIndex = this.buckets[keyIndex].findKey(key);
      return this.buckets[keyIndex].index(linkedIndex).value.value;
    } else {
      return null;
    }
  }

  has(key) {
    const keyIndex = this.keyIndex(key);

    if (!this.buckets[keyIndex]) {
      return false
    } else if ( this.buckets[keyIndex]?.findKey(key) != "Key not found") {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    if (!this.has(key)) {
      return false;
    } else {
      const keyIndex = this.keyIndex(key)
      let index = this.buckets[keyIndex].findKey(key);
      this.buckets[keyIndex].removeAt(index);
      return true;
    }
  }

  length() {
    let n = 0;
    for (let i = 0; i < this.size; i ++) {
      let size = this.buckets[i]?.getSize();
      if (size != undefined) {
        n += size;
      }
    }
    return n;
  }

  clear() {
    this.buckets = [];
  }

  keys() {
    let array = [];
    for (i = 0; i < this.size; i ++) {
      let isEmpty = this.buckets[i]?.getSize();
      if (isEmpty != undefined) {

      }
    }
  }
}

function hash(key) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
  }

  return hashCode;
}

const test = new HashMap();
test.set('apple', 'red')
console.log(test.get("apple"));
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
console.log(test.get("banana"));
console.log(test.has("orange"));
console.log(test.remove("apple"))
console.log(test.get("apple"));
console.log(test.length())
test.clear();
console.log(test.length())



// test.set('carrot', 'orange')
// test.set('dog', 'brown')
// test.set('elephant', 'gray')
// test.set('frog', 'green')
// test.set('grape', 'purple')
// test.set('hat', 'black')
// test.set('ice cream', 'white')
// test.set('jacket', 'blue')
// test.set('kite', 'pink')
// test.set('lion', 'golden')
// console.log(hash("dog") % 16);
// console.log(test.get("dog"));
// console.log(test.buckets[12]);