import { mountThemedComponent } from '@shared/tests/utils';
import { expect, use } from 'chai';
import { matchSnapshot } from 'chai-karma-snapshot';
import React from 'react';
import { ShellBarItem } from '../../lib/ShellBarItem';

use(matchSnapshot);

describe('ShellBarItem', () => {
  it('Basic Test (generated)', () => {
    const wrapper = mountThemedComponent(<ShellBarItem />);
    expect(wrapper.debug()).to.matchSnapshot();
  });
});
