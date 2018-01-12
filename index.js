// most of this is taken from fixpack

const config = require('fixpack/config.json')

function sortAlphabetically(object) {
  if (Array.isArray(object)) {
    object.sort()
    return object
  }
  var sorted = {}
  Object.keys(object).sort().forEach(function (key) {
    sorted[key] = object[key]
  })
  return sorted
}

module.exports = input => {
  let pjson = Object.assign({}, input)
  const out = {}

  // handle the specific ones we want, then remove
  config.sortToTop.forEach(key => {
    if (pjson[key]) out[key] = pjson[key]
    delete pjson[key]
  })

  // sort the remaining
  pjson = sortAlphabetically(pjson)

  // add in the sorted ones
  for (let key of Object.keys(pjson)) {
    out[key] = pjson[key]
  }

  return out
}
