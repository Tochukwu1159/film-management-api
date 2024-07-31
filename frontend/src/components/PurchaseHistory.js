import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
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

const PurchaseList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PurchaseItem = styled.li`
  padding: 15px;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PurchaseFilmDetails = styled.div`
  display: flex;
  gap: 20px;
`;

const FilmImage = styled.img`
  width: 100px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

const PurchaseDate = styled.div`
  font-size: 0.9em;
  color: #888;
`;

const PurchaseAmount = styled.div`
  font-weight: bold;
`;

function PurchaseHistory() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/purchase', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPurchases(response.data);
      } catch (error) {
        console.error('Error fetching purchases', error);
      }
    };
    
    fetchPurchases();
  }, []);

  return (
    <Container>
      <Title>Purchase History</Title>
      <PurchaseList>
        {purchases.map((purchase) => (
          <PurchaseItem key={purchase.id}>
            <PurchaseFilmDetails>
              <FilmImage src={purchase.Film.imageUrl} alt={purchase.Film.title} />
              <div>
                <h3>{purchase.Film.title}</h3>
                <p>Amount: ${purchase.Film.price}</p>
                <PurchaseDate>Purchase Date: {new Date(purchase.purchaseDate).toLocaleDateString()}</PurchaseDate>
              </div>
            </PurchaseFilmDetails>
          </PurchaseItem>
        ))}
      </PurchaseList>
    </Container>
  );
}

export default PurchaseHistory;
