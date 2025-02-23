import { mountThemedComponent } from '@shared/tests/utils';
import { expect, use } from 'chai';
import { matchSnapshot } from 'chai-karma-snapshot';
import React from 'react';
import { TabContainer } from '../../lib/TabContainer';

use(matchSnapshot);

describe('TabContainer', () => {
  it('Basic Test (generated)', () => {
    const wrapper = mountThemedComponent(<TabContainer />);
    expect(wrapper.debug()).to.matchSnapshot();
  });
});
