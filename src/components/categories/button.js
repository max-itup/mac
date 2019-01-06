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
        
        var img_url;
        var button;
        try {
            img_url = require(`../../assets/categories/${category.id}.svg`);
            const style = {backgroundImage: `url(${img_url})`}
            button = <button key='button' id={id} onMouseUp={onMouseUp} style={style} data-tip={category.name}>{badge}</button>

        } catch {
            let initials = category.name.match(/\b\w/g) || [];
            initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();            
            button = <button key='button' id={id} onMouseUp={onMouseUp} data-tip={category.name}>{initials}{badge}</button>
        }

        return [
            button,
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