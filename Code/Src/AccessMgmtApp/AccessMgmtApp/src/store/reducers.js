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

//compGroups
import compGroups from "./GroupsManagement/reducer";

//AssetsManagement
import assetsManagement from "./AssetsManagement/reducer";

//EmployeeProfile
import employeeProfileReducer from "./EmployeeProfile/reducer";

//EmployeeProfile
import docsManagement from "./ReuiredDocuments/reducer";

import dashboardManagement from "./Dashboard/reducer";

import rolesManagement from "./RolesManagement/reducer";

import employeesManagement from "./EmployeeManagement/reducer";

import adminTeam from "./AdminManagement/reducer";

import ticketingSystem from "./TicketingSystem/reducer";

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
  compGroups,
  assetsManagement,
  employeeProfileReducer,
  docsManagement,
  dashboardManagement,
  rolesManagement,
  employeesManagement,
  adminTeam,
  ticketingSystem,
});

export default rootReducer;
