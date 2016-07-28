# Volatile
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://travis-ci.org/delvedor/Volatile.svg?branch=master)](https://travis-ci.org/delvedor/Volatile) [![Coverage Status](https://coveralls.io/repos/github/delvedor/Volatile/badge.svg?branch=master&bust=1)](https://coveralls.io/github/delvedor/Volatile?branch=master)

Volatile is an in-memory, volatile key-value store database.
It can memorize all the standard javascript types.  
It can be useful for testing or for saving some parameters/configuration or on Heroku if you don't need a more sophisticated database.

As you can guess from the name, its peculiarity it is the fact of being volatile, all your stored data is lost if you relaunch the process. *(Don't worry, if you really need it, you can use the dump function)*

*.get*, *.put* and *.del* api are designed in the same way of LevelDB, so if you need to pass from Volatile to LevelDB or vice versa you don't need to rewrite the code!

**Needs Node.js ≥ 4.0.0**

## Usage
```javascript
const db = require('volatile')

db.put('key1', 'value1', (err) => {
  if (err) console.log(err)
})

db.get('key1', (err, value) => {
  if (err) console.log(err)
  console.log(value)
})

db.all((err, iterable) => {
  if (err) return console.log(err)
  for (let [key, value] of iterable()) {
    console.log(key, value)
  }
})

db.del('key1', (err) => {
  if (err) console.log(err)
})
```

## API

- <a href="#get"><code>db.**get()**</code></a>
- <a href="#put"><code>db.**put()**</code></a>
- <a href="#del"><code>db.**del()**</code></a>
- <a href="#all"><code>db.**all()**</code></a>
- <a href="#size"><code>db.**size()**</code></a>
- <a href="#drop"><code>db.**drop()**</code></a>
- <a href="#dump"><code>db.**dump()**</code></a>

<a name="get"></a>
#### db.get(key, callback)
*{ String }* **key** is the key that you are searching.  
*{ Function }* **callback** is the callback function, with two parameters, error and value.

<a name="put"></a>
#### db.put(key, value, callback)
*{ String }* **key** is the key that you are saving.  
*{ String }* **value** is the value that you are saving.  
*{ Function }* **callback** is the callback function, with one error parameter.

<a name="del"></a>
#### db.del(key, callback)
*{ String }* **key** is the key that you are removing.  
*{ Function }* **callback** is the callback function, with one error parameter.

<a name="all"></a>
#### db.get(key, callback)
*{ String }* **key** is the key that you are searching.  
*{ Function }* **callback** is the callback function, with two parameters, error and an iterator.

<a name="size"></a>
#### db.size()
Returns the total number of the keys stored in Volatile.

<a name="drop"></a>
#### db.drop(callback)
*{ Function }* **callback** is the callback function, with one error parameter.  
Drops the databse.

<a name="dump"></a>
#### db.dump(name)
*{ String }* **name** is the name of the json file with the dump.  
*{ Function }* **callback** is the callback function, with one error parameter.  
Generates a json dump of the database.

## TODO
- [ ] Add *.batch* function

## Contributing
If you feel you can help in any way, be it with examples, extra testing, or new features please open a pull request or open an issue.

The code follows the Standard code style.  
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## License
**[MIT](https://github.com/delvedor/Volatile/blob/master/LICENSE)**

*The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.*

Copyright © 2016 Tomas Della Vedova
