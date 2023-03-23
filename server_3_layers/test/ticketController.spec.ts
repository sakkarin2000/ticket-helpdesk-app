// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import 'mocha';
// import sinon from 'sinon';
// import server from '../src/index';
// import { CreateTicketRequest } from '../src/request/CreateTicketRequest';

// chai.use(chaiHttp);

// describe('Ticket Controller', () => {
//   before(() => {
//     chai.should();
//   });
//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('/GET tickets', () => {
//     it('it should GET 10 latest update tickets', (done) => {
//       chai
//         .request(server)
//         .get('/tickets?limit=10&offset=0')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.data.should.be.a('array');
//           res.body.data.length.should.be.eql(10);
//           done();
//         });
//     });
//   });

//   describe('/GET totalticket', () => {
//     it('it should get number of tickets in database', (done) => {
//       chai
//         .request(server)
//         .get('/total-ticket')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.total_ticket.should.be.a('number');
//           done();
//         });
//     });
//   });

//   describe('/POST tickets', () => {
//     it('it should GET 10 latest update tickets', (done) => {
//       const createTicketRequest = {
//         title: 'test',
//         description: 'test',
//         contact_info: 'test',
//       } as CreateTicketRequest;

//       chai
//         .request(server)
//         .post('/tickets')
//         .send(createTicketRequest)
//         .end((err, res) => {
//           res.should.have.status(201);
//           done();
//         });
//     });
//   });
// });

// // const tickerController: sinon.SinonStubbedInstance<TicketController> = sinon.createStubInstance(TicketController);
// // tickerController.listAllTicket.returns(
// //   Promise.resolve({
// //     data: [],
// //     meta: {
// //       limit: 10,
// //       offset: 0,
// //       count: 0,
// //       total: 0,
// //       overall_total: 0,
// //     },
// //     message: 'Get all tickets Success',
// //   }),
// // );
// // const tickerController: sinon.SinonStubbedInstance<TicketController> = sinon.createStubInstance(TicketController);
// // const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
// // tickerRepo.listWithStatusFilter.returns(Promise.resolve([]));
// // tickerRepo.list.returns(Promise.resolve([]));
// // tickerRepo.totalTicket.returns(Promise.resolve(0));
// // tickerRepo.totalTicketWithStatusFilter.returns(Promise.resolve(0));
// // const service = new TicketService(tickerRepo);
// // const controller = new TicketController(service);
// // describe('/GET tickets', () => {
// //   it('it should have status 200', async (done) => {
// //     tickerController.listAllTicket.returns(
// //       Promise.resolve({
// //         body: {
// //           data: [],
// //           meta: {
// //             limit: 10,
// //             offset: 0,
// //             count: 0,
// //             total: 0,
// //             overall_total: 0,
// //           },
// //           message: 'Get all tickets Success',
// //         },
// //         status: 200,
// //       }),
// //     );
// //     const result = await controller.listAllTicket(req, res, query);
// //     // result.status.should.have.status(200);
// //   });
// // });
