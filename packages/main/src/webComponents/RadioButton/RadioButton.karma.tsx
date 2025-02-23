import { mountThemedComponent } from '@shared/tests/utils';
import { expect, use } from 'chai';
import { matchSnapshot } from 'chai-karma-snapshot';
import React from 'react';
import { RadioButton } from '../../lib/RadioButton';

use(matchSnapshot);

describe('RadioButton', () => {
  it('Basic Test (generated)', () => {
    const wrapper = mountThemedComponent(<RadioButton />);
    expect(wrapper.debug()).to.matchSnapshot();
  });
});
