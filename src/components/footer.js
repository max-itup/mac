// React
import React, {Component} from 'react';

// Styled Components
import styled from 'styled-components';

class Footer extends Component {

    render() {
        const omaralbeik = "https://omaralbeik.com";
        const org = "https://github.com/max-itup";
        const website = "https://max-itup.github.io/mac/";
        const message = "Check out MaxItUp, the new way to set up your newly formatted Mac! by @omaralbeik";
        const twitter = `https://twitter.com/home?status=${message}%0A${website}`;

        return (
            <Wrapper>
                <p>Copyright © {(new Date()).getFullYear()} <a href={omaralbeik} target="_blank" rel="noopener noreferrer">Omar Albeik</a>. All rights reserved.</p>
                <p style={{marginLeft: 'auto'}}>v0.1</p>
                <p>Share via <a className='twitter' href={twitter} target="_blank" rel="noopener noreferrer"> Twitter</a></p>
                <p>Fork me on <a className='github' href={org} target="_blank" rel="noopener noreferrer">Github</a></p>
            </Wrapper>
        );
    }

}

const Wrapper = styled.div`
  background-color: #20252C;
  color: #abb2bf;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 32px;
  position: fixed;
  bottom: 0;
  font-size: 14px;
  font-family: 'Source Code Pro', monospace;

  > p {
      margin: 0 2px ;
      padding: 0 12px;
      line-height: 32px;
  }

  a {
      color: #F5A623;
      :hover {
        color: #F8C105;
        text-decoration: none;
      }
  }

  .github {
    color: #BB95F2;
    :hover {
        color: #DCC4FF;
    }
  }

  .twitter {
    color: #38A1F3;
    :hover {
        color: #9ED5FF;
    }
  }
  
`;

export default Footer;