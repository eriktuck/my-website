---
title: "1 is 1 in Python"
date: 2025-03-13T10:00:00-05:00
draft: false
summary: "A case study on the importance of a hacker mindset for new coders"
tags: ["Python"]
image: https://storage.googleapis.com/ei-dev-assets/assets/photo-1586776977607-310e9c725c37.avif
image-credit: Photo by [Ken Suarez](https://unsplash.com/@kensuarez?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/black-and-white-computer-keyboard-4IxPVkFGJGI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
---

Curiosity is one of the more important attributes you can have as a new coder. It is probably what brought you to coding in the first place. Some call it a "hacker mindset". A hacker mindset is not about breaking into systems, but rather about deeply understanding how things work and then experimenting to improve, repurpose (and sometimes subvert) them in unexpected ways.

Let's use a basic coding task, testing equality, to see how important the hacker mindset can be.
## testing equality
Testing equality is one of the first things new coders learn. Is the variable `foo` equal to the variable `bar`? This seemingly simple task is used to create conditions for `if` statements, filter data, and other tasks. It is surprisingly easy to get wrong.

First, we must distinguish between the assignment operator (`=`) and the equality operator (`==`).

```python
foo = bar
```

and 

```python
foo == bar
```

are very different statements. The first assigns the variable `bar` to the variable `foo`. The second tests whether the value of `foo` is equal to the value of `bar`. 

Next, we must introduce the syntax `is`. 

```python
foo is bar
```

will return `True` if the variables `foo` and `bar` point to the same object. Otherwise it returns `False`.

> What do I mean "point to the same object"? Try using your favorite LLM to ask "How do variable pointers work in Python?" to flex your hacker mindset even further.

As an aside, you should always use `is` to test whether two statements both return  `None` (i.e., are undefined) in Python. While `foo == None` will return `True` when `foo` is `None`, it is both more performant and more "pythonic" to write `foo is None`. It is recommended by [PEP8](https://peps.python.org/pep-0008/#programming-recommendations), the Python "style-guide" (which is a great resource with which to familiarize yourself). Packages like `numpy` overwrite the `__eq__` operator causing `foo == None` to return a `ValueError` if `foo` is an instance of a `numpy` array. See [this discussion](https://stackoverflow.com/questions/14247373/python-none-comparison-should-i-use-is-or) on Stack Overflow for even more details.

Let's create two variables

```python
foo = 2
bar = 2
```

Clearly we can see that both `foo` and `bar` have the same value.

Let's test the equality of `foo` and `bar`. First with the equality operator. 

```python
foo == bar
>>> True
```

Now with the identity operator.

```python
foo is bar
>>> True
```

Both return `True`, as we might (naively) expect. 

Let's try two different values.

```python
foo = 257
bar = 257

# test equality
foo == bar
>>> True

# test identity
foo is bar
>>> False
```

Well that is surprising! The identify operator `is` works for the integer `2` but not the integer `257`.

What about different data types like integers and floating point numbers?

```python
foo = 2
bar = 2.0

foo == bar
>>> True

foo is bar
>>> False
```

Surprised again! The integer `2` is equal to the floating point number `2.0` when using the equality operator `==` but the identity operator `is` says they are not the same.
## understanding Python's integer interning
What is happening relates to the way that Python is implemented, specifically how CPython is implemented. CPython is the most widely used implementation of Python written in the programming language C. In CPython, integers between `-5` and `256` are interned, meaning they are stored in a shared memory pool. This optimizes memory usage and execution speed because these values are used so often.

From the [documentation](https://docs.python.org/3/c-api/long.html):

> “The current implementation keeps an array of integer objects for all integers between `-5` and `256`. When you create an int in that range you actually just get back a reference to the existing object.”

When both `foo` and `bar` are assigned the integer `2`, the statement 

```python
foo is bar
```

only returns `True` due to this idiosyncrasy of CPython’s implementation. This statement would return `False` for many other integers (and potentially in other Python implementations like IPython).

We can see how this works by referencing the `id` of each variable and integer.

```python
foo = 2
print(id(foo))
```

You should see a number like `2183110603952`. That represents the location in memory of the variable `foo`.

The `id` of `2` will return the same number.

```python
print(id(2))
```

However, for numbers outside this range, CPython does not guarantee interning. Check the `id` of any integer outside of this range to test this.

```python
bar = 257
print(id(bar))
print(id(257))
```

You should see that the `id` of `bar` and `257` are different. Thus, `bar` and `257` are not stored in the same location despite being the same number, and so the `is` operator will tell you, correctly, that they are not the same object!

As we saw above, floating point numbers are not interned in CPython, which is why `2 is 2.0` returned `False`.

> Often in error messages you will see the location of a variable in memory shown as a hexadecimal. To see the hexadecimal of a variable, use `hex(id(a_int))`. You’ll see something like `0x1fc4b8834b0`.
## takeaway
The takeaway is this:
- Always use `is` to check against an object's identity or to compare to singletons like `None`.
- Always use `==` to check if two values are the same.

Importantly, never rely on the `is` operator when checking the equality of integers, regardless of whether they are stored in the same location in memory or not. That is an implementation detail and cannot be relied upon.

While you can learn these types of rules and best practices by simply reading and following the [PEP8](https://peps.python.org/pep-0008/#introduction) standard and the documentation of any Python packages you use, I think it is worthwhile to understand the *why* behind these recommendations. This type of curiosity is especially important when you are "in the weeds" debugging particularly challenging code errors. 

Hopefully, this walk through encouraged you to adopt a hacker mindset and level up your coding!