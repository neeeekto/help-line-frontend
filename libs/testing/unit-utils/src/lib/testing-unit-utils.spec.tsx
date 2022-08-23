import { render } from '@testing-library/react';

import TestingUnitUtils from './testing-unit-utils';

describe('TestingUnitUtils', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestingUnitUtils />);
    expect(baseElement).toBeTruthy();
  });
});
