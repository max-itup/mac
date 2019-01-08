// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Styled Components
import styled from 'styled-components';

// Highlight
import Highlight from 'react-highlight'

// CSS
import './../styles/atom-one-dark.css';

import {placeholder} from '../utils/statics';

class Script extends Component {
  static propTypes = {
    script: PropTypes.string,
  }
  
  render() {
    let {script = ""} = this.props;
    script = placeholder.replace('{{MAIN}}', script);
    return (
      <Wrapper className='bash'>{script}</Wrapper>
    );
  }
}

export const Wrapper = styled(Highlight)`
  flex: 1;
  margin: 0;
  padding: 20px 20px 120px 20px !important;
  background-color: #323440;
  color: white;
  overflow-y: scroll;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: 12px;
  height: calc(100% - 32px);
  max-width: 500px;
  font-family: 'Source Code Pro', monospace;
`;

export default Script