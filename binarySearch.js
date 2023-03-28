function binary_search(x, sorted_collection, low = 0, high = null) {
  if (high === null) {
    high = sorted_collection.length;
  } else if (high < 0) {
    throw new RangeError('High index out of range');
  }

  if (low > high) return null;

  const mid = Math.floor((high + low) / 2);
  const value = sorted_collection[mid]; // middle of the array 
  if (value == x) {
    // return the current index
    return mid;
  } else if (value > x) {
    // [1, 2, 3, 4, 5, <--| 6, 7, 8, 9, 10]
    // this means we need to check all values to the left of the middle
    // so we set the high to the middle - 1 becuase we have already checked the middle
    return binary_search(x, sorted_collection, low, mid - 1);
  } else {
        // [1, 2, 3, 4, 5, |--> 6, 7, 8, 9, 10]
    // we need to check the right hand side of the array
    // so we set the low to the middle + 1 because we have already checked the middle
    return binary_search(x, sorted_collection, mid + 1, high);
  }
}

// Don't change anything below this line ;)

const tests = [
  {
    find: 1,
    collection: [],
    expected: null
  },
  {
    find: 1,
    collection: [1],
    expected: 0
  },
  {
    find: 2,
    collection: [1],
    expected: null
  },
  {
    find: 1,
    collection: [1, 2],
    expected: 0
  },
  {
    find: 2,
    collection: [1, 2],
    expected: 1
  },
  {
    find: 3,
    collection: [1, 2, 3],
    expected: 2
  },
  {
    find: 1,
    collection: [1, 2, 3, 4],
    expected: 0
  },
  {
    find: 2,
    collection: [1, 2, 3, 4],
    expected: 1
  },
  {
    find: 3,
    collection: [1, 2, 3, 4],
    expected: 2
  },
  {
    find: 4,
    collection: [1, 2, 3, 4],
    expected: 3
  },
  {
    find: 1,
    collection: [1, 2, 3, 4, 5],
    expected: 0
  },
  {
    find: 2,
    collection: [1, 2, 3, 4, 5],
    expected: 1
  },
  {
    find: 3,
    collection: [1, 2, 3, 4, 5],
    expected: 2
  },
  {
    find: 4,
    collection: [1, 2, 3, 4, 5],
    expected: 3
  },
  {
    find: 5,
    collection: [1, 2, 3, 4, 5],
    expected: 4
  },
  {
    find: 99,
    collection: [1, 2, 3, 4, 5],
    expected: null
  }
];

const results = tests.map(function(test) {
  try {
    const result = binary_search(test['find'], test['collection']);
    test.result = result;
    test.success = result == test['expected'];
  } catch (ex) {
    test.result = ex.message;
    test.success = false;
  }

  return test
});

console.table(results);