// React
import React, {Component} from 'react';

// Styled Components
import styled from 'styled-components';

import logo from '../assets/mobile_logo.svg';

class Mobile extends Component {

    render() {
        return (
            <Wrapper>
                <img src={logo} alt='MaxItUp!'/>
                <h1>The new way to setup your newly formatted Mac.</h1>
                <p>This website is designed to work on desktop devices only. Please visit us back from your desktop</p>
                <a href='https://github.com/max-itup'  target='_blank' rel='noopener noreferrer'>View on Github</a>
            </Wrapper>
        );
    }

}

const Wrapper = styled.div`
  margin: auto;
  background-color: #323440;
  color: white;
  padding: 30px;
  text-align: center;
  border-radius: 8px;
  max-width: 80%;

  > img {
      width: calc(100% - 60px);
      max-width: 300px;
      height: auto;
      margin: 0 30px 10px 30px;
  }

  > h1 {
    color: #A1F366;
    font-size: 20px;
    margin-bottom: 20px;
  }

  > p {
    font-size: 12px;
    margin-bottom: 30px;
  }

  > a {
      padding: 10px 20px;
      background: #252831;
      color: white;
      border-radius: 5px;
      text-decoration: none;
  }

`;

export default Mobile;