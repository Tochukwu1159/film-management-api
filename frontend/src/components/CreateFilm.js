import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';


const Container = styled.div`
  max-width: 600px;
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

const Textarea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
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

const Select = styled.select`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Error = styled.p`
  color: red;
  text-align: center;
`;

function CreateFilm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genreId: '',
    price: '',
    releaseDate: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsAdmin(user.role === 'admin');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      setMessage('Access denied. Only admins can create films.');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('genreId', formData.genreId);
    data.append('price', formData.price);
    data.append('releaseDate', formData.releaseDate);
    if (imageFile) {
      data.append('imageFile', imageFile);
    }

    try {
      await axios.post('http://localhost:5000/api/film', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Film purchased successfully!');
    //   setMessage('Film created successfully!');
      setFormData({
        title: '',
        description: '',
        genreId: '',
        price: '',
        releaseDate: ''
      });
      setImageFile(null);
    } catch (error) {
      setMessage('Error creating film');
    }
  };

  if (!isAdmin) {
    return (
      <Container>
        <Error>Access denied. Only admins can create films.</Error>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Create Film</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
        />
        <Select
          name="genreId"
          value={formData.genreId}
          onChange={handleChange}
          required
        >
          <option value="">Select Genre</option>
          {/* Populate with actual genres */}
          <option value="1">Action</option>
          <option value="2">Comedy</option>
          <option value="3">Drama</option>
          <option value="10">Other</option>
        </Select>
        <Input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          required
        />
        <Input
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          required
        />
        <Input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <Button type="submit">Create Film</Button>
      </Form>
      {message && <p>{message}</p>}
      <ToastContainer />
    </Container>
  );
}

export default CreateFilm;
