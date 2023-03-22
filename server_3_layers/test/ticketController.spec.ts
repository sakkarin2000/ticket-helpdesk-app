import chai from 'chai';
import 'mocha';
import sinon from 'sinon';
import { TicketRepository } from '../src/repository/TicketRepository';
import TicketService from '../src/services/ticketService';

describe('Ticket Controller Test', () => {
  before(() => {
    chai.should();
  });
  afterEach(() => {
    sinon.restore();
  });

  it('should get list of ticket in json array response', async () => {
    const tickerRepo: sinon.SinonStubbedInstance<TicketRepository> = sinon.createStubInstance(TicketRepository);
    tickerRepo.totalTicketWithStatusFilter.returns(Promise.resolve(0));
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
  });
});
