const request = require('supertest')
const start = require('../app')

const userData = {
  username: 'testuser',
  password: 'samplepass',
  email: 'test@test.co'
}

let agent

describe('Authentication', function () {
  before(async () => {
    const app = await start()
    agent = request(app)
  })

  it('should register new user', () => {
    return agent
      .post('/auth/register')
      .send(userData)
      .expect(200)
  })

  it('should not register same user twice', () => {
    return agent
      .post('/auth/register')
      .send(userData)
      .expect(400)
  })

  it('should login existant user', () => {
    agent
      .get('/return')
      .expect('hey')
  })
})
