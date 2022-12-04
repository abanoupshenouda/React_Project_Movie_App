import React, { useState } from 'react';
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';
import './LoginRegister.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, signupSuccess } from '../../redux/authReducer';



export const LoginContainer = (props) => {


    const dispatch = useDispatch();

    const [reqUserName, setReqUserName] = useState("dispNone");
    const [reqPassword, setReqPassword] = useState("dispNone");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const btnLoginHandler = () => {
        userName === "" ? setReqUserName("dispBlock") : setReqUserName("dispNone");
        password === "" ? setReqPassword("dispBlock") : setReqPassword("dispNone");

        if (userName === "" || password === "") return;
        doLogin();
    }

    const doLogin = async () => {
        // console.log(user_details, accessToken);
        const param = window.btoa(`${userName}:${password}`);
        const url =  props.baseUrl + "/auth/login"; //"http://localhost:8085/api/v1/auth/login";
        try {

            const rawResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    authorization: `Basic ${param}`
                }
            });

            //debugger;

            const result = await rawResponse.json();
            if (rawResponse.ok) {
                ;
                const response = JSON.stringify(result)
                dispatch(loginSuccess(response));
                window.sessionStorage.setItem('access-token', rawResponse.headers.get('access-token'));
                //window.location.href = "./";
                props.history.push("/");
            } else {
                console.log("Error ", result.message);
                throw new Error(result.message || "Something went wrong");
            }

        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    }

    return (
        <div >
            <FormControl required className="formControl">
                <InputLabel htmlFor="username">
                    Username
                </InputLabel>
                <Input
                    id="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    autoFocus
                />
                <FormHelperText className={reqUserName}>
                    <span className="red">UserName is Required</span>
                </FormHelperText>
            </FormControl>
            <br /> <br />
            <FormControl required className="formControl">
                <InputLabel htmlFor="password">
                    Password
                </InputLabel>
                <Input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <FormHelperText className={reqPassword}>
                    <span className="red">Password is Required</span>
                </FormHelperText>
            </FormControl>
            <br /> <br />
            <Button variant="contained" color="primary" onClick={btnLoginHandler}> Login</Button>
        </div>
    )
}

export const RegisterContainer = (props) => {

    const dispatch = useDispatch();
    const isRegistered = useSelector((state) => state.auth.isRegistered);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [reqFirstName, setReqFirstName] = useState("dispNone");
    const [reqLastName, setReqLastName] = useState("dispNone");
    const [reqEmail, setReqEmail] = useState("dispNone");
    const [reqPassword, setReqPassword] = useState("dispNone");
    const [reqPhoneNumber, setReqPhoneNumber] = useState("dispNone");

    const btnRegisterHandler = () => {
        firstName === "" ? setReqFirstName("dispBlock") : setReqFirstName("dispNone");
        lastName === "" ? setReqLastName("dispBlock") : setReqLastName("dispNone");
        email === "" ? setReqEmail("dispBlock") : setReqEmail("dispNone");
        password === "" ? setReqPassword("dispBlock") : setReqPassword("dispNone");
        phoneNumber === "" ? setReqPhoneNumber("dispBlock") : setReqPhoneNumber("dispNone");

        if (firstName === "" || lastName === "" || email === "" || password === "" || phoneNumber === "") return;
        const payload = {
            "first_name": firstName,
            "last_name": lastName,
            "email_address": email,
            password,
            "mobile_number": phoneNumber
        }
        registerUser(payload);
    }

    const registerUser = async (data) => {

        const url =  props.baseUrl + "/signup";// "http://localhost:8085/api/v1/signup";
        try {

            const rawResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                },
                body: JSON.stringify(data)
            });

            const result = await rawResponse.json();
            if (rawResponse.ok) {
                dispatch(signupSuccess());
            } else {
                const error = new Error();
                error.message = result.message || 'Something went wrong.';
                throw error;
            }

        } catch (e) {
            console.log("Error ", e.message);
        }
    }

    return (
        <div>
            <FormControl required className="formControl">
                <InputLabel htmlFor="firstName">
                    First Name
                </InputLabel>
                <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoFocus
                />
                <FormHelperText className={reqFirstName}>
                    <span className="red">Required</span>
                </FormHelperText>
            </FormControl>
            <br /> <br />
            <FormControl required className="formControl">
                <InputLabel htmlFor="lastName">
                    Last Name
                </InputLabel>
                <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <FormHelperText className={reqLastName}>
                    <span className="red">Required</span>
                </FormHelperText>
            </FormControl>
            <br /> <br />
            <FormControl required className="formControl">
                <InputLabel htmlFor="email">
                    Email
                </InputLabel>
                <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormHelperText className={reqEmail}>
                    <span className="red">Required</span>
                </FormHelperText>
            </FormControl>
            <br /> <br />
            <FormControl required className="formControl">
                <InputLabel htmlFor="password">
                    Password
                </InputLabel>
                <Input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <FormHelperText className={reqPassword}>
                    <span className="red">Required</span>
                </FormHelperText>
            </FormControl>
            <br /> <br />
            <FormControl required className="formControl">
                <InputLabel htmlFor="phoneNumber">
                    Contact No.
                </InputLabel>
                <Input
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <FormHelperText className={reqPhoneNumber}>
                    <span className="red">Required</span>
                </FormHelperText>
            </FormControl>
            <br /> <br />
            <Button variant="contained" color="primary" onClick={btnRegisterHandler}> Register </Button>

            {isRegistered && <div>
                Registration Successful.Please Login!
            </div>}
        </div>
    )
}
