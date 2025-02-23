import React, { FC, ReactNode } from 'react';
import { Event } from '@ui5/webcomponents-react-base';
import UI5Popup from '@ui5/webcomponents/dist/Popup';
import { withWebComponent, WithWebComponentPropTypes } from '../../internal/withWebComponent';

export interface PopupPropTypes extends WithWebComponentPropTypes {
  initialFocus?: string; // @generated
  headerText?: string; // @generated
  onBeforeOpen?: (event: Event) => void; // @generated
  onAfterOpen?: (event: Event) => void; // @generated
  onBeforeClose?: (event: Event) => void; // @generated
  onAfterClose?: (event: Event) => void; // @generated
  children?: any; // @generated
  header?: ReactNode; // @generated
  footer?: ReactNode; // @generated
}

const Popup: FC<PopupPropTypes> = withWebComponent<PopupPropTypes>(UI5Popup);

Popup.displayName = 'Popup';

export { Popup };
