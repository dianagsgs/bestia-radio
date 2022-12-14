import React, { useEffect } from "react";

const Radio = () => {
  useEffect(() => {
    window.jQuery = require("/public/js/jquery.min.js");
    window.Radio = require("/public/js/jquery.radiocoplayer.min.js");

    window.jQuery(".radioplayer").radiocoPlayer();
  }, []);

  return <div></div>;
};

export default Radio;
