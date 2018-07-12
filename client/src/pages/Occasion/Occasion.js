import "./Occasion.css";
import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar.js';
import Footer from '../../components/Footer/Footer.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import SuggestionCard from "../../components/SuggestionCard";
import API from '../../utils/API';
import outfit from "../../items.json";
import Button from "../../components/Button";

var occasionId = window.location.pathname;
occasionId = occasionId.split("/");
occasionId = occasionId[2];

console.log(occasionId);

class Occasion extends Component {

    state = {
        suggestions: [],
        name: "",
        brandName: "",
        price: "",
        colour: "",
        baseImageUrl: "",
        url: "",
        proId: "",
        dresscode: "",
        season: "",
        items: "",
        colors: "",
        budget: ""

    };
    componentDidMount() {
        this.bringOccasion(occasionId);
    }

    bringOccasion = () => {
        API.getOccasion(occasionId)
            .then(response => {
                this.setState({
                    dresscode: response.data.dresscode,
                    season: response.data.season,
                    items: response.data.items,
                    colors: response.data.colors,
                    budget: response.data.budget
                })

            })
    }
    asosAjaxCall = () => {
        // event.preventDefault();
        // const queryParam = `${this.state.dresscode}+${this.state.season}+${this.state.items}`;
        const cOlors = this.state.colors;
        const bUdget = this.state.budget;
        const dressCode = this.state.dresscode;
        const iTems = this.state.items;
        const sEason = this.state.season;
        var queryObj = [
            dressCode,
            sEason,
            bUdget,
            iTems,
            cOlors
        ]
        API.getSuggestions(queryObj)
            .then(res => {
                this.setState({ suggestions: res.data })
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="paral paralsec3" id="paralsec3">
                    <div className="container-fluid">
                        <div className="row d-flex justify-content-center">
                            <div className="col-12 text-center">
                                <h4 className="display-3">Your Occasions</h4>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <Button className="btn btn-success" onClick={() => this.asosAjaxCall()} children={this.state.items}
                            />
                        </div>
                        <div className="row d-flex justify-content-center">
                            {this.state.suggestions.map((suggestions, key) => (
                                <SuggestionCard
                                    key={key}
                                    name={suggestions.name}
                                    brandName={suggestions.brandName}
                                    price={suggestions.price.current.text}
                                    colour={suggestions.colour}
                                    baseImageUrl={suggestions.baseImageUrl}
                                    proId={suggestions.id}
                                    // url="http://us.asos.com/search/?q=dress&page=1&store=2&lang=en-US&sizeschema=US&currency=USD&sort=freshness"
                                    url={`http://us.asos.com/${suggestions.name}/prd/${suggestions.id}?clr=${suggestions.colour}&SearchQuery=dress&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}
export default Occasion;
