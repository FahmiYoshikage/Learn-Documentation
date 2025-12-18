# Dasar JavaScript

## Variables

JavaScript memiliki 3 cara declare variable:

```javascript
// var - old way, hindari penggunaan
var name = 'John';

// let - bisa diubah
let age = 25;
age = 26; // OK

// const - tidak bisa diubah
const PI = 3.14;
// PI = 3.15; // Error!
```

::: tip Rekomendasi
Gunakan `const` by default, `let` jika perlu ubah value, hindari `var`.
:::

## Data Types

```javascript
// Primitive types
const string = 'Hello';
const number = 42;
const boolean = true;
const nullValue = null;
const undefinedValue = undefined;

// Object types
const array = [1, 2, 3];
const object = { name: 'John', age: 25 };
const func = function () {
    return 'Hello';
};
```

## Functions

### Function Declaration

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}
```

### Arrow Function

```javascript
const greet = (name) => {
    return `Hello, ${name}!`;
};

// Shorthand untuk single expression
const greet = (name) => `Hello, ${name}!`;
```

::: warning Perbedaan
Arrow function tidak memiliki `this` binding sendiri!
:::

## Template Literals

```javascript
const name = 'John';
const age = 25;

// Old way
const message = 'My name is ' + name + ' and I am ' + age + ' years old';

// Template literal (lebih baik!)
const message = `My name is ${name} and I am ${age} years old`;

// Multi-line
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;
```

## Destructuring

### Array Destructuring

```javascript
const colors = ['red', 'green', 'blue'];

// Old way
const first = colors[0];
const second = colors[1];

// Destructuring
const [first, second, third] = colors;
```

### Object Destructuring

```javascript
const user = {
    name: 'John',
    age: 25,
    email: 'john@example.com',
};

// Old way
const name = user.name;
const age = user.age;

// Destructuring
const { name, age, email } = user;

// Dengan alias
const { name: userName, age: userAge } = user;
```

## Spread Operator

```javascript
// Array
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Object
const user = { name: 'John', age: 25 };
const updatedUser = { ...user, age: 26 }; // { name: 'John', age: 26 }

// Copy array/object
const copy = [...arr1];
const userCopy = { ...user };
```

## Resources

-   [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
-   [JavaScript.info](https://javascript.info/)
