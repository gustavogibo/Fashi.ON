import React, { Component } from "react";
import "./Survey.css";
import API from '../../utils/API';
import Questions from "../../components/Questions";
import CheckBoxes from "../../components/CheckBoxes";
import options from "../../options.json";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import Background from './survey-bg.jpg';

class Survey extends Component {

    state = {
        dresscode: "",
        season: "",
        budget: 10,
        colors: [],
        items: [],
        checked: this.props.checked || false
    }

    handleInputChangeRange = event => {
        const { name, value } = event.target;

        document.getElementById("budget-value").innerHTML = `$ ${value}`;

        console.log(value);
        this.setState({
            [name]: value
        });

    };

    handleInputChange = event => {
        const { name, value } = event.target;
        console.log(value);
        this.setState({
            [name]: value
        });

    };

    handleInputChangeCheckBox = event => {

        const { name, value } = event.target;
        if (name === "colors") {
            console.log("clicked", value);
            if (this.state.colors.indexOf(value) === -1) {

                this.state.colors.push(value);

            } else {

                this.state.colors.splice(this.state.colors.indexOf(value), 1);

            }
            console.log(this.state.colors);
            this.setState({
                [name]: this.state.colors
            });
        } else {
            console.log("clicked", value);
            if (this.state.items.indexOf(value) === -1) {

                this.state.items.push(value);

            } else {

                this.state.items.splice(this.state.items.indexOf(value), 1);

            }
            console.log(this.state.items);
            this.setState({
                [name]: this.state.items
            });
        }


    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.dresscode && this.state.season && this.state.budget && this.state.colors && this.state.items) {
            API.createOccasion({
                dresscode: this.state.dresscode,
                season: this.state.season,
                budget: this.state.budget,
                colors: this.state.colors,
                items: this.state.items,
                id: "5b3fae866249ea09212c275f"
            })
                .then(res => {
                    this.setState({ dresscode: "", season: "", budget: "", colors: "" })
                    window.location.href = "/dashboard";
                })
                .catch(err => console.log(err));
        }
    };
    handleClick = (e) => {
        this.setState({ checked: e.target.checked });
    }
    render() {
        document.body.style.backgroundImage = `url(${Background})`
        return (
            <div>
                <Navbar />
                <div className="d-flex justify-content-center bg-survey">
                    <form className="budget-form">
                        <h2 className="text-center">Let's get some information about your next occasion!</h2>
                        {options.map((op, key) => (
                            <Questions
                                question={op.question}
                                id={op.id}
                                key={key}
                                name={op.name}
                                option1={op.option1}
                                option2={op.option2}
                                option3={op.option3}
                                option4={op.option4}
                                value={this.state.op}
                                change={this.handleInputChange}
                            />
                        ))}
                        <CheckBoxes
                            change={this.handleInputChangeCheckBox}
                            value={this.state.colors}
                            type="colors"
                            click={this.handleClick}
                        />
                        <CheckBoxes
                            change={this.handleInputChangeCheckBox}
                            value={this.state.items}
                            type="items"
                            click={this.handleClick}
                        />
                        <div className="form-group">
                            <label for="formControlRange">My budget range:</label>
                            <p id="budget-value">$ 10</p>
                            <input
                                type="range"
                                className="form-control-range"
                                name="budget"
                                value={this.state.budget}
                                id="formControlRange"
                                onChange={this.handleInputChangeRange}
                                min="10"
                                max="1000"
                            />
                        </div>
                        {/* onclick of this button will create a new users account */}
                        <Button onClick={this.handleFormSubmit} children='Submit' />
                    </form>
                </div>
            </div>

        );
    }
}
export default Survey;