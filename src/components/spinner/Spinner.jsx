import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./Spinner.css";
import React from 'react';

const Spinner = () => {
  const spinIcon = (
    <LoadingOutlined style={{ fontSize: 70, color: "#c88400" }} spin />
  );
  return (
    <div className="Spinner">
      <Spin indicator={spinIcon} size="large" />
    </div>
  );
};






export default Spinner;
