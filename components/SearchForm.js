import React, { Component } from 'react';
import Select from 'react-select'

// Define SearchForm Class

export default class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: null,
            selectedCat: null,
            options: [],
            categories: []
        };
    }


    handleChange = (option) => {
        this.setState({ selected: option });
        this.props.setNewsSource(option);
        event.preventDefault();
    }

    handleCategory = (option) => {
        this.setState({ selectedCat: option });
        this.props.setNewsCategory(option);
        event.preventDefault();
    }

    getOptions = () => {
        if (this.state.options.length == 0) {
            for (let i = 0; i < this.props.sources.length; i++) {
                this.state.options.push({ value: this.props.sources[i].id, label: this.props.sources[i].name });
            }
        }
        if (this.state.categories.length == 0) {
            for (let i = 0; i < this.props.categories.length; i++) {
                this.state.categories.push({ value: this.props.categories[i], label: this.props.categories[i] });
            }
        }
    }

    // Render the form
    render() {
        this.getOptions();
        const { selected } = this.state;
        const { selectedCat } = this.state;

        return (
            <div>
                <div id="search">
                    <h3>Select newsapi.org source</h3>
                    <Select
                        value={selected}
                        onChange={this.handleChange}
                        options={this.state.options}
                        placeholder={"Select or search for News Source.."}
                    />

                    <Select
                        value={selectedCat}
                        onChange={this.handleCategory}
                        options={this.state.categories}
                        placeholder={"Select by Category.."}
                    />
                </div>
                <style jsx>{`
                    h3 {
                        font-family: "Arial";
                        color: rgb(239,239,239);
                    }
                `}</style>
            </div>


        );
    }
}