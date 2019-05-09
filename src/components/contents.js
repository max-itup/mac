// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Styled Components
import styled from 'styled-components';

// Components
import Category from './category';
import Header from './header';

class Contents extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render() {
    const {data} = this.props;
    return (
      <Wrapper>
        <Header/>
        {data.map(c => <Category key={c.id} category={c}/>)}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background-color: #252831;
  flex: 2.15;
  overflow: scroll;
  height: calc(100% - 32px);
  overflow-x: hidden;
`;

export default Contents;
