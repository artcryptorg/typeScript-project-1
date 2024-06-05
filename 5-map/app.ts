type MyKeyType = object | boolean | number | string;
type MyValueType = boolean | number | string
class HashNode {
    key: MyKeyType;
    value: MyValueType;
    next: null | HashNode
    constructor(key: MyKeyType, value: MyValueType, next: null | HashNode = null) {
        this.key = key;
        this.value = value;
        this.next = next
    }
}

class LinkedList {
    private head: HashNode | null;
    constructor() {
        this.head = null
    }

    set(key: MyKeyType, value: MyValueType): void {

        if (!this.head) {
            this.head = new HashNode(key, value)
        } else {
            let currentBucket = this.head;
            while (currentBucket) {
                if (this.keysEqual(key, currentBucket.key)) {
                    currentBucket.value = value;
                    break;
                }
                if (!currentBucket.next) {
                    currentBucket.next = new HashNode(key, value);
                    break;
                }
                currentBucket = currentBucket.next;
            }
        }
    }

    find(key: MyKeyType): MyValueType | undefined {
        let currentBucket = this.head;
        while (currentBucket) {
            if (this.keysEqual(key, currentBucket.key)) {
                return currentBucket.value;
            }
            currentBucket = currentBucket.next;
        }
        return undefined;
    }

    remove(key: MyKeyType): boolean {
        let currentBucket = this.head;
        let prev: HashNode | null = null;

        while (currentBucket) {
            if (this.keysEqual(currentBucket.key, key)) {
                if (prev) {
                    prev.next = currentBucket.next;
                } else {
                    this.head = currentBucket.next;
                }
                return true;
            }
            prev = currentBucket;
            currentBucket = currentBucket.next;
        }
        return false;
    }

    isEmpty(): boolean {
        return this.head === null;
    }


    private keysEqual(key1: MyKeyType, key2: MyKeyType): boolean {
        if (typeof key1 === 'object' && typeof key2 === 'object') {
            return JSON.stringify(key1) === JSON.stringify(key2);
        }
        return key1 === key2;
    }
}


class MyHashMap {
    private size: number;
    private buckets: (LinkedList | null)[];
    constructor(size: number = 100) {
        this.size = size;
        this.buckets = Array(size).fill(null);
    }

    private hash(key: MyKeyType): number {
        let strKey: string;
        let hash = 0;
        if (typeof key === 'object') {
            strKey = JSON.stringify(key);
        } else { strKey = String(key) }
        for (let i = 0; i < strKey.length; i++) {
            hash += strKey.charCodeAt(i);
        }
        return hash % this.size;
    }

    add(key: MyKeyType, value: MyValueType): void {
        const index = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = new LinkedList();
        }
        this.buckets[index]!.set(key, value);
    }

    get(key: MyKeyType): MyValueType | undefined {
        const index = this.hash(key);
        if (this.buckets[index] === null) {
            return undefined;
        }
        return this.buckets[index]?.find(key);
    }

    delete(key: MyKeyType): boolean {
        const index = this.hash(key);
        if (this.buckets[index] === null) {
            return false;
        }
        const result = this.buckets[index]!.remove(key);
        if (this.buckets[index]!.isEmpty()) {
            this.buckets[index] = null;
        }
        return result;
    }
    clear(): void {
        this.buckets = Array(this.size).fill(null)
    }

}