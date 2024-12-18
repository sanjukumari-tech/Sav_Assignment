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
        sitekey="6Le0DZ8qAAAAAJsOn5UKYN3MA9BEp6YOSkPHT6WF" // Replace with your reCAPTCHA site key
        onChange={handleReCAPTCHAChange}
      />
    </div>
  );
};

export default ReCAPTCHAComponent;
