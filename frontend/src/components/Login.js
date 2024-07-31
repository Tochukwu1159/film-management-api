import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background: #f2f2f2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #f39c12;
  }
`;

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = response.data;

    
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      

      setToken(token);
      setMessage('Login successful');
      navigate('/films'); // Navigate to films page
    } catch (error) {
      setMessage('Error logging in');
    }
  };


  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <Button type="submit">Login</Button>
      </Form>
      {message && <p>{message}</p>}
      {token && <p>Token: {token}</p>}
    </Container>
  );
}

export default Login;
