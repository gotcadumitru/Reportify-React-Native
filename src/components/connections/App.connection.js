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
import Filter from 'components/screens/User/Home/Filter.screen.js';
import ReportContent from 'components/screens/User/Home/ReportContent.screen.js';
import Chat from 'components/screens/User/Home/Chat.screen.js';
import TypeReports from 'components/screens/User/Home/TypeReports.screen.js';
import Friends from 'components/screens/User/Profile/Friends.screen.js';

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
  getCategories,
  favoriteItem,
  resetFilters,
  getSinglePost,
  getAllUserMessages,
  addComment,
  getAllUsersLocation,
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
  resetFilters: () => dispatch(resetFilters()),
  getAllPosts: () => dispatch(getAllPosts()),
  addPost: data => dispatch(addPost(data)),
  voteItem: (index, field) => dispatch(voteItem(index, field)),
  getCategories: () => dispatch(getCategories()),
  favoriteItem: index => dispatch(favoriteItem(index)),
  getSinglePost: id => dispatch(getSinglePost(id)),
  getAllUserMessages: userId => dispatch(getAllUserMessages(userId)),
  addComment: payload => dispatch(addComment(payload)),
  getAllUsersLocation: payload => dispatch(getAllUsersLocation(payload)),
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
  Filter: connect(mapStateToProps, mapDispatchToProps)(Filter),
  ReportContent: connect(mapStateToProps, mapDispatchToProps)(ReportContent),
  Chat: connect(mapStateToProps, mapDispatchToProps)(Chat),
  TypeReports: connect(mapStateToProps, mapDispatchToProps)(TypeReports),
  Friends: connect(mapStateToProps, mapDispatchToProps)(Friends),
};
