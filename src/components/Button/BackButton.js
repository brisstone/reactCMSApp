import { ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import "./BackButton.css";

export default function BackButton() {
  const history = useHistory();
  return (
    <button onClick={history.goBack} className="settings-back-btn">
      <ArrowLeftOutlined /> <b>Back</b>
    </button>
  );
}
