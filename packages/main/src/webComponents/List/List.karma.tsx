import { mountThemedComponent } from '@shared/tests/utils';
import { expect, use } from 'chai';
import { matchSnapshot } from 'chai-karma-snapshot';
import React from 'react';
import { List } from '../../lib/List';

use(matchSnapshot);

describe('List', () => {
  it('Basic Test (generated)', () => {
    const wrapper = mountThemedComponent(<List />);
    expect(wrapper.debug()).to.matchSnapshot();
  });
});
