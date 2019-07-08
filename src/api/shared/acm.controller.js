const express = require('express')
const uuid = require('uuid/v1')

/**
 * Abstract Base Class
 *
 * Used for routes that are shared between controllers.
 * Only put routes here that depend on the ACM Service itself
 *
 * NOT MEANT TO BE USED ON ITS OWN
 */
class ACMController {
  constructor(name = uuid()) {
    this.router = express.Router()
    console.log(`Starting up controller: ${name}`)
  }

  GetRouter() {
    return this.router
  }
}

module.exports = ACMController
