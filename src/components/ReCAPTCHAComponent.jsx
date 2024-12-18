// import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const ReCAPTCHAComponent = ({ onVerify }) => {
  const handleReCAPTCHAChange = (token) => {
    if (token) {
      onVerify(true);
    } else {
      onVerify(false);
    }
    console.log(token);
  };

  return (
    <div className="recaptcha-container">
      <ReCAPTCHA
        sitekey="6LeuTJ8qAAAAAG1yMaKof1JZmy21RdQZcySz2HBg" // reCAPTCHA site key
        onChange={handleReCAPTCHAChange}
      />
    </div>
  );
};

export default ReCAPTCHAComponent;
