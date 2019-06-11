var basex = window.base
var tape = window.tape
var fixtures = window.readJSON('test/fixtures.json')

var bases = Object.keys(fixtures.alphabets).reduce(function (bases, alphabetName) {
  bases[alphabetName] = basex(fixtures.alphabets[alphabetName])
  return bases
}, {})

function fromHexString (hexString) {
  if (!hexString) return new Uint8Array(0)
  return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
}

function buf2hex (buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('')
}

function isBuffer (source) {
  return source instanceof Uint8Array
}

fixtures.valid.forEach(function (f) {
  tape.test('can encode ' + f.alphabet + ': ' + f.hex, function (t) {
    var base = bases[f.alphabet]
        // var actual = base.encode(Buffer.from(f.hex, 'hex'))
    var actual = base.encode(fromHexString(f.hex))

    t.plan(1)
    t.same(actual, f.string)
  })
})

fixtures.valid.forEach(function (f) {
  tape.test('can decode ' + f.alphabet + ': ' + f.string, function (t) {
    var base = bases[f.alphabet]
        // var actual = base.decode(f.string).toString('hex')
    var actual = buf2hex(base.decode(f.string))

    t.plan(1)
    t.same(actual, f.hex)
  })
})

fixtures.invalid.forEach(function (f) {
  tape.test('decode throws on ' + f.description, function (t) {
    var base = bases[f.alphabet]

    t.plan(1)
    t.throws(function () {
      if (!base) base = basex(f.alphabet)

      base.decode(f.string)
    }, new RegExp(f.exception))
  })
})

tape.test('decode should return Buffer', function (t) {
  t.plan(2)
  t.true(isBuffer(bases.base2.decode('')))
  t.true(isBuffer(bases.base2.decode('01')))
})

tape.test('encode throws on string', function (t) {
  var base = bases.base58

  t.plan(1)
  t.throws(function () {
    base.encode('a')
  }, new RegExp('^TypeError: Expected Buffer$'))
})
