import React from 'react';

export default class Form extends React.Component {
    state = {
        source: '',
        destination: '',
        message: '',
    }


    change = e => {
        this.props.onChange({ [e.target.name]: e.target.value })
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onSubmit(this.state)
        this.setState({
            source: '',
            destination: '',
            message: '',
        })
        this.props.onChange({
            source: '',
            destination: '',
            message: '',
        })
    }

    render() {
        return (
            <form>
                <input
                    name='source'
                    type='tel'
                    placeholder='Source'
                    value={this.state.source}
                    onChange={e => this.change(e)} />
                <br />
                <input
                    name='destination'
                    type='tel'
                    placeholder='Desnitation'
                    value={this.state.destination}
                    onChange={e => this.change(e)} />
                <br />
                <input
                    name='message'
                    type='text'
                    placeholder='Message'
                    value={this.state.message}
                    onChange={e => this.change(e)} />
                <br />
                <button onClick={e => this.onSubmit(e)}>Send </button>
            </form>
        );
    }
}