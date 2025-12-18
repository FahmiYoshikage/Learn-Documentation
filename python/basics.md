# Dasar Python

## Variables & Types

```python
# Variables (no need to declare type)
name = "John"
age = 25
height = 1.75
is_student = True

# Type hints (optional, tapi recommended)
name: str = "John"
age: int = 25
height: float = 1.75
is_student: bool = True
```

## String Formatting

```python
name = "John"
age = 25

# f-strings (Python 3.6+, recommended!)
message = f"My name is {name} and I am {age} years old"

# format method
message = "My name is {} and I am {} years old".format(name, age)

# % operator (old way)
message = "My name is %s and I am %d years old" % (name, age)
```

## Lists

```python
# Create list
fruits = ["apple", "banana", "orange"]

# Access
first = fruits[0]
last = fruits[-1]  # negative index from end

# Slice
first_two = fruits[0:2]  # ['apple', 'banana']
first_two = fruits[:2]   # same

# Add
fruits.append("grape")
fruits.insert(1, "mango")

# Remove
fruits.remove("banana")
popped = fruits.pop()  # remove & return last

# Loop
for fruit in fruits:
    print(fruit)

# With index
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
```

## Dictionaries

```python
# Create dict
user = {
    "name": "John",
    "age": 25,
    "email": "john@example.com"
}

# Access
name = user["name"]
age = user.get("age")  # safer, returns None if not exist

# Add/Update
user["city"] = "Jakarta"
user["age"] = 26

# Remove
del user["email"]
popped = user.pop("city")

# Loop
for key, value in user.items():
    print(f"{key}: {value}")
```

## Functions

```python
# Basic function
def greet(name):
    return f"Hello, {name}!"

# With type hints
def greet(name: str) -> str:
    return f"Hello, {name}!"

# Default parameter
def greet(name: str = "World") -> str:
    return f"Hello, {name}!"

# Multiple return values
def get_user():
    return "John", 25, "john@example.com"

name, age, email = get_user()

# *args and **kwargs
def sum_all(*args):
    return sum(args)

sum_all(1, 2, 3, 4)  # 10

def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="John", age=25)
```

## Classes

```python
class User:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

    def greet(self) -> str:
        return f"Hello, I'm {self.name}"

    def __str__(self) -> str:
        return f"User(name={self.name}, age={self.age})"

# Usage
user = User("John", 25)
print(user.greet())  # Hello, I'm John
print(user)          # User(name=John, age=25)
```

## Exception Handling

```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
else:
    print("Success!")
finally:
    print("This always runs")
```

## File Operations

```python
# Read file
with open("file.txt", "r") as f:
    content = f.read()

# Write file
with open("file.txt", "w") as f:
    f.write("Hello, World!")

# Append
with open("file.txt", "a") as f:
    f.write("\nNew line")

# Read lines
with open("file.txt", "r") as f:
    lines = f.readlines()
    for line in lines:
        print(line.strip())
```

::: tip with statement
Gunakan `with` untuk file operations, otomatis close file setelah selesai!
:::
