import axios from "axios";

//pass new generated access token here
const token = `Bearer ${JSON.parse(localStorage.getItem("authUser"))?.token}`;

//apply base url for axios
const API_URL = process.env.REACT_APP_API_BASE_URL; //"https://localhost:5001";

const axiosApi = axios.create({
  baseURL: API_URL,
});

//axiosApi.defaults.headers.common["Authorization"] = token;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url, id) {
  try {
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
    // console.log(error, "get error");
  }
}

export async function getForDocs(url, id) {
  try {
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
    // console.log(error, "get error");
  }
}
export async function postForAddingDocs(url, doc, id) {
  try {
    const response = await fetch(
      `${API_URL}${url}${id !== null && id !== undefined ? id : ""}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(doc),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error, "get error");
  }
}
export async function postForUpdatingDocs(url, doc, id) {
  try {
    const response = await fetch(
      `${API_URL}${url}${id !== null && id !== undefined ? id : ""}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(doc),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error, "get error");
  }
}

export async function getAAssociation(url, asset) {
  try {
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
    // console.log(error, "get error");
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

    const result = await response.json();
    return result;
  } catch (error) {
    // console.log(error, "post error");
  }
}

//Adding New Role

export async function postRole(url, data) {
  try {
    const formData = new FormData();
    formData.append("company_identifier", data.company_identifier);
    formData.append("role_name", data.role_name);
    formData.append("role_description", data.role_description);
    formData.append("is_active", data.is_active);
    formData.append("RoleDocumentMapping", data.RoleDocumentMapping);
    formData.append("associated_assets", data.associated_assets);
    formData.append(
      "role_description_attachment",
      data.role_description_attachment
    );
    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    // console.log(error, "post error");
  }
}
export async function postBulkEmployeeUpload(url, data) {
  try {
    const formData = new FormData();
    formData.append("company_identifier", data.company_identifier);
    formData.append("File", data.file);
    formData.append("upload_category", data.category);

    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      body: formData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    return response;
  } catch (error) {
    // console.log(error, "post error");
  }
}

//Adding New Asset

export async function postAsset(url, data) {
  try {
    const formData = new FormData();
    formData.append("company_identifier", data.company_identifier);
    formData.append("asset_name", data.asset_name);
    formData.append("asset_id", data.asset_id);
    formData.append("asset_type", data.asset_type);
    formData.append("asset_owner", data.asset_owner);
    formData.append("asset_description", data.asset_description);
    formData.append("asset_location", data.asset_location);
    formData.append("asset_risk_ranking", data.asset_risk_ranking);
    formData.append("is_active", data.is_active);
    formData.append("alocation_start_date", data.alocation_start_date);
    formData.append("alocation_end_date", data.alocation_end_date);
    formData.append("is_nda_required", "");
    formData.append("is_bc_required", "");
    formData.append("certification_required", "");
    formData.append(
      "asset_description_attachment",
      data.asset_description_attachment
    );
    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    // console.log(error, "post error");
  }
}

//Adding New Emplopyee

export async function postEmployee(url, data) {
  try {
    const formData = new FormData();
    formData.append("company_identifier", data.company_identifier);
    formData.append("emp_role", data.emp_role);
    formData.append("emp_group", data.emp_group);
    formData.append("emp_designation", data.emp_designation);
    formData.append("emp_first_name", data.emp_first_name);
    formData.append("emp_last_name", data.emp_last_name);
    formData.append("emp_email", data.emp_email);
    formData.append("emp_office_phone", data.emp_office_phone);
    formData.append("emp_mobile_number", data.emp_mobile_number);
    formData.append("emp_joining_date", data.emp_joining_date);
    data?.emp_documents?.map((item) =>
      formData.append("emp_documents", item.emp_documents)
    );
    formData.append("emp_profile_picture", data.emp_profile_picture);
    formData.append("is_active", data.is_active);
    formData.append("associated_assets", data.associated_assets);
    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    // console.log(error, "postEmployee error");
  }
}
export async function postforlogin(url, data, config = {}) {
  // const re = {
  //   expiration: "2022-04-22T17:16:55Z",
  //   token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJucmFvQGxvY2FsaG9zdCIsImp0aSI6ImFjNjk4NjY2LWVjZTItNDQ3Yy1hODFhLWE0ODk0NmFhMGY2MSIsInVuaXF1ZV9uYW1lIjoibnJhb0Bsb2NhbGhvc3QiLCJleHAiOjE2NTA2NDc4MTUsImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6ImxvY2FsaG9zdCJ9.TIkfVV170jzFPBD-Sm2OXpGLH05ID5msTXT6GOg0yns",
  //   useridentier: "6c0271ec-fea1-4fa8-bb1f-5d428a850222",
  // };
  // return re;
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      let message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "User not Found";
            break;
          case 400:
            message = "Password is incorrect";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
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

    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error, "post error");
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
    // console.log(error, "post error");
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
    // console.log(error, "post error");
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
    // console.log(error, "post error");
  }
}
export async function isEmpDuplicate(url) {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error, "post error");
  }
}
export async function isapproverDuplicate(url) {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error, "isapproverDuplicate error");
  }
}
