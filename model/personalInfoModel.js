const dbConnect = require('./newClient')
const minify = require('pg-minify')
const camelize = require('camelize')
const { snakizeString } = require('../helpers/casing')
const snakeize = require('snakeize')

class Model {
  static async selectBy(table, column, value) {
    const client = await dbConnect()

    const tbl = snakizeString(table)
    const col = snakizeString(column)
    const val = snakizeString(value)

    const query = `SELECT * FROM ${tbl}
        WHERE ${col} = ($1)`

    try {
      const { rows } = await client.query(minify(query), [val])

      if (rows.length === 0) return

      const data = camelize(rows[0])
      const instance = new constructor(data)

      return Object.assign({}, instance)
    } catch (err) {
      console.error('Error executing query:', err)
      throw new Error('Error retrieving users from database')
    } finally {
      client.end()
    }
  }

  static async insertData(table, newDataObject) {
    const client = await dbConnect()

    const tbl = snakizeString(table)
    const keys = Object.keys(snakeize(newDataObject)).toString()
    const values = Object.values(newDataObject)

    const query = `INSERT INTO ${tbl} (${keys}) 
      VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9)) 
      RETURNING *`

    try {
      const { rows } = await client.query(minify(query), values)

      const data = camelize(rows[0])
      const instance = new constructor(data)

      return instance
    } catch (err) {
      console.error('Error executing query:', err)
      throw new Error('Error inserting personal info in database')
    } finally {
      client.end()
    }
  }
}

class PersonalInfo extends Model {
  constructor({
    personalInfoId = null,
    userUuid = null,
    lastName = null,
    phone = null,
    birthDate = null,
    address = null,
    city = null,
    country = null,
    timeZone = null,
    creationTime = null,
  }) {
    super()
    this.personalInfoId = personalInfoId
    this.userUuid = userUuid
    this.lastName = lastName
    this.phone = phone
    this.birthDate = birthDate
    this.address = address
    this.city = city
    this.country = country
    this.timeZone = timeZone
    this.creationTime = creationTime
  }
}

module.exports = { PersonalInfo }
