import React from 'react';
import Input from 'material-ui/Input';
import { blue } from 'material-ui/colors';

import s from './Image.scss';

class Image extends React.PureComponent {
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
      node, editor, attributes, isSelected,
    } = this.props;
    const src = node.data.get('src');
    const caption = node.data.get('caption');
    const { readOnly } = editor.props;

    const imgStyle = {
      cursor: readOnly ? 'auto' : 'move',
      border: isSelected ? `2px solid ${blue[500]}` : '',
    };

    return (
      <figure className={s.imageBlock} {...attributes}>
        <img src={src} style={imgStyle} alt="" />
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

export default Image;
