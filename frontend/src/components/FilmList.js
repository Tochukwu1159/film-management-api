import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
`;

const FilmGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const FilmCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const FilmTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const FilmImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
  object-fit: cover;
`;

const FilmDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
`;

const FilmDetails = styled.div`
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #f39c12;
  }
`;

const BuyButton = styled(Button)`
  background: #333;
  color: #fff;
  margin: 10px;
`;

const EditButton = styled(Button)`
  background: #007bff;
  color: #fff;
  margin: 10px;
`;

const DeleteButton = styled(Button)`
  background: #dc3545;
  color: #fff;
  margin: 10px;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ModalInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ModalSelect = styled.select`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ModalTextarea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #f39c12;
  }
`;

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
  padding: 10px;
  position: relative;
  
  &::before {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #f39c12;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -10px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin: 5px 0 0;
`;

const DeleteModalContent = styled.div`
  text-align: center;
`;

function FilmList() {
  const [films, setFilms] = useState([]);
  const [user, setUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [filmToDelete, setFilmToDelete] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }

    const fetchFilms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/film', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFilms(response.data);
      } catch (error) {
        console.error('Error fetching films', error);
        toast.error('Error fetching films');
      }
    };

    fetchFilms();
  }, []);

  const openEditModal = (film) => {
    setEditFormData(film);
    setIsEditModalOpen(true);
  };

  console.log(editFormData, "edit")

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (filmId) => {
    setFilmToDelete(filmId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', editFormData.title);
    formData.append('description', editFormData.description);
    formData.append('genreId', editFormData.genreId);
    formData.append('price', editFormData.price);
    formData.append('releaseDate', editFormData.releaseDate);
    formData.append('imageFile', editFormData.imageFile); // Append image file
    


    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
    try {
        console.log(token, "tokeeeeeen")
    
      await axios.patch(
        `http://localhost:5000/api/film/${editFormData.id}`,
        formData,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
              }}
      );
      toast.success('Film updated successfully!');
      closeEditModal();
      const response = await axios.get('http://localhost:5000/api/film', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setFilms(response.data);
    } catch (error) {
      console.error('Error updating film', error);
      toast.error('Error updating film');
    }
  };

  const handleBuyNow = async (filmId) => {
    if (!user) {
      toast.error('User not authenticated');
      return;
    }

    const token = localStorage.getItem('token'); 
    const userId = user.id;

    try {
      await axios.post(
        'http://localhost:5000/api/purchase',
        { userId, filmId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Film purchased successfully!');
    } catch (error) {
      console.error('Error purchasing film', error);
      toast.error('Error purchasing film');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/film/${filmToDelete}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Film deleted successfully!');
      closeDeleteModal();
      // Refresh the film list
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/film', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setFilms(response.data);
    } catch (error) {
      console.error('Error deleting film', error);
      toast.error('Error deleting film');
    }
  };
console.log(films)
  return (
    <Container>
      <HeaderContainer>
      <Title>Film List</Title>
      <Subtitle>Explore our collection of amazing films</Subtitle>
    </HeaderContainer>
      <FilmGrid>
        {films.map((film) => (
          <FilmCard key={film.id}>
            <FilmImage src={film.imageUrl} alt={film.title} />
            <FilmTitle>{film.title}</FilmTitle>
            <FilmDescription>{film.description}</FilmDescription>
            <FilmDetails>
              <p>Genre: {film?.genreId || 'Unknown'}</p>
              <p>Price: ${film.price}</p>
            </FilmDetails>
            <BuyButton onClick={() => handleBuyNow(film.id)}>Buy Now</BuyButton>
            {user && user.role === 'admin' && (
              <>
                <EditButton onClick={() => openEditModal(film)}>Edit</EditButton>
                <DeleteButton onClick={() => openDeleteModal(film.id)}>Delete</DeleteButton>
              </>
            )}
          </FilmCard>
        ))}
      </FilmGrid>

      {/* Edit Film Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Film"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            maxWidth: '600px',
            margin: 'auto',
            padding: '20px',
            background: '#f2f2f2',
            borderRadius: '8px',
          }
        }}
      >
        <h2>Edit Film</h2>
        <ModalForm onSubmit={handleEditSubmit}>
          <label>Title:</label>
          <ModalInput
            type="text"
            value={editFormData.title || ''}
            onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
            required
          />
          <label>Description:</label>
          <ModalTextarea
            value={editFormData.description || ''}
            onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
            required
          />
          <label>Genre:</label>
          <ModalSelect
            name="genreId"
            value={editFormData.genreId || ''}
            onChange={(e) => setEditFormData({ ...editFormData, genreId: e.target.value })}
            required
          >
            <option value="">Select Genre</option>
            <option value="1">Action</option>
            <option value="2">Comedy</option>
            <option value="3">Drama</option>
            <option value="10">Other</option>
          </ModalSelect>
          <label>Price:</label>
          <ModalInput
            type="number"
            value={editFormData.price || ''}
            onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
            step="0.01"
            required
          />
          <label>Release Date:</label>
          <ModalInput
            type="date"
            value={editFormData.releaseDate || ''}
            onChange={(e) => setEditFormData({ ...editFormData, releaseDate: e.target.value })}
            required
          />
          <label>Image:</label>
          <ModalInput
            type="file"
            onChange={(e) => setEditFormData({ ...editFormData, imageFile: e.target.files[0] })}
          />
          <ModalActions>
            <ModalButton type="submit">Update</ModalButton>
            <ModalButton type="button" onClick={closeEditModal}>Cancel</ModalButton>
          </ModalActions>
        </ModalForm>
      </Modal>

      {/* Delete Film Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Film"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            maxWidth: '400px',
            margin: 'auto',
            padding: '20px',
            height:"150px",
            background: '#f2f2f2',
            borderRadius: '8px',
            textAlign: 'center',
          }
        }}
      >
        <DeleteModalContent>
          <h2>Confirm Deletion</h2>
          <p>Do you want to delete this film?</p>
          <ModalActions>
            <ModalButton type="button" onClick={handleDelete}>Yes</ModalButton>
            <ModalButton type="button" onClick={closeDeleteModal}>No</ModalButton>
          </ModalActions>
        </DeleteModalContent>
      </Modal>

      <ToastContainer />
    </Container>
  );
}

export default FilmList;
