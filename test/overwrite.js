'use strict'

const tap = require('tap')
const test = tap.test
const tyval = require('tyval')
const db = require('../volatile')({ overwrite: false })
const notNull = tyval.object().notNull().toFunction()

test('put !overwrite', (t) => {
  t.plan(3)
  db.put('key1', 'value1', (err) => {
    t.is(err, null)
  })
  db.put('key1', 'value2', (err) => {
    t.true(notNull(err))
    t.is(err.error, 'Key already exists')
  })
})
