// * Redux
import {connect} from 'react-redux';

// * Components
import SignIn from 'components/screens/Auth/SignIn/SignIn.screen.js';
import SignUp from 'components/screens/Auth/SignUp/SignUp.screen.js';
import ResetPassword from 'components/screens/Auth/ResetPassword/ResetPassword.screen.js';
import Onboarding from 'components/screens/Auth/Onboarding/Onboarding.screen.js';
import ProfileSetup from 'components/screens/Auth/ProfileSetup/ProfileSetup.screen.js';
import MyProfile from 'components/screens/User/Profile/Profile.screen.js';
import EditProfile from 'components/screens/User/Profile/EditProfile.screen.js';
import Documents from 'components/screens/User/Profile/Documents.screen.js';
import Reports from 'components/screens/User/Home/Reports.screen.js';
import AddReport from 'components/screens/User/Home/AddReport.screen.js';
import MapsReports from 'components/screens/User/Home/MapsReports.screen.js';

import {
  setter,
  signIn,
  signUp,
  resetPassword,
  signInGoogle,
  signInFacebook,
  uploadFiles,
  getProfile,
  editUser,
  logout,
  getAllPosts,
  addPost,
  voteItem,
} from 'app-redux/actions/app/app.actions';
// * Map state to props
const mapStateToProps = (state, ownProps) => ({
  ...state.appReducer,
});

// * Map actions to props
const mapDispatchToProps = dispatch => ({
  setter: value => dispatch(setter(value)),
  signIn: (email, password) => dispatch(signIn(email, password)),
  signUp: (email, password) => dispatch(signUp(email, password)),
  resetPassword: email => dispatch(resetPassword(email)),
  signInGoogle: data => dispatch(signInGoogle(data)),
  signInFacebook: data => dispatch(signInFacebook(data)),
  uploadFiles: files => dispatch(uploadFiles(files)),
  getProfile: () => dispatch(getProfile()),
  editUser: (data, backForward) => dispatch(editUser(data, backForward)),
  logout: () => dispatch(logout()),
  getAllPosts: () => dispatch(getAllPosts()),
  addPost: data => dispatch(addPost(data)),
  voteItem: (index, field) => dispatch(voteItem(index, field)),
});

export default {
  SignIn: connect(mapStateToProps, mapDispatchToProps)(SignIn),
  SignUp: connect(mapStateToProps, mapDispatchToProps)(SignUp),
  ResetPassword: connect(mapStateToProps, mapDispatchToProps)(ResetPassword),
  Onboarding: connect(mapStateToProps, mapDispatchToProps)(Onboarding),
  ProfileSetup: connect(mapStateToProps, mapDispatchToProps)(ProfileSetup),
  MyProfile: connect(mapStateToProps, mapDispatchToProps)(MyProfile),
  EditProfile: connect(mapStateToProps, mapDispatchToProps)(EditProfile),
  Documents: connect(mapStateToProps, mapDispatchToProps)(Documents),
  Reports: connect(mapStateToProps, mapDispatchToProps)(Reports),
  AddReport: connect(mapStateToProps, mapDispatchToProps)(AddReport),
  MapsReports: connect(mapStateToProps, mapDispatchToProps)(MapsReports),
};
