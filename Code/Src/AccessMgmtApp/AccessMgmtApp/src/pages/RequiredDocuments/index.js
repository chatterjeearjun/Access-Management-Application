import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Container, Form, Button } from "reactstrap";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Chips, { Chip } from "react-chips";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getDocs as onGetDocs,
  addNewDoc as onAddNewDoc,
  updateDoc as onUpdateDoc,
} from "../../store/actions";

import { useSelector, useDispatch } from "react-redux";

const RequiredDocuments = () => {
  const dispatch = useDispatch();

  const { docs, result } = useSelector((state) => ({
    docs: state.docsManagement.docs,
    result: state.docsManagement.result,
  }));

  const [docsList, setDocsList] = useState([]),
    [isNewDocument, setIsNewDocument] = useState(),
    [actionResult, setActionResult] = useState(""),
    [docChips, setDocChips] = useState([]),
    [selectedCheckboxes, setSelectedCheckboxes] = useState({
      docsSelected: [],
    }),
    [showSaveBtn, setShowSaveBtn] = useState(false);

  useEffect(() => {
    debugger;
    if (docs && !docs.length) {
      dispatch(onGetDocs());
    }
  }, []);

  useEffect(() => {
    setDocsList(docs);
    setActionResult(result);
  }, [docs, result]);

  const handleClick = () => {
    if (isNewDocument) {
      setIsNewDocument(false);
    } else {
      setIsNewDocument(true);
    }
  };

  const chipsChange = (chips) => {
    setDocChips(chips);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(onUpdateDoc(selectedCheckboxes.docsSelected));
  };

  const handleSaveDocument = (e) => {
    e.preventDefault();
    dispatch(onAddNewDoc(docChips));
    setIsNewDocument(false);
  };

  if (actionResult === "Add Doc Success") {
    toast("Document Added Successfully !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      toastId: "009",
    });
  } else if (actionResult === "Update Doc Success") {
    toast("Updated Required Documents Successfully !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      toastId: "099",
    });
  }

  useEffect(() => {
    setTimeout(() => {
      setActionResult("");
    }, 3000);
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const { docsSelected: docs } = selectedCheckboxes;
    debugger;
    if (checked) {
      setShowSaveBtn(true);
      setSelectedCheckboxes({
        docsSelected: [...docs, { key: value, value: checked }],
      });
    } else if (docs.length === 0) {
      setSelectedCheckboxes({
        docsSelected: [...docs, { key: value, value: checked }],
      });
      setShowSaveBtn(true);
    } else {
      if (docs.filter((doc) => doc.key !== value).length === 0) {
        setSelectedCheckboxes({ docsSelected: [] });
        if (docs.length === 0) setShowSaveBtn(true);
        else setShowSaveBtn(false);
      } else {
        setSelectedCheckboxes({
          docsSelected: docs.filter((doc) => doc.key !== value),
        });
      }
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Required Documents | Crossleaf - Access Management</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Documents" breadcrumbItem="Required Documents" />
          <ToastContainer />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Form onSubmit={onFormSubmit}>
                    <Row className="mb-5">
                      <Col>
                        <div>
                          <h3 className="font-size-14 mb-4">
                            <i className="mdi mdi-arrow-right text-primary me-1"></i>{" "}
                            Default Documents
                          </h3>
                          <div className="d-flex">
                            {docsList?.map(
                              (doc) =>
                                doc.id < 4 && (
                                  <Col xs={2}>
                                    <div>
                                      <div className="form-check mb-3">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          key={doc.document_identifier}
                                          value={doc.document_identifier}
                                          id={"doc" + doc.id}
                                          disabled={true}
                                          onChange={handleCheckboxChange}
                                          defaultChecked={doc.is_active}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={"doc" + doc.id}
                                        >
                                          {doc.document_name}
                                        </label>
                                      </div>
                                    </div>
                                  </Col>
                                )
                            )}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <h3 className="font-size-14 mb-4">
                        <i className="mdi mdi-arrow-right text-primary me-1"></i>{" "}
                        Additional Documents
                      </h3>
                      {docsList?.map(
                        (doc) =>
                          doc.id > 3 && (
                            <Col xs={3}>
                              <div>
                                <div className="form-check mb-3">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    key={doc.document_identifier}
                                    value={doc.document_identifier}
                                    id={"doc" + doc.id}
                                    disabled={false}
                                    onChange={handleCheckboxChange}
                                    defaultChecked={doc.is_active}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={"doc" + doc.id}
                                  >
                                    {doc.document_name}
                                  </label>
                                </div>
                              </div>
                            </Col>
                          )
                      )}
                    </Row>
                    <Row className="mt-5">
                      <Col xs={2}>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleClick}
                        >
                          {!isNewDocument ? (
                            <i className="mdi mdi-plus me-1">
                              Add Other Documents
                            </i>
                          ) : (
                            <i className="mdi mdi-close me-1">Cancel</i>
                          )}
                        </button>
                      </Col>
                      <Col>
                        {showSaveBtn && (
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onFormSubmit}
                          >
                            Save Required Documents
                          </button>
                        )}
                      </Col>
                    </Row>
                    {isNewDocument && (
                      <>
                        <Row className="mt-4">
                          <Col xs={3}>
                            <label>Document Name</label>
                            <Chips
                              value={docChips}
                              onChange={chipsChange}
                              className="form-control"
                              placeholder="Enter other document name"
                              name="otherdoc"
                              fromSuggestionsOnly={false}
                              uniqueChips={true}
                            />
                            <div className="d-flex align-items-center">
                              <i className="dripicons-information me-1"></i>
                              <strong>press tab to add multiple docs</strong>
                            </div>
                          </Col>
                        </Row>
                        <Row className="mt-4">
                          <Col xs={3}>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleSaveDocument}
                            >
                              Save Document
                            </button>
                          </Col>
                        </Row>
                      </>
                    )}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RequiredDocuments;
