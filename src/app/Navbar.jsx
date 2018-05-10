import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';

/* slate plugin */
import SlateEditTable from '@strelka/slate-edit-table';
import SlateEditList from 'slate-edit-list';
import SlateEditCode from 'slate-edit-code';
import SlateEditBlockquote from 'slate-edit-blockquote';

/* icon for marks */
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import BorderColor from '@material-ui/icons/BorderColor';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import StrikethroughS from '@material-ui/icons/StrikethroughS';
import Code from '@material-ui/icons/Code';

/* icons for blocks */
import FormatQuote from '@material-ui/icons/FormatQuote';
import GridOn from '@material-ui/icons/GridOn';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import CheckBox from '@material-ui/icons/CheckBox';

import MARKS from '../slate-editor/constants/marks';
import BLOCKS from '../slate-editor/constants/blocks';

import s from './Navbar.scss';


const ListPlugin = SlateEditList({
  types: [BLOCKS.OL_LIST, BLOCKS.UL_LIST],
  typeItem: BLOCKS.LIST_ITEM,
});

const CheckListPlugin = SlateEditList({
  types: [BLOCKS.CHECK_LIST],
  typeItem: BLOCKS.CHECK_LIST_ITEM,
});

const BlockquotePlugin = SlateEditBlockquote();

const CodePlugin = SlateEditCode();

const TablePlugin = SlateEditTable();

function Navbar(props) {
  function hasMark(type) {
    const { value } = props;
    return value.activeMarks.some(mark => mark.type === type);
  }

  function hasBlock(type) {
    const { value } = props;
    return value.blocks.some(node => node.type === type);
  }

  function onClickMark(e, type) {
    e.preventDefault();
    const { value } = props;
    const change = value.change().toggleMark(type);

    props.onChange(change);
  }

  function renderMarkButton(type, title) {
    const isActive = hasMark(type);
    const onMouseDown = e => onClickMark(e, type);

    let Tag;

    switch (type) {
      case MARKS.BOLD:
        Tag = <FormatBold style={{ fontSize: 20 }} />;
        break;
      case MARKS.ITALIC:
        Tag = <FormatItalic style={{ fontSize: 20 }} />;
        break;
      case MARKS.HIGHLIGHT:
        Tag = <BorderColor style={{ fontSize: 20 }} />;
        break;
      case MARKS.STRIKETHROUGH:
        Tag = <StrikethroughS style={{ fontSize: 20 }} />;
        break;
      case MARKS.UNDERLINE:
        Tag = <FormatUnderlined style={{ fontSize: 20 }} />;
        break;
      case MARKS.CODE:
        Tag = <Code style={{ fontSize: 20 }} />;
        break;
      default:
        return null;
    }

    return (
      /* eslint-disable */
      <Tooltip id={`tooltip-block-${type}`} title={title} placement="bottom">
        <span className={s.button} onMouseDown={onMouseDown} data-active={isActive}>
          {Tag}
        </span>
      </Tooltip>
      /* eslint-enable */
    );
  }

  function onClickBlock(e, type) {
    e.preventDefault();

    const { value } = props;
    const change = value.change();

    switch (type) {
      case BLOCKS.HEADING_1:
      case BLOCKS.HEADING_2:
      case BLOCKS.HEADING_3:
      {
        const isActive = hasBlock(type);
        change.setBlocks(isActive ? BLOCKS.PARAGRAPH : type);
        break;
      }
      case BLOCKS.HR: {
        change.setBlocks({ type, isVoid: true });
        break;
      }
      case BLOCKS.BLOCKQUOTE: {
        const isActive = BlockquotePlugin.utils.isSelectionInBlockquote(value);
        return isActive ?
          props.onChange(BlockquotePlugin.changes.unwrapBlockquote(change))
          :
          props.onChange(BlockquotePlugin.changes.wrapInBlockquote(change));
      }
      case BLOCKS.CODE_BLOCk: {
        CodePlugin.changes.toggleCodeBlock(change);
        break;
      }
      case BLOCKS.TABLE: {
        const isActive = TablePlugin.utils.isSelectionInTable(value);
        return isActive ?
          props.onChange(TablePlugin.changes.removeTable(change))
          :
          props.onChange(TablePlugin.changes.insertTable(change));
      }
      case BLOCKS.UL_LIST: {
        const isActive = ListPlugin.utils.isSelectionInList(value)
                    && ListPlugin.utils.getCurrentList(value).type === type;
        return isActive ?
          props.onChange(ListPlugin.changes.unwrapList(change))
          :
          props.onChange(ListPlugin.changes.wrapInList(change, type));
      }
      case BLOCKS.OL_LIST: {
        const isActive = ListPlugin.utils.isSelectionInList(value)
                    && ListPlugin.utils.getCurrentList(value).type === type;
        return isActive ?
          props.onChange(ListPlugin.changes.unwrapList(change))
          :
          props.onChange(ListPlugin.changes.wrapInList(change, type));
      }
      case BLOCKS.CHECK_LIST: {
        const isActive = CheckListPlugin.utils.isSelectionInList(value)
                    && CheckListPlugin.utils.getCurrentList(value).type === type;
        return isActive ?
          props.onChange(CheckListPlugin.changes.unwrapList(change))
          :
          props.onChange(CheckListPlugin.changes.wrapInList(change, type));
      }
      default:
        return null;
    }

    return props.onChange(change);
  }

  function renderBlockButton(type, title) {
    const { value } = props;
    const onMouseDown = e => onClickBlock(e, type);

    let isActive;
    let Tag;

    switch (type) {
      case BLOCKS.HEADING_1:
      {
        isActive = hasBlock(type);
        Tag = <div style={{ height: 22, fontSize: 16, fontWeight: 500 }}>H1</div>;
        break;
      }
      case BLOCKS.HEADING_2:
      {
        isActive = hasBlock(type);
        Tag = <div style={{ height: 22, fontSize: 16, fontWeight: 500 }}>H2</div>;
        break;
      }
      case BLOCKS.HEADING_3:
      {
        isActive = hasBlock(type);
        Tag = <div style={{ height: 22, fontSize: 16, fontWeight: 500 }}>H3</div>;
        break;
      }
      case BLOCKS.HR:
      {
        isActive = hasBlock(type);
        Tag = <div style={{ height: 22, fontSize: 16, fontWeight: 500 }}>HR</div>;
        break;
      }
      case BLOCKS.BLOCKQUOTE:
      {
        isActive = BlockquotePlugin.utils.isSelectionInBlockquote(value);
        Tag = <FormatQuote style={{ fontSize: 20 }} />;
        break;
      }
      case BLOCKS.CODE_BLOCK:
      {
        Tag = <Code style={{ fontSize: 18, border: '1px solid', borderRadius: 4 }} />;
        isActive = CodePlugin.utils.isInCodeBlock(value);
        break;
      }
      case BLOCKS.TABLE:
      {
        isActive = TablePlugin.utils.isSelectionInTable(value);
        Tag = <GridOn style={{ fontSize: 20 }} />;
        break;
      }
      case BLOCKS.UL_LIST:
      {
        isActive = ListPlugin.utils.isSelectionInList(value)
                    && ListPlugin.utils.getCurrentList(value).type === type;
        Tag = <FormatListBulleted style={{ fontSize: 20 }} />;
        break;
      }
      case BLOCKS.OL_LIST:
      {
        isActive = ListPlugin.utils.isSelectionInList(value)
                    && ListPlugin.utils.getCurrentList(value).type === type;
        Tag = <FormatListNumbered style={{ fontSize: 20 }} />;
        break;
      }
      case BLOCKS.CHECK_LIST:
      {
        isActive = CheckListPlugin.utils.isSelectionInList(value)
                    && CheckListPlugin.utils.getCurrentList(value).type === type;
        Tag = <CheckBox style={{ fontSize: 20 }} />;
        break;
      }
      default:
        return null;
    }

    return (
      /* eslint-disable */
      <Tooltip id={`tooltip-block-${type}`} title={title} placement="bottom">
        <span className={s.button} onMouseDown={onMouseDown} data-active={isActive}>
          {Tag}
        </span>
      </Tooltip>
      /* eslint-enable */
    );
  }

  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Slate-Tuto
        </Typography>
        <div className={s.editorTools}>
          {renderMarkButton(MARKS.BOLD, '⌘ + b')}
          {renderMarkButton(MARKS.ITALIC, '⌘ + i')}
          {renderMarkButton(MARKS.HIGHLIGHT, '⌘ + e')}
          {renderMarkButton(MARKS.STRIKETHROUGH, '⌘ + d')}
          {renderMarkButton(MARKS.UNDERLINE, '⌘ + u')}
          {renderMarkButton(MARKS.CODE, '⌘ + shift + 9')}
          {renderBlockButton(BLOCKS.HEADING_1, '# + space')}
          {renderBlockButton(BLOCKS.HEADING_2, '## + space')}
          {renderBlockButton(BLOCKS.HEADING_3, '### + space')}
          {renderBlockButton(BLOCKS.HR, '--- + enter')}
          {renderBlockButton(BLOCKS.BLOCKQUOTE, '> + space')}
          {renderBlockButton(BLOCKS.CODE_BLOCK, '```foo.rb:ruby + enter')}
          {renderBlockButton(BLOCKS.TABLE, 'table:2x3 + enter')}
          {renderBlockButton(BLOCKS.UL_LIST, '- + space')}
          {renderBlockButton(BLOCKS.OL_LIST, '1. + space')}
          {renderBlockButton(BLOCKS.CHECK_LIST, '[] + space')}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
