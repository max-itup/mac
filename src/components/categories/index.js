// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Styled Components
import styled from 'styled-components';

// Components
import Button from './button';

class Categories extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const id = e.target.id.replace('category-', '');
    document.getElementById(id).scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }

  render() {
    const {categories} = this.props;

    return (
      <Wrapper>
        {categories.map(c => <Button key={c.id} category={c} onMouseUp={this.handleClick}/>)}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 70px;
  background-color: #323440;
  display: block;
  overflow-y: auto;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  height: calc(100% - 32px);

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }

  > button {
    position: relative;
    font-size: 22px;
    margin-bottom: 14px;
    width: 46px;
    height: 46px;
    background-color: #252831;
    color: white;
    border: 0;
    border-radius: 5px;

    :hover {
      background-color: black;
    }

    :focus {
        outline: 0;
    }

  }
`;

export default Categories;
