import { LRU } from "./697 - Least Recently Used";

const cache = new LRU(5);
cache.set("1", 1);
cache.set("2", 10);
cache.set("13", 1);
cache.set("2", 10);
cache.set("3", 1);
cache.set("4", 1);
cache.set("5", 1);
cache.get("3");
cache.get("2");
console.log(cache);
