import UI5TableCell from '@ui5/webcomponents/dist/TableCell';
import React, { FC, ReactNode } from 'react';
import { withWebComponent, WithWebComponentPropTypes } from '../../internal/withWebComponent';

export interface TableCellPropTypes extends WithWebComponentPropTypes {
  content?: ReactNode | ReactNode[];
}

const TableCell: FC<TableCellPropTypes> = withWebComponent<TableCellPropTypes>(UI5TableCell);

TableCell.displayName = 'TableCell';

export { TableCell };
