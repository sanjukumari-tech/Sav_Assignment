import  { useState } from 'react';
import ReCAPTCHAComponent from './ReCAPTCHAComponent';
import '../style/Signup.css'; // Include the CSS for styling
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert('Please verify reCAPTCHA.');
      return;
    }
    console.log('Sign Up Data:', formData);
  };

  const handleTriggerProductPage = ()=>{
    // console.log("taking you to product page")
    navigate("/products")
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-heading">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {/* Google ReCAPTCHA Component */}
          <ReCAPTCHAComponent onVerify={setIsVerified} />
          <button
            type="submit"
            className="submit-button"
            disabled={!isVerified} // Disable button until reCAPTCHA is verified
            onClick={handleTriggerProductPage}
          >
            Sign Up
          </button>
        </form>
        <p className="signin-text">
          Already have an account?{' '}
          <span className="signin-link">Log in</span>
        </p>
      </div>
    </div>
  );
}
