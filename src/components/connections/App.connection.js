// * Redux
import {connect} from 'react-redux';

// * Components
import Splash from 'components/screens/Splash/Splash.screen.js';

import {setter} from 'app-redux/actions/app/app.actions';
// * Map state to props
const mapStateToProps = (state, ownProps) => ({
  ...state.appReducer,
});

// * Map actions to props
const mapDispatchToProps = dispatch => ({
  setter: value => dispatch(setter(value)),
});

export default {
  Splash: connect(mapStateToProps, mapDispatchToProps)(Splash),
};
