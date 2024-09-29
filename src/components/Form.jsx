import React, { useState } from 'react';
import './Form.css';
import emailicon from '../assets/email.png';
import personicon from '../assets/person.png';
import passwordicon from '../assets/password.png';

const Form = () => {
    const [action, setAction] = useState("Sign up");
    const [darkMode, setDarkMode] = useState(false);

    // regex patterns
    const checkuser = /^[A-Za-z. ]{3,30}$/;
    const passwordcheck = /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d]{8,}$/;
    const mobilecheck = /^[0-9]{10}$/;
    const emailcheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`~-][a-zA-Z0-9-]$/;

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [phonenumber, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const [password, setPassword] = useState("");
    const [passError, setPassError] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPassError, setConfirmPassError] = useState("");

    const handleName = (e) => {
        const name_u = e.target.value;
        setName(name_u);
        if (!checkuser.test(name_u)) {
            setNameError("Invalid username (3-30 characters, letters, spaces, and dots only)");
        } else {
            setNameError("");
        }
    };

    const handleEmail = (e) => {
        const email_u = e.target.value;
        setEmail(email_u);
        if ( !emailcheck.test(email_u)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    };

    const handlePhoneNumber = (e) => {
        const phonenumber_u = e.target.value;
        setPhoneNumber(phonenumber_u);
        if (!mobilecheck.test(phonenumber_u)) {
            setPhoneError("Invalid phone number (10 digits required)");
        } else {
            setPhoneError("");
        }
    };

    const handlePassword = (e) => {
        const pass_u = e.target.value;
        setPassword(pass_u);
        if (pass_u) {
            let errorMessage = [];
            if (pass_u.length < 8) errorMessage.push("at least 8 characters");
            if (!/(?=.*[A-Za-z])/.test(pass_u)) errorMessage.push("a letter");
            if (!/(?=.*\d)/.test(pass_u)) errorMessage.push("a number");
            if (!/(?=.*[@$!%*?&])/.test(pass_u)) errorMessage.push("a special character (@$!%*?&)");
            
            if (errorMessage.length > 0) {
                setPassError(`Password must contain ${errorMessage.join(", ")}`);
            } else {
                setPassError("");
            }
        } else {
            setPassError("");
        }
        
        // checking if password doesnt match
        if (confirmPassword && pass_u !== confirmPassword) {
            setConfirmPassError("Passwords do not match");
        } else {
            setConfirmPassError("");
        }
    };

    const handleConfirmPassword = (e) => {
        const confirmPass = e.target.value;
        setConfirmPassword(confirmPass);
        if ( confirmPass !== password) {
            setConfirmPassError("Passwords do not match");
        } else {
            setConfirmPassError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        let errorMessages = [];

        // ensuring every field is completed not empty
        if (!email) {
            setEmailError("Email is required");
            errorMessages.push("Email is required");
            isValid = false;
        }
        if (action === "Sign up") {
            if (!name) {
                setNameError("Name is required");
                errorMessages.push("Name is required");
                isValid = false;
            }
            if (!phonenumber) {
                setPhoneError("Phone number is required");
                errorMessages.push("Phone number is required");
                isValid = false;
            }
            if (!confirmPassword) {
                setConfirmPassError("Please confirm your password");
                errorMessages.push("Password confirmation is required");
                isValid = false;
            }
        }
        if (!password) {
            setPassError("Password is required");
            errorMessages.push("Password is required");
            isValid = false;
        }

        if (isValid) {
          
            console.log("Form submitted successfully");
          
            const formData = {
                email,
                password,
                ...(action === "Sign up" && { name, phonenumber})
            };
            console.log("Form data:", formData);
            

            //if form submitted then clear all field
            if (action === "Sign up") {
                setName("");
                setPhoneNumber("");
                setConfirmPassword("");
            }
            setEmail("");
            setPassword("");
            alert("Form submitted successfully!");
        } else {
            console.log("Form has errors, please correct them");
            alert(`Form submission failed. Please correct the following errors:\n${errorMessages.join("\n")}`);
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={darkMode ? 'dark-mode' : 'light-mode'}>
            <div className="container">
                <div className="header">
                    <div className='main'>
                        <label className="switch">
                            <input type="checkbox" onChange={toggleDarkMode} checked={darkMode} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>

                <form className="inputs" onSubmit={handleSubmit}>
                    <div className="input">
                        <img src={emailicon} alt="email icon" />
                        <input type="email" value={email} id="email" placeholder='Enter your email' onChange={handleEmail} />
                        {<span className="error">{emailError}</span>}
                    </div>

                    {action === "Sign up" && (
                        <div className="input">
                            <img src={personicon} alt="user icon" />
                            <input type="text" value={name} id="username" placeholder='Name' onChange={handleName} />
                            {<span className="error">{nameError}</span>}
                        </div>
                    )}

                    <div className="input">
                        <img src={passwordicon} alt="pass icon" />
                        <input type="password" id="password" value={password} placeholder='Enter your password' onChange={handlePassword} />
                       <div className='showerror'> { <span className="error">{passError}</span>} </div>
                    </div>

                    {action === "Sign up" && (
                        <>
                            <div className="input">
                                <img src={passwordicon} alt="pass icon" />
                                <input type="password" id="confirm-pass" value={confirmPassword} placeholder='Confirm password' onChange={handleConfirmPassword} />
                                { <span className="error">{confirmPassError}</span>}
                            </div>
                            <div className="input">
                                <img src={passwordicon} alt="pass icon" />
                                <input type="tel" id="mobile" value={phonenumber} placeholder='Enter your phone number' onChange={handlePhoneNumber} />
                                {<span className="error">{phoneError}</span>}
                            </div>
                            <div className="input">
                                <img src={passwordicon} alt="pass icon" />
                                <input type="date" required />
                            </div>
                        </>
                    )}

                    {action === "Sign up" ? (
                        <p className='newbtn forgotpas'>Already have an account? <button type="button" className='hrefbutton' onClick={() => setAction("login")}>Login</button></p>
                    ) : (
                        <p className='newbtn forgotpas'>Don't have an account? <button type="button" className='hrefbutton' onClick={() => setAction("Sign up")}>Sign up</button></p>
                    )}

                    {action === "login" && (
                        <div className=' newbtn forgotpas'>
                            Forgot password? <span className='click'>Click here</span>
                        </div>
                    )}

                    <div className='submit-buttons'>
                        <button type='submit' className="submit">
                            {action === "Sign up" ? "Sign up" : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;