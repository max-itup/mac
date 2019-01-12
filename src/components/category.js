// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Styled Components
import styled from 'styled-components';

// Components
import Item from './item';

class Category extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired
  }

  render() {
    const {category} = this.props;
    let items = Object.entries(category.children).map(([_, v]) => v);

    items.sort((i1, i2) => {
      if(i1.id < i2.id) { return -1; }
      if(i1.id > i2.id) { return 1; }
      return 0;
    })    

    return (
      <Wrapper id={category.id}>
        <h1>{category.name} ({category.count})</h1>
        <CellsWrapper>
          {items.map(i => <Item key={i.id} item={i}/>)}
        </CellsWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background-color: #252831;
  padding: 20px;

  > h1 {
    padding: 40px 20px 10px 10px;
    color: #A1F366;
    font-size: 30px;
    user-select: none;
  }

`;

const CellsWrapper = styled.div`
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    display: flex;
    flex-flow: wrap;
`;

export default Category;
