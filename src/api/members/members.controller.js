const MemberService = require('./members.service')
const ACMController = require('../shared/acm.controller')
const Member = require('./members.model')

class MembersController extends ACMController {
  constructor() {
    super('Members')
    this.service = new MemberService()
    console.log('Loading Member Routes...')
    this.instantiateRoutes()
  }

  instantiateRoutes() {
    /**
     * @api {get} /api/members?[attributeName=attributeValue]?limit Get Members
     * @apiDescription
     * Gets all of the members in database
     * You can pass optional query parametes in the URL as well
     *
     * @apiVersion 0.2.0
     *
     * @apiGroup Members
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [Members]
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 err.code OK
     */
    this.router.get('/', async (req, res) => {
      try {
        // Grabs all of the attributes to match and exclude the `limit` param
        const query = Object.entries(req.query).filter(
          ([attributeName]) => attributeName !== 'limit',
        )

        let members

        // If we don't have any custom queries and a limit is not set
        // just return all members
        //
        // Otherwise, send the queries over to the `getMembersByAttributes` method
        // along with a limit of how many you want back
        if (!query.length && req.param.limit !== undefined) {
          members = await this.service.getEntities()
        } else {
          members = await this.service.getEntitiesByAttributes(
            query,
            parseInt(req.query.limit, 10),
          )
        }
        res.status(200).json(members)
        return
      } catch (err) {
        console.error(err)
        res.status(err.code || 500).end()
      }
    })

    /**
     * @api {get} /api/members/:user_id Get Members
     * @apiDescription
     * Gets the member with the matching id
     * The ID is the same as the firebase uid
     *
     * @apiVersion 0.3.0
     *
     * @apiGroup Members
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     Member
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 err.code OK
     */
    this.router.get('/:user_id', async (req, res) => {
      try {
        const member = await this.service.getEntityById(req.params.user_id)
        res.status(200).json(member)
      } catch (err) {
        console.error(err)
        res.status(err.code || 500).end()
      }
    })

    /**
     * @api {post} /api/members/:user_id Create Member
     * @apiDescription
     * Creates the member with an id
     * The ID is the same as the firebase uid
     *
     * @apiVersion 0.3.0
     *
     * @apiGroup Members
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     Member
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 err.code OK
     */
    this.router.post('/:user_id', async (req, res) => {
      try {
        const newMember = new Member()

        newMember.firstName = req.body.firstName
        newMember.lastName = req.body.lastName

        const savedMember = await this.service.createEntity(
          req.params.user_id,
          newMember,
        )
        res.status(201).json(savedMember)
      } catch (err) {
        console.error(err)
        res.status(err.code || 500).end()
      }
    })

    /**
     * @api {delete} /api/members/:user_id Delete Member
     * @apiDescription
     * Deletes the member with matching id
     * The ID is the same as the firebase uid
     *
     * @apiVersion 0.3.0
     *
     * @apiGroup Members
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     Member
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 err.code OK
     */
    this.router.delete('/:user_id', async (req, res) => {
      try {
        const deletedMember = await this.service.deleteEntityById(
          req.params.user_id,
        )
        res.status(200).json(deletedMember)
      } catch (err) {
        console.error(err)
        res.status(err.code || 500).end()
      }
    })
  }
}

module.exports = new MembersController().GetRouter()
