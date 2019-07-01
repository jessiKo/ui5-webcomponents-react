import React, { Children, Component, CSSProperties, ReactNode, ReactNodeArray, RefObject } from 'react';
import styles from './OverflowToolbar.jss';
import { StyleClassHelper, withStyles } from '@ui5/webcomponents-react-base';
import { ToolbarAlignment } from '../../lib/ToolbarAlignment';
import { ToolbarDesign } from '../../lib/ToolbarDesign';
import { CommonProps } from '../../interfaces/CommonProps';
import { ClassProps } from '../../interfaces/ClassProps';
import { Popover } from '../../lib/Popover';
import { Button } from '../../lib/Button';
import { PlacementType } from '../../lib/PlacementType';
import boot from '@ui5/webcomponents-base/src/boot';

export interface ToolbarPropTypes extends CommonProps {
  width?: CSSProperties['width'];

  children: ReactNode | ReactNodeArray;

  align?: ToolbarAlignment;

  toolbarDesign?: ToolbarDesign;

  overflow?: boolean;
}

interface ToolbarInternalProps extends ToolbarPropTypes, ClassProps {}

@withStyles(styles)
export class OverflowToolbar extends Component<ToolbarInternalProps> {
  static defaultProps = {
    width: 'auto',
    align: ToolbarAlignment.Start,
    toolbarDesign: ToolbarDesign.ContentBar,
    overflow: true
  };
  state = {
    children: this.props.children,
    toolbarWidth: 0,
    popoverElements: [],
    popoverOpen: true,
    renderToggle: false,
    previousWidth: []
  };
  private toolbarRef: RefObject<HTMLDivElement> = React.createRef();

  componentDidMount(): void {
    boot().then(() => {
      if (this.props.overflow) {
        if (this.state.toolbarWidth === 0 && this.toolbarRef.current !== null) {
          this.setState({ toolbarWidth: this.toolbarRef.current.scrollWidth });
        }
        window.addEventListener('resize', () => {
          requestAnimationFrame(() => {
            this.handleResize();
          });
        });
      }
    });
  }

  componentDidUpdate(prevProps: Readonly<ToolbarInternalProps>, prevState, snapshot?: any): void {
    boot().then(() => {
      if (this.props.overflow && this.toolbarRef.current !== null) {
        if (this.toolbarRef.current.clientWidth < this.toolbarRef.current.scrollWidth) {
          this.handleResize();
        }
        if (this.props.width !== prevProps.width) {
          this.handleResize();
        }
      }
    });
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.handleResize);
  }

  private handleResize = () => {
    const toolbarRef = this.toolbarRef.current;
    let newChildren = this.state.children;
    let { popoverElements, renderToggle, previousWidth, toolbarWidth, children } = this.state;
    if (toolbarWidth > toolbarRef.clientWidth) {
      if (toolbarRef.clientWidth < toolbarRef.scrollWidth) {
        newChildren = Children.toArray(children).slice(0, -1);
        popoverElements = [Children.toArray(children).slice(-1)[0]].concat(popoverElements);
        renderToggle = true;
        previousWidth = [toolbarRef.scrollWidth + 10].concat(previousWidth);
      }
      this.setState({
        toolbarWidth: toolbarRef.scrollWidth,
        children: newChildren,
        renderToggle,
        popoverElements,
        previousWidth
      });
    }
    if (toolbarWidth < toolbarRef.clientWidth) {
      this.addToolbarItem(newChildren, popoverElements, previousWidth, renderToggle);
    }
  };

  private addToolbarItem(newChildren, popoverElements, previousWidth, renderToggle) {
    const toolbarRef = this.toolbarRef.current;
    let { children } = this.state;
    if (Children.count(this.props.children) !== Children.count(children)) {
      if (toolbarRef.clientWidth === toolbarRef.scrollWidth && toolbarRef.clientWidth >= previousWidth[0]) {
        const currentChildrenLength = Children.count(children);
        newChildren = Children.toArray(children).concat([
          Children.only(Children.toArray(this.props.children)[currentChildrenLength])
        ]);
        popoverElements.shift();
        previousWidth.shift();
      }
    }
    this.setState({
      toolbarWidth: toolbarRef.clientWidth,
      children: newChildren,
      popoverElements,
      previousWidth
    });
    if (Children.count(this.props.children) !== Children.count(children)) {
      if (toolbarRef.clientWidth === toolbarRef.scrollWidth && toolbarRef.clientWidth >= previousWidth[0]) {
        this.addToolbarItem(newChildren, popoverElements, previousWidth, renderToggle);
      }
    } else {
      this.setState({ renderToggle: false });
    }
  }

  render() {
    const { width, align, toolbarDesign, classes, className, style, tooltip } = this.props;
    const rootClasses = StyleClassHelper.of(classes.toolbarRoot);
    const overflowClasses = StyleClassHelper.of(classes.overflowRoot);

    switch (align) {
      case ToolbarAlignment.Start:
        rootClasses.put(classes.toolbarAlignStart);
        break;
      case ToolbarAlignment.End:
        rootClasses.put(classes.toolbarAlignEnd);
        break;
      case ToolbarAlignment.Middle:
        rootClasses.put(classes.toolbarAlignMiddle);
        break;
      case ToolbarAlignment.SpaceBetween:
        rootClasses.put(classes.toolbarAlignSpaceBetween);
        break;
      default:
        rootClasses.put(classes.toolbarAlignStart);
    }

    switch (toolbarDesign) {
      case ToolbarDesign.ContentBar:
        rootClasses.put(classes.contentBar);
        overflowClasses.put(classes.contentBar);
        break;
      case ToolbarDesign.PageFooter:
        rootClasses.put(classes.pageFooter);
        overflowClasses.put(classes.pageFooter);
        break;
      case ToolbarDesign.ContainerBar:
        rootClasses.put(classes.containerBar);
        overflowClasses.put(classes.containerBar);
        break;
      case ToolbarDesign.ContentBarTransparent:
        rootClasses.put(classes.contentBarTransparent);
        overflowClasses.put(classes.contentBarTransparent);
        break;
      default:
        rootClasses.put(classes.containerBar);
        overflowClasses.put(classes.containerBar);
    }

    if (className) {
      rootClasses.put(className);
    }

    const inlineStyle = { width };
    if (style) {
      Object.assign(inlineStyle, style);
    }
    return (
      <div className={rootClasses.valueOf()} style={{ ...inlineStyle }} title={tooltip} ref={this.toolbarRef}>
        {this.state.children}
        {this.state.renderToggle && (
          <Popover
            style={{ marginLeft: 'auto' }}
            key="popover"
            openBy={<Button icon="overflow" key={'overflowButton'} />}
            noHeader={true}
            placementType={PlacementType.Bottom}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>{this.state.popoverElements}</div>
          </Popover>
        )}
      </div>
    );
  }
}