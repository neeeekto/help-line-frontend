import { setupWorker } from 'msw';

export const worker = setupWorker();

export const startWorker = () => {
  cy.wrap(null).then(() => worker.start());
};

export const setupWorkerHooks = () => {
  before(() => {
    cy.log('Start fake server');
    startWorker();
  });

  after(() => {
    cy.log('Reset fake server');
    worker.resetHandlers();
  });
};
