import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

//Calendar
import calendar from "./calendar/reducer";

//chat
import chat from "./chat/reducer";

//invoices
import invoices from "./invoices/reducer";

//contacts
import contacts from "./contacts/reducer";

//compGroups
import compGroups from "./GroupsManagement/reducer";

//AssetsManagement
import assetsManagement from "./AssetsManagement/reducer";

//EmployeeProfile
import employeeProfileReducer from "./EmployeeProfile/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  chat,
  invoices,
  contacts,
  compGroups,
  assetsManagement,
  employeeProfileReducer,
});

export default rootReducer;
