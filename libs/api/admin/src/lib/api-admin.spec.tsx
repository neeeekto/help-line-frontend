import { render } from '@testing-library/react';

import ApiAdmin from './api-admin';

describe('ApiAdmin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApiAdmin />);
    expect(baseElement).toBeTruthy();
  });
});
