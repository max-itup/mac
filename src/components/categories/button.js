// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// ReactTooltip
import ReactTooltip from 'react-tooltip'

// Styled Components
import styled from 'styled-components';

class Button extends Component {
    static propTypes = {
        category: PropTypes.object.isRequired,
        onMouseUp: PropTypes.func.isRequired,
    }

    generateButton() {
        const {category, onMouseUp} = this.props;

        const id = `category-${category.id}`;
        const {selected_count = 0} = category

        let badge = null;
        if (selected_count > 0) {
            badge = <Badge>{selected_count}</Badge>
        }
        
        const img_url = `https://raw.githubusercontent.com/max-itup/contents/master/mac/assets/categories/${category.id}.svg?sanitize=true`
        const style = {backgroundImage: `url(${img_url})`}

        let toolTip = `${category.name} (${category.count})`
        return [
            <button key='button' id={id} title={category.name} onMouseUp={onMouseUp} style={style} data-tip={toolTip}>{badge}</button>,
            <ReactTooltip  key='tooltip' place="right" type="dark" effect="solid"/>
        ];
    }

    render() {
        return this.generateButton();
    }
}

const Badge = styled.span`
    position: absolute;
    top: -5px;
    right: -5px;
    user-select: none;
    pointer-events : none;
    background-color: #FE4654;
    padding: 3px 8px;
    font-size: 10px;
    border-radius: 10px;
`;

export default Button;