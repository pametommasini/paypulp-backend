const dbConnect = require('./newClient')
const minify = require('pg-minify')
const camelize = require('camelize')

class PersonalInfo {
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

const castPersonalInfo = (personalInfo) => {
  personalInfo = camelize(personalInfo)
  return new PersonalInfo(personalInfo)
}

class PersonalInfoManager {
  static insertPersonalInfo = async ({
    userUuid,
    lastName,
    phone,
    birthDate,
    address,
    city,
    country,
    timeZone,
    creationTime,
  }) => {
    const client = await dbConnect()

    const query = `INSERT INTO personal_info 
      (user_uuid, last_name, phone, birth_date, address, city, country, time_zone, creation_time) 
      VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9)) 
      RETURNING *`

    try {
      const dbRes = await client.query(minify(query), [
        userUuid,
        lastName,
        phone,
        birthDate,
        address,
        city,
        country,
        timeZone,
        creationTime,
      ])

      const personalInfo = castPersonalInfo(dbRes.rows[0])

      return personalInfo
    } catch (err) {
      console.error('Error executing query:', err)
      throw new Error('Error inserting personal info in database')
    } finally {
      client.end()
    }
  }
}

module.exports = { PersonalInfoManager }
