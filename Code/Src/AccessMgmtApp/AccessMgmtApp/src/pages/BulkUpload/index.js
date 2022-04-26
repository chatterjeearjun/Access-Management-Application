import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  CardTitle,
  Container,
} from "reactstrap";
import Dropzone from "react-dropzone";

// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { Link } from "react-router-dom";
import { FcDownload } from "react-icons/fc";
import {
  BULK_UPLOAD_TEMPLATE,
  BULK_UPLOAD_URL,
} from "../../helpers/url_helper";
import { postBulkEmployeeUpload } from "../../helpers/api_helper";
import Loading from "react-fullscreen-loading";

const EmployeeBulkUpload = () => {
  const [selectedFiles, setselectedFiles] = useState([]),
    [errorMessage, setErrorMessage] = useState(""),
    [successMessage, setSuccessMessage] = useState(""),
    [isLoading, setIsLoading] = useState(false);

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
    setErrorMessage("");
  }
  function handleRejectedFiles(fileRejections) {
    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {
        if (err.code === "file-too-large") {
          setErrorMessage(`Error: ${err.message}`);
        } else if (err.code === "file-invalid-type") {
          setErrorMessage(`Error: ${err.message}`);
        }
      });
    });
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const handleSubmitFile = async () => {
    if (selectedFiles.length === 0) {
      setErrorMessage("Please select a file");
    } else {
      setIsLoading(true);
      setErrorMessage("");
      const data = {
        file: selectedFiles[0],
        category: "Bulk Upload",
        company_identifier: "6c0276ec-fea1-4fa8-bb1f-5d428a850222",
      };

      const uploading = await postBulkEmployeeUpload(BULK_UPLOAD_URL, data);

      if (uploading.status === 200) {
        setErrorMessage("");
        setIsLoading(false);
        setSuccessMessage("File uploaded successfully");
      } else {
        setSuccessMessage("");
        setIsLoading(false);
        setErrorMessage(uploading.data.message);
      }
    }
  };

  useEffect(() => {
    if (
      errorMessage === "Please select a file" ||
      errorMessage === "File uploaded successfully"
    ) {
      setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 5000);
    }
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Bulk Employee Upload | Crossleaf - Access Management</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs
            title="Employee Management"
            breadcrumbItem="Employee Bulk Upload"
          />
          <Loading
            loading={isLoading}
            background="#ffffffcc"
            loaderColor="#5156be"
          />
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <Row className="mb-2">
                    <div className="row align-ite">
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <div>
                          <CardTitle>
                            Download xls template to fill you employee data and
                            upload xls
                          </CardTitle>
                        </div>
                        <div className="">
                          <a
                            type="button"
                            className="btn btn-light"
                            download
                            href={BULK_UPLOAD_TEMPLATE}
                          >
                            <FcDownload className="me-1" />
                            Employee Upload Template
                          </a>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <Form>
                    <Dropzone
                      onDrop={(acceptedFiles, fileRejections) => {
                        handleAcceptedFiles(acceptedFiles);
                        handleRejectedFiles(fileRejections);
                      }}
                      maxFiles={1}
                      accept=".xls,.xlsx"
                      addRemoveLinks={true}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick mt-2"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="mb-3">
                              <i className="display-4 text-muted bx bxs-cloud-upload" />
                            </div>
                            <h4>Drop file here or click to upload.</h4>
                            <h6>
                              (Only *.xls and *.xlsx files will be accepted)
                            </h6>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    {errorMessage && (
                      <div class="alert alert-danger mt-2">{errorMessage}</div>
                    )}
                    {successMessage && (
                      <div class="alert alert-success mt-2">
                        {successMessage}
                      </div>
                    )}
                    <div className="dropzone-previews mt-3" id="file-previews">
                      {selectedFiles.map((f, i) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </Form>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleSubmitFile}
                    >
                      <i className="mdi mdi-upload font-size-18 me-1"></i>
                      Upload Employees
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EmployeeBulkUpload;
