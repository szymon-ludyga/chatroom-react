/* eslint "max-len": ["error", { "code": 100, "tabWidth": 4 }] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button, TextField, FormHelperText
} from '@material-ui/core';
import classnames from 'classnames';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            option: 'login',
            name: '',
            password: '',
            screenWidth: window.innerWidth,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', () => this._handleResize());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
    }

    _handleResize = () => {
        this.setState({
            screenWidth: window.innerWidth
        });
    }

    _handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    }

    _handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    _handleSubmit = () => {
        const { name, password, option } = this.state;
        const { login, register, errorHide } = this.props;
        errorHide();
        /* eslint-disable-next-line no-unused-expressions */
        option === 'login' ? login({ name, password }) : register({ name, password });
    }

    _change = (option) => {
        this.setState({ option });
    }

    render() {
        const { classes, errorMessage, errorType } = this.props;
        const { option, screenWidth } = this.state;
        const isSmallerScreen = screenWidth < 600;
        return (
            <>
                <div className={classes.buttonDiv}>
                    <Button
                        onClick={() => this._change('login')}
                        className={classes.option}
                        variant="outlined"
                        color="primary"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={() => this._change('register')}
                        className={classes.option}
                        variant="outlined"
                        color="secondary"
                    >
                        Register
                    </Button>
                </div>
                <div className={classnames([
                    classes.container,
                    isSmallerScreen ? classes.width100 : classes.width60
                ])}
                >
                    {errorType === 'user-error'
                        && (
                            <FormHelperText
                                className={classes.red}
                            >
                                {errorMessage}
                            </FormHelperText>
                        )
                    }
                    <TextField
                        id="outlined-name"
                        label="Name"
                        className={classes.textField}
                        onChange={this._handleNameChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        onChange={this._handlePasswordChange}
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                    />
                    <Button
                        onClick={this._handleSubmit}
                        className={classes.button}
                        variant="contained"
                        color={option === 'login' ? 'primary' : 'secondary'}
                    >
                        {option === 'login' ? 'Login' : 'Register'}
                    </Button>
                </div>
            </>
        );
    }
}

Login.propTypes = {
    errorType: PropTypes.string,
    errorMessage: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    errorHide: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
};
