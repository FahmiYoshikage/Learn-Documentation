# Array Methods

Array methods yang sering digunakan dalam JavaScript.

## map()

Transform setiap element dalam array:

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Contoh dengan object
const users = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
];
const names = users.map((user) => user.name);
console.log(names); // ['John', 'Jane']
```

## filter()

Filter array berdasarkan kondisi:

```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6]

// Filter object
const users = [
    { name: 'John', age: 25, active: true },
    { name: 'Jane', age: 30, active: false },
    { name: 'Bob', age: 35, active: true },
];
const activeUsers = users.filter((user) => user.active);
```

## find()

Cari element pertama yang match:

```javascript
const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
];

const user = users.find((u) => u.id === 2);
console.log(user); // { id: 2, name: 'Jane' }
```

## reduce()

Reduce array menjadi single value:

```javascript
// Sum
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

// Group by
const users = [
    { name: 'John', role: 'admin' },
    { name: 'Jane', role: 'user' },
    { name: 'Bob', role: 'admin' },
];

const grouped = users.reduce((acc, user) => {
    if (!acc[user.role]) {
        acc[user.role] = [];
    }
    acc[user.role].push(user);
    return acc;
}, {});

console.log(grouped);
// {
//   admin: [{ name: 'John', ... }, { name: 'Bob', ... }],
//   user: [{ name: 'Jane', ... }]
// }
```

## forEach()

Loop dengan side effects:

```javascript
const numbers = [1, 2, 3];
numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});
```

::: warning forEach vs map

-   `forEach()` untuk side effects (tidak return value)
-   `map()` untuk transform array (return new array)
    :::

## some() & every()

```javascript
const numbers = [1, 2, 3, 4, 5];

// some() - minimal 1 yang true
const hasEven = numbers.some((num) => num % 2 === 0);
console.log(hasEven); // true

// every() - semua harus true
const allPositive = numbers.every((num) => num > 0);
console.log(allPositive); // true
```

## Chaining Methods

Combine multiple methods:

```javascript
const users = [
    { name: 'John', age: 25, active: true },
    { name: 'Jane', age: 30, active: false },
    { name: 'Bob', age: 35, active: true },
    { name: 'Alice', age: 28, active: true },
];

const result = users
    .filter((user) => user.active) // Filter active users
    .map((user) => ({ ...user, age: user.age + 1 })) // Add 1 to age
    .sort((a, b) => a.age - b.age) // Sort by age
    .map((user) => user.name); // Get names only

console.log(result); // ['John', 'Alice', 'Bob']
```

::: tip Performance
Chain methods itu readable, tapi ingat setiap method loop array. Untuk array besar, pertimbangkan single loop dengan reduce.
:::
