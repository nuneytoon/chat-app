const request = require('request')

// Future options to consider: developing out tests for the POST endpoint,
// configuring before and after blocks for setup and cleanup respectively
// (especially for the database), making use of mocks to avoid the need to
// read/write from the db, and/or splitting out the db connection and that
// code's tests separate from these API tests

describe('get messages', () => {
    it('should return 200 OK', done => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })

    it('should return a non-empty list', done => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })
})

describe('get messages from user', () => {
    it('should return 200 OK', done => {
        request.get('http://localhost:3000/messages/tim', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })

    it('should have name of tim', done => {
        request.get('http://localhost:3000/messages/tim', (err, res) => {
            expect(JSON.parse(res.body)[0].name).toEqual('tim')
            done()
        })
    })
})
