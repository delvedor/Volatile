'use strict'

const tyval = require('tyval')
const remove = require('object.omit')
const safeStringify = require('fast-safe-stringify')
const writeFile = require('fs').writeFile

const keyVal = tyval.string().min(1).toFunction()
const overwriteVal = tyval.boolean().toFunction()
const noop = err => { if (err) throw err }

/**
 * Volatile constructor
 * @param {Object}    options    [volatile options]
 */
function Volatile (options) {
  this.options = options || {}
  if (!overwriteVal(this.options.overwrite)) {
    this.options.overwite = true
  }
  this.db = {}
}

/**
 * Gets a value from the db
 * @param {String}      key         [key to get]
 * @param {Function}    callback    [callback with error and result]
 */
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

/**
 * Puts a new value in the db
 * @param {String}      key         [key to save]
 * @param {Any}         value       [value to save]
 * @param {Function}    callback    [callback with error if any]
 */
Volatile.prototype.put = function (key, value, callback) {
  callback = callback || noop
  if (!keyVal(key)) {
    return callback({ error: 'Key not valid' })
  }
  if (this.options.overwite) {
    this.db[key] = value
  } else {
    if (this.db.hasOwnProperty(key)) {
      return callback({ error: 'Key already exists' })
    }
    this.db[key] = value
  }
  return callback(null)
}

/**
 * Deletes a key from the db
 * @param {String}      key         [key to delete]
 * @param {Function}    callback    [callback with error if any]
 */
Volatile.prototype.del = function (key, callback) {
  callback = callback || noop
  if (!keyVal(key)) {
    return callback({ error: 'Key not valid' })
  }
  this.db = remove(this.db, key)
  return callback(null)
}

/**
 * Returns all the values stored in te db
 * @param {Function}    callback    [callback with error and an iterable result]
 */
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

/**
 * Returns the 'size' if the db
 * @return {Number}   [The actual size of the db]
 */
Volatile.prototype.size = function () {
  return Object.keys(this.db).length
}

/**
 * Deletes all the db
 * @param {Function}    callback    [callback with error if any]
 */
Volatile.prototype.drop = function (callback) {
  callback = callback || noop
  this.db = {}
  return callback(null)
}

/**
 * Dumps the db into a file
 * @param {String}      name        [file name]
 * @param {Function}    callback    [callback with error if any]
 */
Volatile.prototype.dump = function (name, callback) {
  callback = callback || noop
  let json = safeStringify(this.db)
  writeFile(`${__dirname}/${name}.json`, json, (err) => {
    callback(err || null)
  })
}

function builder (options) {
  if (!(this instanceof Volatile)) {
    return new Volatile(options)
  }
}

module.exports = builder
