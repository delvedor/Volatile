'use strict'

const tyval = require('tyval')
const remove = require('object.omit')
const writeFile = require('fs').writeFile

const keyVal = tyval.string().min(1).toFunction()
const noop = err => { if (err) throw err }

function Volatile (options) {
  this.options = options || {}
  this.db = {}
}

Volatile.prototype.get = function (key, callback) {
  callback = callback || noop
  if (!keyVal(key)) {
    return callback({ error: 'Key not valid' }, null)
  }
  if (this.db.hasOwnProperty(key)) {
    return callback(null, this.db[key])
  }
  return callback({ error: 'Key not found' }, null)
}

Volatile.prototype.put = function (key, value, callback) {
  callback = callback || noop
  if (!keyVal(key)) {
    return callback({ error: 'Key not valid' })
  }
  this.db[key] = value
  return callback(null)
}

Volatile.prototype.del = function (key, callback) {
  callback = callback || noop
  if (!keyVal(key)) {
    return callback({ error: 'Key not valid' })
  }
  this.db = remove(this.db, key)
  return callback(null)
}

Volatile.prototype.all = function (callback) {
  callback = callback || noop
  const database = this.db
  const databaseIterator = function * () {
    for (let prop in database) {
      yield { key: prop, value: database[prop] }
    }
  }
  return callback(null, databaseIterator)
}

Volatile.prototype.size = function () {
  return Object.keys(this.db).length
}

Volatile.prototype.drop = function (callback) {
  callback = callback || noop
  this.db = {}
  return callback(null)
}

Volatile.prototype.dump = function (name, callback) {
  callback = callback || noop
  let json = `${JSON.stringify(this.db, null, 2)}\n`
  writeFile(`${__dirname}/${name}.json`, json, (err) => {
    callback(err)
  })
}

function builder (options) {
  if (!(this instanceof Volatile)) {
    return new Volatile(options)
  }
}

module.exports = builder
