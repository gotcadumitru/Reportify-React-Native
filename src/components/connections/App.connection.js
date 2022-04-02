// * Redux
import {connect} from 'react-redux';

// * Components
import Splash from 'components/screens/Splash/Splash.screen.js';
import SignIn from 'components/screens/Auth/SignIn/SignIn.screen.js';
import SignUp from 'components/screens/Auth/SignUp/SignUp.screen.js';
import ResetPassword from 'components/screens/Auth/ResetPassword/ResetPassword.screen.js';
import Onboarding from 'components/screens/Onboarding/Onboarding.screen.js';

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
  SignIn: connect(mapStateToProps, mapDispatchToProps)(SignIn),
  SignUp: connect(mapStateToProps, mapDispatchToProps)(SignUp),
  ResetPassword: connect(mapStateToProps, mapDispatchToProps)(ResetPassword),
  Onboarding: connect(mapStateToProps, mapDispatchToProps)(Onboarding),
};
