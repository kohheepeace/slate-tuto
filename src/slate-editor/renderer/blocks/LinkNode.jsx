import React from 'react';
import Input from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Close from '@material-ui/icons/Close';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    border: '1px solid #e6e8eb',
  },
  tooltip: {
    background: '#fff',
  },
};

class LinkNode extends React.PureComponent {
  state = {
    open: false,
  }

  onClick = (e) => {
    const { node } = this.props;
    const href = node.data.get('href');

    e.stopPropagation();

    window.open(href, '_blank');
  }

  handleHrefChange = (e) => {
    const { node, editor } = this.props;

    e.stopPropagation();
    editor.change(c => c.setNodeByKey(node.key, {
      data: {
        href: e.target.value,
      },
    }));
  }

  unWrapLink = () => {
    const { node, editor } = this.props;

    editor.change(c => c.unwrapInlineByKey(node.key, {
      type: 'link',
    }));
  }

  openToolTip = () => {
    this.hrefInput.focus();
    this.setState({ open: true });
  }

  closeToolTip = () => {
    this.setState({ open: false });
  }

  render() {
    const {
      node, editor, attributes, children, classes,
    } = this.props;
    const { readOnly } = editor.props;
    const href = node.data.get('href');

    const { open } = this.state;

    return (
      <Tooltip
        classes={{
          tooltip: classes.tooltip,
        }}
        enterDelay={1000}
        id="tooltip-link"
        onOpen={this.openToolTip}
        open={open}
        placement="top"
        title={
          <div onMouseLeave={this.closeToolTip} style={{ paddingLeft: 10, border: '1px solid #e6e8eb', borderRadius: 5 }}>
            <Input
              style={{ verticalAlign: 'sub', minWidth: 300 }}
              disableUnderline
              inputRef={(input) => { this.hrefInput = input; }}
              value={href || ''}
              onChange={this.handleHrefChange}
            />
            <IconButton onClick={this.unWrapLink}>
              <Close />
            </IconButton>
          </div>
        }
      >
        <a
          href={href}
          {...attributes}
          onMouseDown={readOnly ? null : () => this.onClick}
          style={{ cursor: 'pointer' }}
        >
          {children}
        </a>
      </Tooltip>
    );
  }
}
export default withStyles(styles)(LinkNode);
