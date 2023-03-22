import chai from 'chai';
import 'mocha';
import { QueryResult } from 'pg';
import sinon from 'sinon';
import { TicketRepository } from '../src/repository/TicketRepository';
import { ListTicketRequest, Status } from '../src/request/ListTicketRequest';
import { UpdateTicketRequest } from '../src/request/UpdateTicketRequest';
import TicketService from '../src/services/ticketService';

describe('Ticket Service Test', () => {
  before(() => {
    chai.should();
  });

  afterEach(() => {
    sinon.restore();
  });
  it('listTicket method should return a list of tickets', async () => {
    const something = '123';
    something.should.equal('123');

    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.listWithStatusFilter.returns(Promise.resolve([]));
    tickerRepo.list.returns(Promise.resolve([]));
    tickerRepo.totalTicket.returns(Promise.resolve(0));
    tickerRepo.totalTicketWithStatusFilter.returns(Promise.resolve(0));
    const service = new TicketService(tickerRepo);

    const query: ListTicketRequest = {
      limit: 10,
      offset: 0,
      status: Status.Pending,
    };
    const result = await service.list(query);
    result.data.should.be.an('array');
    result.data.length.should.be.equal(0);
  });
  it('totalTicket method should return total number of tickets', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.totalTicket.returns(Promise.resolve(0));
    const service = new TicketService(tickerRepo);
    const result = await service.totalTicket();
    result.should.be.equal(0);
  });

  it('totalTicketWithFilter method should return total number of tickets', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    const totalTicketWithStatusFilterStub = tickerRepo.totalTicketWithStatusFilter.returns(Promise.resolve(0));
    const service = new TicketService(tickerRepo);
    const result: number[] = [];

    result.push(await service.totalTicketWithStatusFilter('Pending'));
    result.push(await service.totalTicketWithStatusFilter('Accepted'));
    result.push(await service.totalTicketWithStatusFilter('Rejected'));
    result.push(await service.totalTicketWithStatusFilter('Resolved'));

    result.length.should.be.equal(4);
    result[0].should.be.equal(0);
    result[1].should.be.equal(0);
    result[2].should.be.equal(0);
    result[3].should.be.equal(0);

    totalTicketWithStatusFilterStub.callCount.should.equal(4);
  });
});

describe('Update Ticket Status Service Test Cases', () => {
  it('should prevent [Pending] ticket to change to [Resolved]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 0 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Pending'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Resolved' } as UpdateTicketRequest);
    result.success.should.be.equal(false);
  });
  it('should prevent [Canceled] ticket to change to [Pending]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 0 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Canceled'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Pending' } as UpdateTicketRequest);
    result.success.should.be.equal(false);
  });
  it('should prevent [Canceled] ticket to change to [Resolved]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 0 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Canceled'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Resolved' } as UpdateTicketRequest);
    result.success.should.be.equal(false);
  });
  it('should prevent [Canceled] ticket to change to [Rejected]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 0 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Canceled'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Rejected' } as UpdateTicketRequest);
    result.success.should.be.equal(false);
  });
  it('should prevent [Canceled] ticket to change to [Accepted]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 0 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Canceled'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Accepted' } as UpdateTicketRequest);
    result.success.should.be.equal(false);
  });
  it('should prevent [Accepted] ticket to change to [Rejected]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 0 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Accepted'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Rejected' } as UpdateTicketRequest);
    result.success.should.be.equal(false);
  });
  it('should prevent [Accepted] ticket to change to [Pending]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 0 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Accepted'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Pending' } as UpdateTicketRequest);
    result.success.should.be.equal(false);
  });

  it('should prevent [Rejected] ticket to change to [Resolved]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 0 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Rejected'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Resolved' } as UpdateTicketRequest);
    result.success.should.be.equal(false);
  });
  it('should prevent [Rejected] ticket to change to [Pending]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 0 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Rejected'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Pending' } as UpdateTicketRequest);
    result.success.should.be.equal(false);
  });
  it('should prevent [Resolved] ticket to change to [Pending]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 0 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Resolved'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Pending' } as UpdateTicketRequest);
    result.success.should.be.equal(false);
  });
  it('should prevent [Resolved] ticket to change to [Rejected]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 0 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Resolved'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Rejected' } as UpdateTicketRequest);
    result.success.should.be.equal(false);
  });
  it('should prevent [Resolved] ticket to change to [Rejected]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 0 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Resolved'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Rejected' } as UpdateTicketRequest);
    result.success.should.be.equal(false);
  });
  it('should allow [Pending] ticket to change to [Canceled]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 1 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Pending'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Canceled' } as UpdateTicketRequest);
    result.success.should.be.equal(true);
  });
  it('should allow [Pending] ticket to change to [Accepted]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 1 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Pending'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Accepted' } as UpdateTicketRequest);
    result.success.should.be.equal(true);
  });
  it('should allow [Pending] ticket to change to [Rejected]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 1 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Pending'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Rejected' } as UpdateTicketRequest);
    result.success.should.be.equal(true);
  });
  it('should allow [Accepted] ticket to change to [Resolved]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 1 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Accepted'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Resolved' } as UpdateTicketRequest);
    result.success.should.be.equal(true);
  });
  it('should allow [Rejected] ticket to change to [Accepted]', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 1 } as QueryResult<any>));
    tickerRepo.getCurrentStatus.returns(Promise.resolve('Rejected'));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Accepted' } as UpdateTicketRequest);
    result.success.should.be.equal(true);
  });

  it('should prevent invalid ticket_id to update', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.update.returns(Promise.resolve({ rowCount: 0 } as QueryResult<any>));
    const service = new TicketService(tickerRepo);
    const result = await service.update('123', { status: 'Accepted' } as UpdateTicketRequest);
    result.success.should.be.equal(false);
  });
});
