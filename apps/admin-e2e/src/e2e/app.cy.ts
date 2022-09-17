import { jobsFakeApi, jobStubFactory } from '@help-line/stub/admin';
import {
  extractUrlFromStubFactory,
  makeSuccessResponse,
} from '@help-line/stub/share';
import { setupWorkerHooks, startWorker, worker } from '../support/mock-woker';

describe('admin', () => {
  worker.use(
    jobsFakeApi.get(makeSuccessResponse([jobStubFactory.createJob()]))
  );
  setupWorkerHooks();
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display welcome message', () => {
    cy.intercept(extractUrlFromStubFactory(jobsFakeApi.get)).as('get');
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');
    cy.wait('@get');
    cy.get('#root');
  });
});
