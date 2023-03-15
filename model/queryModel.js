const dbConnect = require('./newClient')
const minify = require('pg-minify')
const camelize = require('camelize')
const { snakizeString } = require('../helpers/casing')
const snakeize = require('snakeize')

class QueryModel {
  /**
   * Query for a row in a table by column
   * @param {string} table - SQL table name
   * @param {string} column - column name
   * @param {string} value - column value
   * @returns {undefined | dbData} returns undefined if query returns nothing
   */
  static async selectBy(table, column, value) {
    const client = await dbConnect()

    const tbl = snakizeString(table)
    const col = snakizeString(column)

    const query = `SELECT * FROM ${tbl}
        WHERE ${col} = ($1)`

    try {
      const { rows } = await client.query(minify(query), [value])

      if (rows.length === 0) return

      const instance = this.castData(rows[0])

      return Object.assign({}, instance)
    } catch (err) {
      // console.error('Error executing query:', err)
      throw new Error('Error retrieving users from database')
    } finally {
      client.end()
    }
  }

  /**
   * Insert multiple
   * @param {string} table - destination table
   * @param {object} newDataObject - columns and values to be inserted
   * @returns {dbData}
   */
  static async insertData(table, newDataObject) {
    const client = await dbConnect()

    const tbl = snakizeString(table)
    const keys = Object.keys(snakeize(newDataObject)).toString()
    const values = Object.values(newDataObject)

    const positions = this.parameterPositions(values)

    const query = `INSERT INTO ${tbl} (${keys}) 
      VALUES (${positions}) 
      RETURNING *`

    try {
      const { rows } = await client.query(minify(query), values)

      const instance = this.castData(rows[0])

      return instance
    } catch (err) {
      // console.error('Error executing query:', err)
      throw new Error('Error inserting personal info in database')
    } finally {
      client.end()
    }
  }

  static parameterPositions(arr) {
    let res = ''

    for (let i = 1; i <= arr.length; i++) {
      let temp = `($${i})`
      res += temp

      if (i !== arr.length) {
        res += ', '
      }
    }
    console.log(res)
    return res
  }

  static castData(data) {
    const dt = camelize(data)
    return new constructor(dt)
  }
}

module.exports = QueryModel
