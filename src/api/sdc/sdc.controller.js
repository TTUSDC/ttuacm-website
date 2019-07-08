const ACMController = require('../shared/acm.controller')
const Group = require('./group.model')

const SdcService = require('./sdc.service')

class SdcController extends ACMController {
  constructor() {
    super('SDC')
    this.service = new SdcService()
    this.instantiateRoutes()
  }

  instantiateRoutes() {
    /**
     * @api {post} /api/v2/sdc/groups/:group_id' Get a group by Id
     * @apiDescription
     * Gets a group by their ID
     *
     * @apiVersion 0.3.0
     *
     * @apiGroup SDC
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *    {
     *      Group
     *    }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 err.code OK
     */
    this.router.get('/groups/:group_id', async (req, res) => {
      try {
        const group = await this.service.getEntityById(req.params.group_id)
        res.status(200).json(group)
      } catch (err) {
        console.error(err)
        res.status(err.code || 500).end()
      }
    })

    /**
     * @api {post} /api/v2/sdc/groups/:group_id' Create a group
     * @apiDescription
     * Creates a new group
     *
     * @apiVersion 0.3.0
     *
     * @apiGroup SDC
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *    {
     *      Group
     *    }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 err.code OK
     *
     * @apiParam (Request body) {Object} group group
     */
    this.router.post('/groups/:group_id', async (req, res) => {
      try {
        const newGroup = new Group()

        newGroup.name = req.body.name
        newGroup.description = req.body.description
        newGroup.teamLeadIds = req.body.teamLeadIds

        const savedGroup = await this.service.createEntity(
          req.params.group_id,
          newGroup,
        )
        res.status(201).json(savedGroup)
      } catch (err) {
        console.error(err)
        res.status(err.code || 500).end()
      }
    })

    /**
     * @api {get} /api/v2/sdc/users/:user_id/groups/:group_id' Subscribe to a group
     * @apiDescription
     * Subscribes a member to a group
     *
     * @apiVersion 0.3.0
     *
     * @apiGroup SDC
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *    {
     *      SdcMember
     *    }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 err.code OK
     */
    this.router.get('/users/:user_id/groups/:group_id', async (req, res) => {
      try {
        const updatedMember = await this.service.subscribe(
          req.params.user_id,
          req.params.group_id,
        )
        res.status(202).json(updatedMember)
      } catch (err) {
        console.error(err)
        res.status(err.code || 500).end()
      }
    })

    /**
     * @api {delete} /api/v2/sdc/users/:user_id/groups/:group_id' Unsubscribe to a group
     * @apiDescription
     * Unsubscribes a member to a group
     *
     * @apiVersion 0.3.0
     *
     * @apiGroup SDC
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *    {
     *      SdcMember
     *    }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 err.code OK
     */
    this.router.delete('/users/:user_id/groups/:group_id', async (req, res) => {
      try {
        const updatedMember = await this.service.unsubscribe(
          req.params.user_id,
          req.params.group_id,
        )
        res.status(200).json(updatedMember)
      } catch (err) {
        console.error(err)
        res.status(err.code || 500).end()
      }
    })
  }
}

module.exports = new SdcController().GetRouter()
