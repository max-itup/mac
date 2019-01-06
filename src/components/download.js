// React
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';

// Styled Components
import styled from 'styled-components';

// Assets
import icon from './../assets/download.svg';

class Download extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {script} = this.props.script;
    const element = document.createElement("a");
    const file = new Blob([script], {type: 'application/x-sh'});
    element.href = URL.createObjectURL(file);
    element.download = "setup.sh";
    element.click();
  }

  render() {
    const {script = ""} = this.props.script;    
    const disabled = (script === "");

    return (
      <Button style={{backgroundImage: `url(${icon})`}} onClick={this.handleClick} disabled={disabled}/>
    );
  }
}

function mapStateToProps(script) {
  return script
}

const Button = styled.button`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 60px;
  right: 30px;
  background-color: #F8C105;
  border: 0;
  border-radius: 50px;
  background-position: center;

  :hover {
    background-color: #F5A623;
  }
  
  :disabled {
    background-color: #F8C105;
    opacity: 0.5;
  }

  :focus {
      outline: 0;
  }

`;

export default connect(mapStateToProps, null)(Download);