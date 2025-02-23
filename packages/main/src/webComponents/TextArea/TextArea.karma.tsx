import { mountThemedComponent } from '@shared/tests/utils';
import { expect, use } from 'chai';
import { matchSnapshot } from 'chai-karma-snapshot';
import React from 'react';
import { TextArea } from '../../lib/TextArea';

use(matchSnapshot);

describe('TextArea', () => {
  it('Basic Test (generated)', () => {
    const wrapper = mountThemedComponent(<TextArea />);
    expect(wrapper.debug()).to.matchSnapshot();
  });
});
