import React, {ChangeEvent, MouseEvent, useState} from 'react'
import {Container, Row, Col, Button, Form} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {toLogin} from '@redux/actions/userActions'
import {ILogin} from '@interfaces/IUser'

 

interface state {
  email: string;
  password: string;
}

export const Auth: React.FC = () => {
  const defaultState: state = {
    email: '',
    password: ''
  }
  const [email, setEmail] = useState(defaultState.email);
  const [password, setPassword] = useState(defaultState.password);
  const dispatch = useDispatch();

  const setDefault = () => {
    setEmail(defaultState.email);
    setPassword(defaultState.password)
  }


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const email: string = target.value;
    setEmail(email);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const password: string = target.value;
    setPassword(password);
  }

  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const login: ILogin = {
      email,
      password
    }
    dispatch(toLogin(login));
  }


  return (
    <Container as="main" className="main" fluid>
        <Form as="section" className="auth d-flex flex-column justify-content-center align-items-center">
            <Form.Group className="auth-field-wrap">  
              <Form.Label className="auth-title">Email:</Form.Label>
              <Form.Control className="auth-text" type="email" placeholder="Enter email" onChange={handleEmailChange} />
            </Form.Group>  
            <Form.Group className="auth-field-wrap">  
              <Form.Label className="auth-title">Password:</Form.Label>
              <Form.Control className="auth-text" type="password" placeholder="Password" onChange={handlePasswordChange} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmitClick}>Login</Button>
        </Form>
    </Container>
  )
}
