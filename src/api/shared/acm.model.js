/**
 * Abstract Base Class
 *
 * Represents a partial entity in ACM
 *
 * The reason why there is no ID, is because the ID is kept as the key
 * for the document and not held within the model for firebase
 *
 * NOT MEANT TO BE USED ON ITS OWN
 */
class ACMModel {
  constructor() {
    // Declare shared attributes here
    this.createdOn = new Date(0)
    this.deletedOn = new Date(0)
    this.lastUpdatedOn = new Date(0)
    this.createdOn = new Date()
  }
}

module.exports = ACMModel
