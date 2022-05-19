import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import calendarSaga from "./calendar/saga";
import chatSaga from "./chat/saga";
import invoiceSaga from "./invoices/saga";
import compGroupsSaga from "./GroupsManagement/saga";
import assetsSaga from "./AssetsManagement/saga";
import employeeProfileSaga from "./EmployeeProfile/saga";
import docsSaga from "./ReuiredDocuments/saga";
import dashboardSaga from "./Dashboard/saga";
import rolesSaga from "./RolesManagement/sagas";
import approversSaga from "./AdminManagement/saga";
import employeesSaga from "./EmployeeManagement/saga";
import ticketsSaga from "./TicketingSystem/saga";
import companySettingsSaga from "./CompanySettings/saga";
import AiEngineSettingsSaga from "./AiEngineSettings/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(invoiceSaga),
    fork(compGroupsSaga),
    fork(assetsSaga),
    fork(employeeProfileSaga),
    fork(docsSaga),
    fork(dashboardSaga),
    fork(employeesSaga),
    fork(approversSaga),
    fork(rolesSaga),
    fork(ticketsSaga),
    fork(companySettingsSaga),
    fork(AiEngineSettingsSaga),
  ]);
}
