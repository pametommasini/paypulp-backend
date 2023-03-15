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

      // -this is wrong-
      const instance = this.castData(rows[0])

      return Object.assign({}, instance)
      // ---------------
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
   * @param {object} newData - columns and values to be inserted
   * @returns {dbData}
   */
  static async insertData(table, newData) {
    const client = await dbConnect()

    const tbl = snakizeString(table)
    const keys = Object.keys(snakeize(newData)).toString()
    const values = Object.values(newData)

    const positions = this.parameterPositions(values)

    const query = `INSERT INTO ${tbl} (${keys}) 
      VALUES (${positions}) 
      RETURNING *`

    try {
      const { rows } = await client.query(minify(query), values)

      // const instance = this.castData(rows[0])

      return rows[0]
    } catch (err) {
      console.error('Error executing query:', err)
      throw err
    } finally {
      client.end()
    }
  }

  static async updateData(table, newData, condition) {
    const client = await dbConnect()

    const tbl = snakizeString(table)
    const keys = Object.keys(snakeize(newData))
    const values = Object.values(newData)
    const conditSnake = snakeize(condition)
    const conditCol = Object.keys(conditSnake)

    const columnsAndValues = this.columnsAndValues(keys)

    const query = `UPDATE ${tbl} 
      SET ${columnsAndValues}
      WHERE ${conditCol} = '${conditSnake[conditCol]}'
      RETURNING *`

    try {
      const { rows } = await client.query(minify(query), values)

      // const instance = this.castData(rows[0])

      return rows[0]
    } catch (err) {
      console.error('Error executing query:', err)
      throw err
    } finally {
      client.end()
    }
  }

  static parameterPositions(arr) {
    let finalString = ''

    for (let i = 1; i <= arr.length; i++) {
      let temp = `($${i})`
      finalString += temp

      if (i !== arr.length) {
        finalString += ', '
      }
    }

    return finalString
  }

  static columnsAndValues(arr) {
    let finalString = ''

    for (let i = 1; i <= arr.length; i++) {

      let temp = `($${i})`
      finalString += arr[i-1] + ' = ' + temp

      if (i !== arr.length) {
        finalString += ', '
      }
    }

    return finalString
  }

  static castData(data) {
    const dt = camelize(data)
    return new constructor(dt)
  }
}

module.exports = QueryModel
