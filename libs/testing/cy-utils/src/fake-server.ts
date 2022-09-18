import { RequestHandler, setupWorker } from 'msw';

export const runFakeServer = (...args: RequestHandler[]) => {
  const worker = setupWorker(...args);
  beforeEach(() => {
    cy.wrap(null).then(async () => {
      await worker.start();
    });
  });
  afterEach(() => {
    worker.stop();
  });

  return worker;
};

