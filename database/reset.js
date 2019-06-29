const fs = require('fs')
const path = require('path')

// mock data
const wares = require('./mockData/wares')
const trailers = require('./mockData/trailers')
const warehouses = require('./mockData/warehouses')

const dataFolder = './database'
const dataFileName = 'db.json'
const dataDir = path.join(dataFolder, dataFileName)

// data object to be stored
const data = {
  wares,
  trailers,
  warehouses,
  missions: []
}

// check whether the folder exists
// IF not exist => make one
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder)
}

// write fake data to db.json
fs.writeFileSync(dataDir, JSON.stringify(data))
console.log('Data in the database are reset!')
