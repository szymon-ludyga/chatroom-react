import React, { Component } from 'react';
import {
    FormControl, Button, Typography, InputLabel, Input, Divider, OutlinedInput
} from '@material-ui/core';

export default class Home extends Component {
    state = { username: null };


    componentDidMount() {
        fetch('/api/username')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }));
    }

    handleChange(e) {
        console.time('timerLabel');
        console.table({ value: e.target.value });
        console.timeEnd('timerLabel');
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <FormControl>
                    <InputLabel htmlFor="component-outlined">
                        Name
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        value={name}
                        onChange={this.handleChange}
                    />
                    <Button className={classes.big} variant="contained" color="primary">
                        Login
                    </Button>
                </FormControl>
            </React.Fragment>
        );
    }
}
