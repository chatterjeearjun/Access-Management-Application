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
import contactsSaga from "./contacts/saga";
import compGroupsSaga from "./GroupsManagement/saga";
import assetsSaga from "./AssetsManagement/saga";
import employeeProfileSaga from "./EmployeeProfile/saga";
import docsSaga from "./ReuiredDocuments/saga";
import dashboardSaga from "./Dashboard/saga";

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
    fork(contactsSaga),
    fork(compGroupsSaga),
    fork(assetsSaga),
    fork(employeeProfileSaga),
    fork(docsSaga),
    fork(dashboardSaga),
  ]);
}
