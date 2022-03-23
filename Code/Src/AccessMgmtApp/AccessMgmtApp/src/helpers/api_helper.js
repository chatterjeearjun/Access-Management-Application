import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";

//pass new generated access token here
const token = accessToken;

//apply base url for axios
const API_URL = "https://localhost:5001";

const axiosApi = axios.create({
  baseURL: API_URL,
});

// axiosApi.defaults.headers.common["Authorization"] = token;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
const compid = 1;
export async function get(url, id) {
  try {
    debugger;
    const response = await fetch(
      `${API_URL}${url}${id !== null && id !== undefined ? id : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "get error");
  }
}

export async function getAAssociation(url, asset) {
  try {
    debugger;
    const response = await fetch(
      `${API_URL}${url}${asset.company_identifier}/${asset.asset_identifier}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "get error");
  }
}

export async function post(url, data) {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
    debugger;
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error, "post error");
  }
}
export async function postforlogin(url, data, config = {}) {
  debugger;
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url, formdata) {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: "PUT",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
    debugger;
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "post error");
  }
}

export async function del(url, user) {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: "DELETE",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "post error");
  }
}
export async function delApprover(url, approver) {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: "DELETE",
      body: JSON.stringify(approver),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "post error");
  }
}
export async function delGroup(url, group) {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: "DELETE",
      body: JSON.stringify(group),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "post error");
  }
}
export async function isEmpDuplicate(url) {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "post error");
  }
}
