'use strict'

const tyval = require('tyval')
const remove = require('object.omit')
const writeFile = require('fs').writeFile

const keyVal = tyval.string().min(1).toFunction()
const noop = err => { if (err) throw err }

function createDB () {
  let database = {}
  const db = {}

  db.get = function (key, callback) {
    callback = callback || noop
    if (!keyVal(key)) {
      return callback({ error: 'Key not valid' }, null)
    }
    if (database.hasOwnProperty(key)) {
      return callback(null, database[key])
    }
    return callback({ error: 'Key not found' }, null)
  }

  db.put = function (key, value, callback) {
    callback = callback || noop
    if (!keyVal(key)) {
      return callback({ error: 'Key not valid' })
    }
    database[key] = value
    return callback(null)
  }

  db.del = function (key, callback) {
    callback = callback || noop
    if (!keyVal(key)) {
      return callback({ error: 'Key not valid' })
    }
    database = remove(database, key)
    return callback(null)
  }

  db.all = function (callback) {
    callback = callback || noop
    return callback(null, databaseIterator)
  }

  db.size = function () {
    return Object.keys(database).length
  }

  db.drop = function (callback) {
    callback = callback || noop
    database = {}
    return callback(null)
  }

  db.dump = function (name, callback) {
    callback = callback || noop
    let json = `${JSON.stringify(database, null, 2)}\n`
    writeFile(`${__dirname}/${name}.json`, json, (err) => {
      callback(err)
    })
  }

  const databaseIterator = function * () {
    for (let prop in database) {
      yield { key: prop, value: database[prop] }
    }
  }

  return db
}

module.exports = createDB()
