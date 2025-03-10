import { mountThemedComponent } from '@shared/tests/utils';
import { expect, use } from 'chai';
import { matchSnapshot } from 'chai-karma-snapshot';
import React from 'react';
import { DayPicker } from '../../lib/DayPicker';

use(matchSnapshot);

describe('DayPicker', () => {
  it('Basic Test (generated)', () => {
    const wrapper = mountThemedComponent(<DayPicker />);
    expect(wrapper.debug()).to.matchSnapshot();
  });
});
