import React, { Component } from "react";
import "./SuggestionCard.css"
class SuggestionCard extends Component {

    state = {
        suggestions: [],
        searchTerm: "",
        name: "",
        brandName: "",
        price: "",
        colour: "",
        baseImageUrl: "",
        url: "",
        proId: ""
    };
    render() {
        return (
            <div className="col-12 col-sm-10 col-md-2 w3-animate-top card-suggestion">
                <div className="card">
                    <a href={this.props.url}><img className="card-img-top img-fluid suggestion-card-img" src={this.props.baseImageUrl} alt="wedding-img" /></a>
                    <div className="card-body">
                        <p className="card-title">Brand: {this.props.brandName}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Name: {this.props.name.replace(/^(.{25}[^\s]*).*/, "$1")}</li>
                        <li className="list-group-item">Price: {this.props.price}</li>
                        <li className="list-group-item">Colour: {this.props.colour}</li>
                        <li className="list-group-item"><a href={this.props.url} target="_blank">Go To Website</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default SuggestionCard;