// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {toggleItemSelection, loadScript} from '../redux/actions';

// Styled Components
import styled from 'styled-components';

// Helpers
import {generateScript, getSelectedItems} from '../utils';

// Assets
import checkmark from './../assets/checkmark.svg';

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {item, data} = this.props;    
    this.props.toggleItemSelection({item});

    let items = getSelectedItems(data);

    if (items.indexOf(item) === -1) {
      items.push(item);
    } else {
      items = items.filter(i => i !== item)
    }

    const script = generateScript(items);
    this.props.loadScript({script});
  }

  render() {
    const {item} = this.props;
    const {is_selected = false} = item    
  
    const img_url = `https://raw.githubusercontent.com/max-itup/contents/master/mac/assets/items/${item.id}.png`
    const style = {backgroundImage: `url(${img_url})`}
    style["border"] = is_selected ? "2px solid white" : null;

    const checkmark_style = is_selected ? {} : {display: 'none'};

    return [
      <Wrapper>
        <div style={style} onMouseUp={this.handleClick}>
          <Checkmark src={checkmark} alt='checkmark' style={checkmark_style}/>
          <h1><a href={item.download_url} target='_blanck'>{item.name}</a></h1>
          <p>{item.description}</p>
          <code>{item.type} <strong>{item.code}</strong></code>
        </div>
      </Wrapper>
    ];
  }
}

function mapStateToProps(store) {
  return store
}

function mapDispatchToProps(dispatch) {
  return {
    toggleItemSelection: (item) => dispatch(toggleItemSelection(item)),
    loadScript: (script) => dispatch(loadScript(script)),
  }
}

const Wrapper = styled.div`
padding: 10px;
height: 370px;
flex: 0 0 260px;
max-width: 260px;
color: white;

div {
  background-color: #323440;
  padding: 20px;
  height: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  box-shadow:inset 0 0 0 100em rgba(50,50,60,0.9);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border: 2px solid #252831;
  user-select: none;
  transition: 0.5s;

  :hover {
    background-color: #4D4F5C;
    box-shadow:inset 0 0 0 100em rgba(50,50,60,0.45);
    p, h1 {
      text-shadow: 1px 1px 10px #252831;
    }
  }

}

h1 {
  line-height: 0.85;
  margin-bottom: 15px;
  letter-spacing: 0;
}

a {
  font-size: 24px;
  color: white;

  :hover {
    color: #D19A66;
  }
}

p {
  font-size: 13px;
  overflow-y: hidden;
}

code {
  margin-top: auto;
  color: white;
  user-select: text;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
`;

const Checkmark = styled.img`
  margin-top: -30px;
  margin-right: -30px;
  margin-left: auto;
`;


export default connect(mapStateToProps, mapDispatchToProps)(Item);