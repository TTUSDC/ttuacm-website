const test = require('firebase-functions-test')()

test.mockConfig({
  connections: {
    protocol: 'https',
    host: 'us-central1-acm-texas-tech-web-app-2-beta.cloudfunctions.net',
  },
})

const chai = require('chai')
const { Request, SERVICES, VERSIONS } = require('./request')

// jest.setTimeout(30000)
// eslint-disable-next-line
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000

const { expect } = chai

describe('Request Unit Tests', () => {
  it('should be able to send requests to all the services for any version', async () => {
    try {
      for (const service of SERVICES) {
        for (const version of VERSIONS) {
          const config = await new Request(version, service)
            .test()
            .body({
              msg: 'Hello!',
            })
            .params({
              msg: 'Hello!',
            })
            .end()
          expect(config.method).to.equal('get')
          expect(config.url).to.equal('/test')
          expect(config.params.msg).to.equal('Hello!')
          expect(config.data.msg).to.equal('Hello!')
        }
      }
    } catch (err) {
      expect(err).not.to.exist
    }
  })
})
