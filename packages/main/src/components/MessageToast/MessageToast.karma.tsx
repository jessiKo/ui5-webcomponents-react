import { bootstrap } from '@ui5/webcomponents-react-base';
import { expect } from 'chai';
import sinon from 'sinon';
import { ExtendedWindow } from '../../interfaces/ExtendedWindow';
import { MessageToast } from '../../lib/MessageToast';

bootstrap();

// TODO Do we still need this?
(window as ExtendedWindow).Fiori4React.__SECRET_INTERNALS_DO_NOT_USE.messageToast = {
  toast: () => {}
};

describe('Message Toast', () => {
  it('Show Default', () => {
    const callback = sinon.spy(MessageToast, 'show');
    MessageToast.show('Default');
    expect(callback.called).to.equal(true);
    callback.restore();
  });

  it('Show Error', () => {
    const callback = sinon.spy(MessageToast, 'show');
    MessageToast.error('Error');
    expect(callback.called).to.equal(true);
    callback.restore();
  });

  it('Show Warning', () => {
    const callback = sinon.spy(MessageToast, 'show');
    MessageToast.warning('Warning');
    expect(callback.called).to.equal(true);
    callback.restore();
  });

  it('Show Success', () => {
    const callback = sinon.spy(MessageToast, 'show');
    MessageToast.success('Default');
    expect(callback.called).to.equal(true);
    callback.restore();
  });
});
