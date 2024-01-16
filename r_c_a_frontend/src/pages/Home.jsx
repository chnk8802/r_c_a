import React from 'react'
import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Header from '../components/Header'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate('/demo');
    }
  }, [navigate]);

  const handleSignInClick = () => {
    setClicked(false)
  }
  const handleSignUpClick = () => {
    setClicked(true)
  }

  return (
    <Box>
      <Header clicked={clicked} handleSignInClick={handleSignInClick} handleSignUpClick={handleSignUpClick} />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
        <Box sx={{ boxShadow: 2, maxWidth: '50%', padding: '2rem 1rem', borderRadius: 1 }}>
          {clicked ? <SignUp clicked={clicked} handleSignInClick={handleSignInClick} /> : <SignIn clicked={clicked} handleSignUpClick={handleSignUpClick} />}
        </Box>
      </Box>
    </Box>
  )
}

export default Home