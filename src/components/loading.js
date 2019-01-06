// React
import React, {Component} from 'react';

// Styled Components
import styled from "styled-components";

// Components
import ReactLoading from 'react-loading';

class Loading extends Component {
  
  render() {
    return (
      <StyledLoading type='spin' color='#5A9CD4'/>
    );
  }

}

const StyledLoading = styled(ReactLoading)`
  margin: auto;
`;

export default Loading;