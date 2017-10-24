const request = require('supertest');
const app = require('../app');
var expect = require("chai").expect;
var mongoose = require("mongoose");
mongoose.Promise = Promise;
var db = require('../models/');

describe('GET /', function() {
    it('responds with JSON', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /users', function() {
    it('responds with JSON', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /users/:id/warbles', function() {
    it('responds with JSON', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /users', function(){
  var newUser = {name: 'Bob', username: 'bob1', email: 'bob@bob.com', password: 'password', followers: {}, following: {}, warbles: {}};
  it('responds successfully', function(done) {
    request(app)
      .post('/users')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /users/:id/warbles', function(){
  var newWarble = {user_id: 1, text: "test warble!"}
  it('responds successfully', function(done) {
    request(app)
      .post('/users/:id/warbles')
      .send(newWarble)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
})

///////////// AUTH TESTING

// var auth = {};

// function loginUser(auth) {
//     return function(done) {
//         request(app)
//             .post('/api/auth/login')
//             .send({
//                 username: 'test',
//                 password: 'secret'
//             })
//             .expect(200)
//             .end(onResponse);

//         function onResponse(err, res) {
//             // let's add the token so that we can use it for testing later!
//             auth.token = res.body.token;
//             return done();
//         }
//     };
// }

// beforeEach(function(done){
//     db.User.create({username:'test', password:'secret'}).then(function(user) {
//         // let's have a current user!
//         auth.current_user = user;
//         done();
//     });
// });

// // and then log them in
// beforeEach(loginUser(auth));

// afterEach(function(done){
//     db.User.remove({}).then(function() {
//       done();
//     });
// });

// describe('PATCH /users/:id', function() {
//     it('responds with JSON', function(done) {
//         request(app)
//             .patch(`/api/users/${auth.current_user.id}`)
//             .send({
//                 username:'bob'
//             })
//             .set('Authorization', 'Bearer: ' + auth.token)
//             .expect(200, done);
//     });
// });

// describe('DELETE /users/:id', function() {
//     it('responds with JSON', function(done) {
//         request(app)
//             .delete(`/api/users/${auth.current_user.id}`)
//             .set('Authorization', 'Bearer: ' + auth.token)
//             .expect(204, done);
//     });
// });

