const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const fs = require('fs-extra')

chai.use(chaiHttp);

describe('API ENDPOINT TESTING', () => {
    it('GET landing page', (done) => {
        chai.request(app).get('/api/v1/landing-page').end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('hero')
            expect(res.body.hero).to.have.all.keys(
                'travelers', 'treasure', 'cities')
            expect(res.body).to.have.property('mostPicked')
            expect(res.body.mostPicked).to.be.an('array')
            expect(res.body).to.have.property('category')
            expect(res.body.mostPicked).to.be.an('array')
            expect(res.body).to.have.property('testimonial')
            expect(res.body.testimonial).to.be.an('object')
            done();
        });
    })

    it('GET detail page', (done) => {
        chai.request(app).get('/api/v1/detail-page/6089fcd8d5b62b35642b96e4').end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('country')
            expect(res.body).to.have.property('isPopular')
            expect(res.body).to.have.property('unit')
            expect(res.body).to.have.property('sumBooking')
            expect(res.body).to.have.property('imageId')
            expect(res.body.imageId).to.be.an('array')
            expect(res.body).to.have.property('featureId')
            expect(res.body.featureId).to.be.an('array')
            expect(res.body).to.have.property('activityId')
            expect(res.body.activityId).to.be.an('array')
            expect(res.body).to.have.property('_id')
            expect(res.body).to.have.property('title')
            expect(res.body).to.have.property('price')
            expect(res.body).to.have.property('city')
            expect(res.body).to.have.property('description')
            expect(res.body).to.have.property('__v')
            expect(res.body).to.have.property('bank')
            expect(res.body.bank).to.be.an('array')
            expect(res.body).to.have.property('testimonial')
            expect(res.body.testimonial).to.be.an('object')
            done();
        })
    })


    it('POST booking page', (done) => {
        const images = __dirname + '/buktiBayar.jpeg';
        const dataSampel = {
            images,
            idItem: '6089fcd8d5b62b35642b96e4',
            duration: '4',
            bookingStartDate: '11-12-2021',
            bookingEndDate: '01-01-2002',
            firstName: 'ahmad',
            lastName: 'halim',
            email: 'ahmadHalim@gmail.com',
            phoneNumber: '08202202348',
            accountHolder: 'Ahmad Halim',
            bankFrom: 'Mandiri'
        }
        chai.request(app).post('/api/v1/booking-page')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('idItem', dataSampel.idItem)
            .field('duration', dataSampel.duration)
            .field('bookingStartDate', dataSampel.bookingStartDate)
            .field('bookingEndDate', dataSampel.bookingEndDate)
            .field('firstName', dataSampel.firstName)
            .field('lastName', dataSampel.lastName)
            .field('phoneNumber', dataSampel.phoneNumber)
            .field('email', dataSampel.email)
            .field('accountHolder', dataSampel.accountHolder)
            .field('bankFrom', dataSampel.bankFrom)
            .attach('image', fs.readFileSync(dataSampel.images), 'buktiBayar.jpeg')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Succes booking')
                expect(res.body).to.have.property('booking')
                expect(res.body.booking).to.have.all.keys('payments',
                    '_id', 'invoice', 'bookingStartDate', 'bookingEndDate',
                    'total', 'itemId', 'memberId', '__v')
                expect(res.body.booking.payments).to.have.all.keys('status', 'proofPayment',
                    'bankFrom', 'accountHolder')
                expect(res.body.booking.itemId).to.have.all.keys('_id', 'title',
                    'price', 'duration')
                console.log(res.body.booking)
                done();
            });
    })

})