import { render } from '@testing-library/react';

import CoreAuth from './core-auth';

describe('CoreAuth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CoreAuth />);
    expect(baseElement).toBeTruthy();
  });
});
