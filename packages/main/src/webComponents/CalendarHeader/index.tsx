import { Event } from '@ui5/webcomponents-react-base';
import UI5CalendarHeader from '@ui5/webcomponents/dist/CalendarHeader';
import React, { FC } from 'react';
import { withWebComponent, WithWebComponentPropTypes } from '../../internal/withWebComponent';

export interface CalendarHeaderPropTypes extends WithWebComponentPropTypes {
  monthText?: string; // @generated
  yearText?: string; // @generated
  onPressPrevious?: (event: Event) => void; // @generated
  onPressNext?: (event: Event) => void; // @generated
  onBtn1Press?: (event: Event) => void; // @generated
  onBtn2Press?: (event: Event) => void; // @generated
}

const CalendarHeader: FC<CalendarHeaderPropTypes> = withWebComponent<CalendarHeaderPropTypes>(UI5CalendarHeader);

CalendarHeader.displayName = 'CalendarHeader';

export { CalendarHeader };
