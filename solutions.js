
function groupBy(array, key) {
  const grouped = {};

  for (const item of array) {
    const groupName = item[key];

    if (!grouped[groupName]) {
      grouped[groupName] = [];
    }

    grouped[groupName].push(item);
  }

  return grouped;
}

const users = [
  { name: "Ada", city: "Aba" },
  { name: "Obi", city: "Enugu" },
  { name: "Ngozi", city: "Aba" },
];

console.log("groupBy example:", groupBy(users, "city"));

const workers = [
  { name: "Ife", role: "Developer" },
  { name: "Tobi", role: "Designer" },
  { name: "Amaka", role: "Developer" },
];

console.log("groupBy extra test:", groupBy(workers, "role"));



function flatten(array) {
  const result = [];

  for (const item of array) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

console.log("flatten example:", flatten([1, [2, [3, [4]]], 5]));
console.log("flatten extra test:", flatten([[], 7, [8, [9]], 10]));


// 3. groupAnagrams
// Tested with the assignment's words and an extra group of words.
function groupAnagrams(words) {
  const groups = {};

  for (const word of words) {
    const sortedLetters = word.toLowerCase().split("").sort().join("");

    if (!groups[sortedLetters]) {
      groups[sortedLetters] = [];
    }

    groups[sortedLetters].push(word);
  }

  return Object.values(groups);
}

console.log(
  "groupAnagrams example:",
  groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
);
console.log(
  "groupAnagrams extra test:",
  groupAnagrams(["arc", "car", "elbow", "below"])
);


// 4. once
// Tested by calling the returned function twice and checking that the original function runs once.
function once(fn) {
  let hasRun = false;
  let savedResult;

  return function (...args) {
    if (!hasRun) {
      savedResult = fn(...args);
      hasRun = true;
    }

    return savedResult;
  };
}


let setupCount = 0;
const init = once(() => {
  setupCount += 1;
  console.log("set up");
  return 42;
});

console.log("once first call:", init());
console.log("once second call:", init());
console.log("once extra test, original function runs once:", setupCount === 1);



function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}


const search = debounce((text) => {
  console.log("Search for:", text);
}, 300);

search("tai");
search("tail");
search("tailwind");


const testDebounce = debounce((value) => {
  console.log("debounce extra test:", value);
}, 100);

testDebounce("first");
testDebounce("second");



console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");





async function retry(fn, times) {
  let lastError;

  for (let attempt = 1; attempt <= times; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

let fetchAttempts = 0;

async function fetchData() {
  fetchAttempts += 1;

  if (fetchAttempts < 3) {
    throw new Error("Temporary problem");
  }

  return "Data loaded";
}

async function testRetry() {
  console.log("retry example:", await retry(fetchData, 3));

  let extraAttempts = 0;
  async function alwaysFails() {
    extraAttempts += 1;
    throw new Error("Still failing");
  }

  try {
    await retry(alwaysFails, 2);
  } catch (error) {
    console.log("retry extra test:", error.message, "attempts:", extraAttempts);
  }
}

testRetry();



function sortPeople(people) {
  return [...people].sort((personA, personB) => {
    if (personA.age !== personB.age) {
      return personB.age - personA.age;
    }

    return personA.name.localeCompare(personB.name);
  });
}

const people = [
  { name: "Chika", age: 25 },
  { name: "Ade", age: 30 },
  { name: "Bola", age: 25 },
];

console.log("sort example:", sortPeople(people));

const morePeople = [
  { name: "Zara", age: 22 },
  { name: "Ada", age: 22 },
  { name: "Kunle", age: 29 },
];

console.log("sort extra test:", sortPeople(morePeople));
console.log("original array remains unchanged:", people[0].name === "Chika");
