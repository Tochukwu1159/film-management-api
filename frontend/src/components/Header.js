import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #333;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; /* For positioning the drawer */
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  a {
    color: #fff;
    margin: 0 15px;
    text-decoration: none; /* Remove underline */
    font-weight: bold;
    transition: color 0.3s ease, margin 0.3s ease;

    &:hover {
      color: #f39c12; /* Hover color */
      margin-left: 20px; /* Spacing effect */
    }
  }

  @media (max-width: 768px) {
    display: none; /* Hide on mobile by default */
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex; /* Show on mobile */
  }

  div {
    width: 30px;
    height: 3px;
    background: #fff;
    margin: 5px;
    transition: all 0.3s ease;
  }

  &.active div {
    background: #f39c12;
  }
`;

const Drawer = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background: #333;
  color: #fff;
  padding: 20px;
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transform: ${props => (props.open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease;
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CloseButton = styled.button`
  background: #f39c12;
  border: none;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 20px;
  align-self: flex-end;

  &:hover {
    background: #e67e22;
  }
`;

const DrawerLink = styled(Link)`
  color: #fff;
  display: block;
  margin: 10px 0;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #f39c12; /* Hover color */
  }
`;

const LogoutButton = styled.button`
  background: #f39c12;
  border: none;
  color: #2980b9;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 17%;
  text-align: center;
  margin-top: 10px;

  &:hover {
    background: #e67e22;
  }
`;

function Header() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Nav>
      <h1>Film Sales</h1>
      <NavLinks>
        <Link to="/films">Films</Link>
        <Link to="/purchases">My Purchases</Link>
        {token ? (
          <>
            {user && user.role === 'admin' && (
              <Link to="/create">Create Film</Link>
            )}
         
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </NavLinks>
      <Hamburger onClick={toggleDrawer}>
        <div />
        <div />
        <div />
      </Hamburger>
      <Drawer ref={drawerRef} open={isDrawerOpen}>
        <DrawerContent>
          <CloseButton onClick={toggleDrawer}>Close</CloseButton>
          <DrawerLink to="/films" onClick={toggleDrawer}>Films</DrawerLink>
          <DrawerLink to="/purchases" onClick={toggleDrawer}>My Purchases</DrawerLink>
          {token ? (
            <>
              {user && user.role === 'admin' && (
                <DrawerLink to="/create" onClick={toggleDrawer}>Create Film</DrawerLink>
              )}
              <LogoutButton onClick={() => { handleLogout(); toggleDrawer(); }}>Logout</LogoutButton>
            </>
          ) : (
            <>
              <DrawerLink to="/login" onClick={toggleDrawer}>Login</DrawerLink>
              <DrawerLink to="/register" onClick={toggleDrawer}>Register</DrawerLink>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </Nav>
  );
}

export default Header;
