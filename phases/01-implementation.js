class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    if (this.count / this.capacity > 0.7) this.resize();

    const index = this.hashMod(key);

    let currentPair = this.data[index];

    while (currentPair && currentPair.key !== key) {
      currentPair = currentPair.next;
    }

    if (currentPair) {
      currentPair.value = value;
    } else {
      const newPair = new KeyValuePair(key, value);
      newPair.next = this.data[index];
      this.data[index] = newPair;
      this.count++;
    }
  }


  read(key) {
    const index = this.hashMod(key);

    let currentPair = this.data[index];

    while (currentPair) {
      if (currentPair.key == key) {
        return currentPair.value;
      }
      currentPair = currentPair.next;
    }

    return undefined;
  }


  resize() {
    const oldData = this.data;

    this.capacity = 2 * this.capacity;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;

    let currentPair = null;

    for (let i = 0; i < oldData.length; i++) {
      currentPair = oldData[i];

      while (currentPair) {
        this.insert(currentPair.key, currentPair.value);

        currentPair = currentPair.next;
      }
    }
  }

  // !true -> false
  // !false -> true
  delete(key) {
    const index = this.hashMod(key);

    let currentPair = this.data[index];
    let lastPair = null;

    while (currentPair && currentPair.key !== key) {
      lastPair = currentPair;
      currentPair = currentPair.next;
    }

    if (!currentPair) {
      return "Key not found"
    } else {

      if (!lastPair) {
        // Remove first element in LL
        this.data[index] = currentPair.next;
      } else {
        lastPair.next = currentPair.next;
      }
      this.count--;
    }
  }
}


module.exports = HashTable;
