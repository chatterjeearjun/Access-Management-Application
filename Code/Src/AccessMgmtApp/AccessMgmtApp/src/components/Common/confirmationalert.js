import React, { Component } from "react";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class ConfirmAlert extends Component {
  render() {
    return confirmAlert({
      title: this.title,
      message: this.message,
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            return true;
          },
        },
        {
          label: "Cancel",
          onClick: () => {
            return false;
          },
        },
      ],
    });
  }
}

export default ConfirmAlert;
