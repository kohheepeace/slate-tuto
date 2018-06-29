import React from 'react';
import Input from 'material-ui/Input';
import { blue } from 'material-ui/colors';
import { DragSource } from 'react-dnd';

import s from './Image.scss';

const imageSource = {
  canDrag(props) {
    return !props.readOnly;
  },
  /* eslint-disable */
  beginDrag(props) {
    return {};
  },
  /* eslint-enable */
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

class Image extends React.PureComponent {
  // https://github.com/ianstormtaylor/slate/issues/772
  // http://react-dnd.github.io/react-dnd/examples-customize-handles-and-previews.html
  /* Preview image not working and help wanted! */
  componentDidMount() {
    const newDiv = document.createElement('div');
    this.props.connectDragPreview(newDiv);
  }

  onClick = (e) => {
    e.stopPropagation();
  }

  handleCaption = (e) => {
    const caption = e.target.value;
    const { node, editor } = this.props;
    const src = node.data.get('src');

    editor.change(c => c.setNodeByKey(node.key, { data: { caption, src } }));
  }

  render() {
    const {
      node, editor, attributes, connectDragSource, isDragging, isSelected,
    } = this.props;
    const src = node.data.get('src');
    const caption = node.data.get('caption');
    const { readOnly } = editor.props;

    const imgStyle = {
      cursor: readOnly ? 'auto' : 'move',
      border: isSelected ? `2px solid ${blue[500]}` : '',
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <figure className={s.imageBlock} {...attributes}>
        {connectDragSource(<img src={src} style={imgStyle} alt="" />)}
        <figcaption>
          {readOnly ?
            caption
            :
            <Input
              type="text"
              placeholder="Type a caption"
              value={caption}
              disableUnderline
              style={{ fontSize: '0.6rem' }}
              onChange={this.handleCaption}
              onClick={this.onClick}
            />
          }
        </figcaption>
      </figure>
    );
  }
}

export default DragSource('image', imageSource, collect)(Image);
