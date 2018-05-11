import React from 'react';
import ReactDOM from 'react-dom';

import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import StrikethroughS from '@material-ui/icons/StrikethroughS';
import Code from '@material-ui/icons/Code';
import BorderColor from '@material-ui/icons/BorderColor';

import Tooltip from 'material-ui/Tooltip';

import s from './HoveringMenu.scss';
import MARKS from '../constants/marks';

import updateHoverMenuPosition from '../helpers/updateHoverMenuPosition';

class HoveringMenu extends React.Component {
  constructor(props) {
    super(props);
    this.hoverMenuRef = React.createRef();
  }

  componentDidMount = () => {
    updateHoverMenuPosition(this.props.value, this.hoverMenuRef.current);
  }

  componentDidUpdate = () => {
    updateHoverMenuPosition(this.props.value, this.hoverMenuRef.current);
  }

  onClickMark(e, type) {
    const { value, onChange } = this.props;
    e.preventDefault();
    const change = value.change().toggleMark(type);
    onChange(change);
  }

  hasMark(type) {
    const { value } = this.props;
    return value.activeMarks.some(mark => mark.type === type);
  }

  renderMarkButton(type, tag, title) {
    const isActive = this.hasMark(type);
    const onMouseDown = e => this.onClickMark(e, type);
    let Tag;

    switch (tag) {
      case 'FormatBold':
        Tag = <FormatBold style={{ fontSize: 20 }} />;
        break;
      case 'FormatItalic':
        Tag = <FormatItalic style={{ fontSize: 20 }} />;
        break;
      case 'BorderColor':
        Tag = <BorderColor style={{ fontSize: 20 }} />;
        break;
      case 'StrikethroughS':
        Tag = <StrikethroughS style={{ fontSize: 20 }} />;
        break;
      case 'FormatUnderlined':
        Tag = <FormatUnderlined style={{ fontSize: 20 }} />;
        break;
      case 'Code':
        Tag = <Code style={{ fontSize: 20 }} />;
        break;
      default:
        return null;
    }

    return (
      /* eslint-disable */
      <Tooltip id={`tooltip-block-${type}`} title={title} placement="top">
        <span className={s.button} onMouseDown={onMouseDown} data-active={isActive}>
          {Tag}
        </span>
      </Tooltip>
      /* eslint-enable */
    );
  }

  render() {
    const root = window.document.getElementById('app');

    return ReactDOM.createPortal(
      <div className={s.hoverMenu} ref={this.hoverMenuRef}>
        {this.renderMarkButton(MARKS.BOLD, 'FormatBold', '⌘ + b')}
        {this.renderMarkButton(MARKS.ITALIC, 'FormatItalic', '⌘ + i')}
        {this.renderMarkButton(MARKS.HIGHLIGHT, 'BorderColor', '⌘ + e')}
        {this.renderMarkButton(MARKS.STRIKETHROUTH, 'StrikethroughS', '⌘ + d')}
        {this.renderMarkButton(MARKS.UNDERLINE, 'FormatUnderlined', '⌘ + u')}
        {this.renderMarkButton(MARKS.CODE, 'Code', '⌘ + shift + 9')}
      </div>,
      root,
    );
  }
}

export default HoveringMenu;
