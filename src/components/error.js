// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Styled Components
import styled from 'styled-components';

class Error extends Component {
    static propTypes = {
        title: PropTypes.string,
        error: PropTypes.string,
    }
  
    render() {
        const {title = "Oops!", error = "Unknown Error"} = this.props;
        return (
            <Wrapper>
                <h1>{title}</h1>
                <p>{error}</p>
            </Wrapper>
        );
    }

}

const Wrapper = styled.div`
  margin: auto;
  background-color: #323440;
  color: white;
  padding: 50px;
  text-align: center;
  border-radius: 8px;

  > h1 {
    padding-top: 10px;
    color: #DD6B74;
    font-size: 60px;
    user-select: none;
  }
`;

export default Error;