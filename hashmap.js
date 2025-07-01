const { LinkedList, Node } = require("../odin-linkedlist/linkedlist.js");

class HashMap {
  constructor() {
    this.loadfactor = 0.75;
    this.capacity = 0;
    this.size = 16;
    this.buckets = [];
  }

  keyIndex(key) {
    const index = hash(key) % this.size;
    return index;
  }

  addCapacity() {
    this.capacity++;
    let loadCapacity = this.size * this.loadfactor;
    // console.log(this.capacity/this.size);
    if (this.capacity > loadCapacity) {
      this.growArray();
    }
  }

  getCapacity() {
    console.log(`Current capacity: ${this.capacity}, Current load: ${this.capacity/this.size}`)
  }

  growArray() {
    this.size *= 2;
    let entries = this.entries();
    this.clear();
    for (let i = 0; i < entries.length; i++) {
      let text = entries[i].replace(/[^\w\s,]/g, "");
      let splitText = text.split(",");
      let key = splitText[0].trim();
      let value = splitText[1].trim();
      this.set(key, value);
    }
  }

  set(key, value) {
    const keyIndex = this.keyIndex(key);
    let object = {
      key: key,
      value: value,
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
    this.addCapacity();
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
      return false;
    } else if (this.buckets[keyIndex]?.findKey(key) != "Key not found") {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    if (!this.has(key)) {
      return false;
    } else {
      const keyIndex = this.keyIndex(key);
      let index = this.buckets[keyIndex].findKey(key);
      this.buckets[keyIndex].removeAt(index);
      return true;
    }
  }

  length() {
    let n = 0;
    for (let i = 0; i < this.size; i++) {
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
    for (let i = 0; i < this.size; i++) {
      let isEmpty = this.buckets[i]?.getSize();
      if (isEmpty != undefined) {
        let currentNode = this.buckets[i].head;
        while (currentNode !== null) {
          let nodeKey = currentNode.value.key;
          if (nodeKey != null) {
            array.push(nodeKey);
          }
          currentNode = currentNode.next;
        }
      }
    }
    return array;
  }

  values() {
    let array = [];
    for (let i = 0; i < this.size; i++) {
      let isEmpty = this.buckets[i]?.getSize();
      if (isEmpty != undefined) {
        let currentNode = this.buckets[i].head;
        while (currentNode !== null) {
          let nodeKey = currentNode.value.key;
          let nodeValue = currentNode.value.value;
          if (nodeKey != null) {
            array.push(nodeValue);
          }
          currentNode = currentNode.next;
        }
      }
    }
    return array;
  }

  entries() {
    let array = [];
    for (let i = 0; i < this.size; i++) {
      let isEmpty = this.buckets[i]?.getSize();
      if (isEmpty != undefined) {
        let currentNode = this.buckets[i].head;
        while (currentNode !== null) {
          let nodeKey = currentNode.value.key;
          let nodeValue = currentNode.value.value;
          if (nodeKey != null) {
            array.push(`[${nodeKey}, ${nodeValue}]`);
          }
          currentNode = currentNode.next;
        }
      }
    }
    return array;
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