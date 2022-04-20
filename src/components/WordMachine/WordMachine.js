import React, { useState, Fragment } from "react";
import '../../bootstrap.min.css'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";

const SEARCH_URI = 'https://cdbnttbopk.execute-api.us-east-1.amazonaws.com/dev/invoke-sm'

export const WordMachine = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSearch = (query) => {
        setIsLoading(true);
        console.log('query: ', query)
        const data = {
            "inputs": query,
            "parameters": {
                "max_length": 30,
                "no_repeat_ngram_size": 2,
                "do_sample": true,
                "top_k": 75,
                "num_return_sequences": 3,
                "temperature": 0.99,
                "top_p": 0.95
            }
        }
        fetch(SEARCH_URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(data)
        })
            .then((resp) => resp.json())
            .then((items) => {
                console.log(items)
                const options = items.map((i) => ({
                    generated_text: i.generated_text,
                }));

                setOptions(options);
                setIsLoading(false);
            });
    }

    const filterBy = () => true;

    //
    // handleChange(event: any) {
    //     //get value from input
    //     console.log('event: ', event)
    //     //construct a body object
    //     const data = {
    //         "inputs": event.target.value,
    //         "parameters": {
    //             "max_length": 20,
    //             "no_repeat_ngram_size": 2,
    //             "do_sample": true,
    //             "top_k": 75,
    //             "num_return_sequences": 3,
    //             "temperature": 0.99,
    //             "top_p": 0.95
    //         }
    //     }
    //     //send it in the fetch
    //     this.setState({value: event.target.value});
    //     fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'text/plain'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then(response => response.json())
    //         .then(data => console.log(data));
    //
    // }

    return (
        <AsyncTypeahead
            filterBy={filterBy}
            id="async-example"
            isLoading={isLoading}
            labelKey="generated_text"
            minLength={3}
            onSearch={handleSearch}
            options={options}
            placeholder="Start typing"
            renderMenuItemChildren={(option, props) => (
                <Fragment>
                    <span>{option.generated_text}</span>
                </Fragment>
            )}
        />

        //<input type="text" value={this.state.value} onChange={this.handleChange} />
    );
}

//export default WordMachine;
// export const Requirements = () => {
//     return(<p>hello world</p>);
// }