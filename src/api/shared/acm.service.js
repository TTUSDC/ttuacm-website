const admin = require('firebase-admin')
const uuid = require('uuid/v1')

/**
 * Abstract Base Class
 *
 * Used for queries in firebase that have shared logic between other services
 *
 * NOT MEANT TO BE USED ON ITS OWN
 */
class ACMService {
  constructor(collectionName) {
    this.DB = admin.firestore().collection(collectionName)
    this.admin = admin
  }

  /**
   * Finds all Entity
   */
  async getEntities() {
    try {
      const snapshot = await this.DB.get()
      return snapshot.docs.map((doc) => doc.data())
    } catch (err) {
      throw err
    }
  }

  /**
   * Finds a Entity by ID
   *
   * @param {string} id - id of the Entity
   */
  async getEntityById(id) {
    try {
      const snapshot = await this.DB.doc(id).get()
      return snapshot.data()
    } catch (err) {
      throw err
    }
  }

  /**
   * Finds one Entity with the matching attribute
   *
   * Please use `getEntityById` if you are using ids
   *
   * @param {Array<Array<string, string>>} queries - array of key value pairs used for query
   * @param {number} limit - the amount of documents to return. Defaults to no limit
   */
  async getEntitiesByAttributes(queries, limit = 1) {
    try {
      let query = this.DB

      queries.forEach(([attributeName, attributeValue]) => {
        query = query.where(attributeName, '==', attributeValue)
      })

      let snapshot

      // If a limit is set, use it, otherwise return everything
      if (limit > 1) {
        snapshot = await query.limit(limit).get()
      } else {
        snapshot = await query.get()
      }

      return snapshot.docs.map((doc) => doc.data())
    } catch (err) {
      throw err
    }
  }

  /**
   * Creates a Entity given an ID
   *
   * @param {string} id - id of the Entity
   */
  async createEntity(id = uuid(), entity) {
    try {
      return await this.DB.doc(id).set(Object.assign({}, entity))
    } catch (err) {
      throw err
    }
  }

  /**
   * Updates a Entity by ID
   *
   * @param {string} id - id of the Entity
   */
  async updateEntityById(id, update) {
    try {
      return await this.DB.doc(id).update(update)
    } catch (err) {
      throw err
    }
  }

  /**
   * Deletes one Entity with the matching id
   *
   * @param {string} id - array of key value pairs used for query
   */
  async deleteEntityById(id) {
    try {
      return await this.DB.doc(id).delete()
    } catch (err) {
      throw err
    }
  }
}

module.exports = ACMService
