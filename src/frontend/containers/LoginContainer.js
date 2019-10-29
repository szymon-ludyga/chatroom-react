import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { login, register } from '../actions/login';

import Login from '../components/Login';

const styles = () => ({
    container: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    button: {
        display: 'flex',
        marginTop: 15,
        fontSize: 30,
        width: '90%',
    },
    width60: {
        width: '60%'
    },
    width100: {
        width: '100%'
    },
    option: {
        width: '50%',
        margin: 10,
    },
    buttonDiv: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    textField: {
        display: 'flex',
        width: '90%',
    }
});

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        login: userInfo => dispatch(login(userInfo)),
        register: userInfo => dispatch(register(userInfo)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Login));
