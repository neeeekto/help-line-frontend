import { render } from '@testing-library/react';

import CoreHttp from './core-http';

describe('CoreHttp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CoreHttp />);
    expect(baseElement).toBeTruthy();
  });
});
