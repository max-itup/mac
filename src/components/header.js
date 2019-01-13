// React
import React, {Component} from 'react';

// Styled Components
import styled from 'styled-components';

import logo from '../assets/header_logo.svg';
import scrollDown from '../assets/scroll_down.svg';

import 'animate.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        document.getElementById('header').nextSibling.scrollIntoView({ block: 'start',  behavior: 'smooth' });
    }

    render() {
        return (
            <Wrapper id='header'>
                <img src={logo} alt='MaxItUp!'/>
                <h1>MaxItUp is a Mac setup tool to create a setup script for newly formatted Mac devices.</h1>
                <p>
                Start selecting items and watch how the script is updating!
                <br/>
                Move to your download directory and use your terminal to run the script and install selected apps and packages by running <code>sh setup.sh</code>
                </p>
                <button className='animated infinite flash' onMouseUp={this.handleClick}><img src={scrollDown} alt='scroll down'/></button>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 25px;
    background: #252831;
    color: white;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;

    > h1 {
        font-size: 24px;
    }

    > p {
        padding: 20px 70px;
        
        code {
            user-select: text;
        }
    }

    > button {
        animation-duration: 5s;
        background: #252831;
        border: none;
        :focus {
            outline: 0;  
        }
    }
`;

export default Header;