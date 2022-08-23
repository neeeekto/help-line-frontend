import { stubAdmin } from './stub-admin';

describe('stubAdmin', () => {
  it('should work', () => {
    expect(stubAdmin()).toEqual('stub-admin');
  });
});
