import { StyleClassHelper, withStyles } from '@ui5/webcomponents-react-base';
import React, { CSSProperties, FC, ReactNode } from 'react';
import { ClassProps } from '../../interfaces/ClassProps';
import { CommonProps } from '../../interfaces/CommonProps';
import { ThemeOptions } from '../../interfaces/ThemeOptions';
import { TextStyles } from './Text.jss';

export interface TextProps extends CommonProps {
  /**
   * Pass the text as direct child of Text
   */
  children: string | JSX.Element | ReactNode;
  /**
   * An optional theme override to be passed. Will win against the theme provided by the ThemeProvider
   */
  theme?: ThemeOptions;

  renderWhitespace?: boolean;

  wrapping?: boolean;

  width?: CSSProperties['width'];
}

interface TextInternalProps extends TextProps, ClassProps {}

export const Text: FC<TextProps> = withStyles(TextStyles)((props: TextInternalProps) => {
  const { classes, children, renderWhitespace, wrapping, width, className, style, tooltip } = props;
  const classNameString = StyleClassHelper.of(classes.text);
  if (wrapping === false) {
    classNameString.put(classes.noWrap);
  }
  if (renderWhitespace) {
    classNameString.put(classes.renderWhitespace);
  }
  if (className) {
    classNameString.put(className);
  }
  const inlineStyles = { width };
  if (style) {
    Object.assign(inlineStyles, style);
  }
  return (
    <span style={inlineStyles} className={classNameString.toString()} title={tooltip} slot={props['slot']}>
      {children}
    </span>
  );
});

Text.defaultProps = {
  renderWhitespace: false,
  wrapping: true,
  width: null
};
