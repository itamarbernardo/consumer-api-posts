import './styles.css'

import { Component } from "react";

export class Button extends Component {
    //Nas classes, as Props chegam automaticamente
    render () {
        const {text, handleClick, disabled} = this.props

        return (
            <button className="button" disabled={disabled} onClick={handleClick}>{text}</button>
        )
    }
}