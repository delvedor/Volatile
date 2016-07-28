'use strict'

const tap = require('tap')
const test = tap.test
const fs = require('fs')
const db = require('../volatile')

test('volatile', (t) => {
  t.plan(1)
  t.is(typeof db, 'object')
})

test('put', (t) => {
  t.plan(3)
  t.is(typeof db.put, 'function')
  db.put('key1', 'value1', (err) => {
    t.is(err, null)
  })
  db.put('key2', 'value2', (err) => {
    t.is(err, null)
  })
})

test('get', (t) => {
  t.plan(8)
  t.is(typeof db.get, 'function')
  db.get('key1', (err, value) => {
    t.is(err, null)
    t.is(value, 'value1')
  })
  db.get('key2', (err, value) => {
    t.is(err, null)
    t.is(value, 'value2')
  })
  db.get('key3', (err, value) => {
    t.is(typeof err, 'object')
    t.is(err.error, 'Key not found')
    t.is(value, null)
  })
})

test('size', (t) => {
  t.plan(3)
  t.is(typeof db.size, 'function')
  t.is(typeof db.size(), 'number')
  t.is(db.size(), 2)
})

test('all', (t) => {
  t.plan(2 + (db.size() * 2))
  t.is(typeof db.all, 'function')
  db.all((err, iterable) => {
    if (err) console.log(err)
    t.is(typeof iterable, 'function')
    for (let prop of iterable()) {
      t.is(typeof prop.key, 'string')
      t.is(typeof prop.value, 'string')
    }
  })
})

test('dump', (t) => {
  t.plan(3)
  t.is(typeof db.dump, 'function')
  db.dump('testdb', (err1) => {
    err1 ? t.fail() : t.pass()
    fs.access(`${__dirname}/../testdb.json`, fs.F_OK, (err2) => {
      err2 ? t.fail() : t.pass()
      fs.unlink(`${__dirname}/../testdb.json`, (err3) => {
        if (err3) console.log(err3)
      })
    })
  })
})

test('del', (t) => {
  t.plan(2)
  t.is(typeof db.del, 'function')
  db.del('key1', (err1) => {
    if (err1) console.log(err1)
    db.get('key1', (err2, value) => {
      t.is(err2.error, 'Key not found')
    })
  })
})

test('drop', (t) => {
  t.plan(2)
  t.is(typeof db.drop, 'function')
  db.drop((err1) => {
    if (err1) console.log(err1)
    db.get('key2', (err2, value) => {
      err2 ? t.pass() : t.fail()
    })
  })
})

