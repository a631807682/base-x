# base-x

[![NPM Package](https://img.shields.io/npm/v/base-x.svg?style=flat-square)](https://www.npmjs.org/package/base-x)
[![Build Status](https://img.shields.io/travis/cryptocoinjs/base-x.svg?branch=master&style=flat-square)](https://travis-ci.org/cryptocoinjs/base-x)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Fast base encoding / decoding of any given alphabet using bitcoin style leading
zero compression.

This is forked from cryptocoinjs/base-x

Available to both node and the browser

Uses Uint8array in browser

## Example

Browser Base58

``` html
<script src="./base-x.js"></script>
```

``` javascript
var BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
var bs58 = base(BASE58)

var enc = new TextEncoder(); // always utf-8
var arr = enc.encode("This is a string converted to a Uint8Array")
var encStr = bs58.encode(arr)
console.log(encStr)
// => 2QhwuRSWNgihbi1b3haxQ4CqCsN4QVH5USDWNmRWSSAmqwPAf1RnJfErKz

var dec = new TextDecoder();
var decArr = bs58.decode(encStr)
console.log(decArr)
// => Uint8Array(42) [84, 104, 105, 115, 32, 105, 115, 32, 97, 32, 115, 116, 114, 105, 110, 103, 32, 99, 111, 110, 118, 101, 114, 116, 101, 100, 32, 116, 111, 32, 97, 32, 85, 105, 110, 116, 56, 65, 114, 114, 97, 121]
var orign = dec.decode(decArr)
console.log(orign)
// => This is a string converted to a Uint8Array
```


Nodejs Base58

``` javascript
var BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
var bs58 = require('base-x')(BASE58)

var decoded = bs58.decode('5Kd3NBUAdUnhyzenEwVLy9pBKxSwXvE9FMPyR4UKZvpe6E3AgLr')

console.log(decoded)
// => <Buffer 80 ed db dc 11 68 f1 da ea db d3 e4 4c 1e 3f 8f 5a 28 4c 20 29 f7 8a d2 6a f9 85 83 a4 99 de 5b 19>

console.log(bs58.encode(decoded))
// => 5Kd3NBUAdUnhyzenEwVLy9pBKxSwXvE9FMPyR4UKZvpe6E3AgLr
```

### Alphabets

See below for a list of commonly recognized alphabets, and their respective base.

Base | Alphabet
------------- | -------------
2 | `01`
8 | `01234567`
11 | `0123456789a`
16 | `0123456789abcdef`
32 | `0123456789ABCDEFGHJKMNPQRSTVWXYZ`
36 | `0123456789abcdefghijklmnopqrstuvwxyz`
58 | `123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz`
62 | `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
64 | `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`
66 | `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~`


## How it works

It encodes octet arrays by doing long divisions on all significant digits in the
array, creating a representation of that number in the new base. Then for every
leading zero in the input (not significant as a number) it will encode as a
single leader character. This is the first in the alphabet and will decode as 8
bits. The other characters depend upon the base. For example, a base58 alphabet
packs roughly 5.858 bits per character.

This means the encoded string 000f (using a base16, 0-f alphabet) will actually decode
to 4 bytes unlike a canonical hex encoding which uniformly packs 4 bits into each
character.

While unusual, this does mean that no padding is required and it works for bases
like 43. **If you need standard hex encoding, or base64 encoding, this module is NOT
appropriate.**

The algorithm used to convert the base of the number is roughly this:

```python
significant =  12345
base = 16
digits = []
while significant > base:
  significant, remainder = divmod(significant, base)
  digits.append(remainder)
digits.append(significant)
assert list(reversed(digits)) == [3,0,3,9]
assert hex(12345) == '0x3039'
```

Of course the input is actually an array of digits already :)

## LICENSE [MIT](LICENSE)
