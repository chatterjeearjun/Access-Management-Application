import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Container, Row } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
//import components
import AssetInfo from "./AssetInfo";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { getAssetOverview as onGetAsset } from "../../store/actions";
//redux
import { useSelector, useDispatch } from "react-redux";

const AssetOverview = (props) => {
  const dispatch = useDispatch();
  const id = window.location.search.slice(1);
  const { asset } = useSelector((state) => ({
    asset: state.assetsManagement.asset,
  }));
  const [assetData, setAssetData] = useState([]);

  useEffect(() => {
    if (asset && !asset.length) {
      dispatch(onGetAsset(id));
    }
  }, []);

  useEffect(() => {
    setAssetData(asset);
  }, [asset]);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Asset Overview | Crossleaf - Access Management</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Assets"
            breadcrumbItem="Asset Overview"
            url="AssetsManagement"
          />

          <Row>
            {/* Render profilemenu */}
            <AssetInfo data={assetData} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AssetOverview;
