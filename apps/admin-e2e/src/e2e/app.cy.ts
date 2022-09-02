import { getGreeting } from '../support/app.po';
import { setupWorker } from 'msw';
import { jobsFakeApi, jobStubFactory } from '@help-line/stub/admin';
import { makeSuccessResponse } from '@help-line/stub/share';

describe('admin', () => {
  const worker = setupWorker(
    jobsFakeApi.get(makeSuccessResponse([jobStubFactory.createJob()]))
  );
  beforeEach(() => {
    cy.wrap(null).then(async () => {
      await worker.start();
    });

    cy.visit('/');
  });

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');
  });
});
