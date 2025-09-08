import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { validateLogin } from '../data/userCredentials';

// Import images
import dentistPicLogin from '../assets/dentist_pic_login.png';
import iconGradient1 from './icon_gradient1.png';
import backgroundImage from './Slide1 1.jpg';

const DentistLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Clear previous errors
        setEmailError('');
        setPasswordError('');
        
        // Validate login
        const validation = validateLogin(email, password, 'dentist');
        
        if (!validation.isValid) {
            if (validation.error === 'email') {
                setEmailError('you have entered an incorrect email');
            } else if (validation.error === 'password') {
                setPasswordError('you have entered an incorrect password');
            }
            return;
        }
        
        // Login successful - navigate to loading page
        console.log('Dentist login successful:', { email });
        navigate('/loading');
    };

    const handleBack = () => {
        navigate('/healthcare');
    };

    return (
        <div 
            className="login-container"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div 
                className="login-rectangle"
                style={{
                    width: 'min(1778px, 90vw)',
                    height: 'min(955px, 85vh)',
                    flexShrink: 0,
                    borderRadius: 'min(20px, 2vw)',
                    background: 'var(--Off-White, #FCFAFA)'
                }}
            >
                <div className="login-content">
                <div className="login-image-section">
                    <img 
                        src={dentistPicLogin} 
                        alt="Dentist login" 
                        className="login-image dentist-image"
                    />
                </div>
                
                <div className="login-form-section">
                    <button className="back-button" onClick={handleBack}>
                        ← Back
                    </button>
                    
                    <div className="login-header">
                        <img 
                            src={iconGradient1} 
                            alt="Helda logo" 
                            className="login-logo"
                        />
                        <h1 className="login-title">Welcome to Helda Insights</h1>
                        <p className="login-subtitle">
                            Enter your email and password to access your account
                        </p>
                    </div>

                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {emailError && <div className="error-message">{emailError}</div>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-input"
                                    placeholder="Enter your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <g clipPath="url(#clip0_9_1532)">
                                            <path d="M8.86328 6.14923L11.44 8.72592L11.4522 8.59095C11.4522 7.23716 10.352 6.13696 8.99825 6.13696L8.86328 6.14923Z" fill="black"/>
                                            <path d="M8.99795 4.50079C11.2556 4.50079 13.0879 6.33311 13.0879 8.59078C13.0879 9.11839 12.9816 9.62145 12.7976 10.0836L15.1902 12.4762C16.4254 11.4456 17.3988 10.1123 18 8.59078C16.5808 4.99979 13.092 2.45581 8.99798 2.45581C7.85278 2.45581 6.75669 2.6603 5.73828 3.02839L7.50515 4.79116C7.96727 4.61122 8.47034 4.50079 8.99795 4.50079Z" fill="black"/>
                                            <path d="M0.817983 2.27195L2.68301 4.13698L3.05521 4.50918C1.70552 5.56439 0.638037 6.96727 0 8.59097C1.41515 12.182 4.90798 14.7259 8.99797 14.7259C10.2659 14.7259 11.4765 14.4805 12.5849 14.0347L12.9326 14.3824L15.317 16.7709L16.36 15.7321L1.86093 1.229L0.817983 2.27195ZM5.34153 6.79139L6.60533 8.05519C6.56852 8.23107 6.54398 8.40692 6.54398 8.59097C6.54398 9.94476 7.64417 11.045 8.99797 11.045C9.18202 11.045 9.3579 11.0204 9.52968 10.9836L10.7935 12.2474C10.2495 12.5173 9.64421 12.681 8.99797 12.681C6.7403 12.681 4.90798 10.8486 4.90798 8.59097C4.90798 7.94476 5.07159 7.33943 5.34153 6.79139Z" fill="black"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_9_1532">
                                                <rect width="18" height="18" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>
                            {passwordError && <div className="error-message">{passwordError}</div>}
                        </div>

                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    );
};

export default DentistLogin;
