import { jobsFakeApi, jobStubFactory } from '@help-line/stub/admin';
import { makeSuccessResponse } from '@help-line/stub/share';
import {setupWorker} from "msw";

describe('admin', () => {
  beforeEach(() => {
    const worker = setupWorker();
    cy.wrap(worker.start(), { log: true })
    worker.resetHandlers(jobsFakeApi.get(makeSuccessResponse([jobStubFactory.createJob()])));
    cy.visit('/');
  });

  it('should display welcome message', () => {
    cy.wait(100000);
  });
});
