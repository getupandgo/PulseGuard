const request = require('supertest')
const start = require('../app')

const userData = {
  username: 'testuser',
  password: 'samplepass',
  email: 'test@test.co'
}

describe('auth', async function () {
  const app = await start()
  const agent = request(app)

  it('should register new user', function (done) {
    agent
      .post('/auth/register')
      .send(userData)
      .expect(200, done)
  })

  it('should not register same user twice', function (done) {
    agent
      .post('/auth/register')
      .send(userData)
      .expect(400, done)
  })

  it('should login existant user', function (done) {
    agent
      .get('/return')
      .expect('hey', done)
  })
})
