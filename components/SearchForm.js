import React, { Component } from 'react';
import Select from 'react-select'

// Define SearchForm Class

export default class SearchForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selected : null,
            options : []
        };
    }

    handleChange = (option) => {
        this.setState({ option });
        this.props.setNewsSource(option);
        event.preventDefault();
    }

    getOptions = () => {
        for (let i = 0; i < this.props.sources.length; i++) {
            this.state.options.push({value : this.props.sources[i].id, label : this.props.sources[i].name});
        }
    }

    // Render the form
    render() {
        const { selected } = this.state;
        this.getOptions();

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