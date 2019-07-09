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
    this.name = name
    console.log(`Starting up controller: ${name}`)
    this.createDefaultRoutes()
  }

  GetRouter() {
    return this.router
  }

  createDefaultRoutes() {
    this.router.get('/test', (req, res) => {
      const message = `${this.name} App Works!`
      console.log(message)
      res.send(message)
    })
  }
}

module.exports = ACMController
