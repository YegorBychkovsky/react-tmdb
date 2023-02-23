import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { deleteDoc, doc, addDoc, collection, query, orderBy, getDocs } from 'firebase/firestore';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';

const GoogleAuth = () => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = React.useState<any>();
  const [profile, setProfile] = React.useState<any>(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      setAccessToken(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  React.useEffect(() => {
    if (accessToken) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken.access_token}`,
              Accept: 'application/json',
            },
          },
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [accessToken]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const [text, setText] = React.useState('');
  const [movies, setMovies] = React.useState<any[]>([]);

  const handleChangeText = React.useCallback((ev: any) => {
    setText(ev.target.value);
  }, []);

  const handleDeleteMovie = React.useCallback(
    async (movieId: string) => {
      console.warn(text);
      await deleteDoc(doc(db, 'users', profile.id, 'add', movieId));
      fetchAdd();
    },
    [profile],
  );
  const handleAddMovie = React.useCallback(async () => {
    console.warn(text);
    await addDoc(collection(db, 'users', profile.id, 'add'), {
      text,
      completed: false,
      created: Date.now(),
    });
    fetchAdd();
    setText('');
  }, [text]);

  const fetchAdd = React.useCallback(async () => {
    const q = query(collection(db, 'users', profile.id, 'add'), orderBy('created', 'asc'));
    const querySnapshot = await getDocs(q);
    setMovies(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }, [profile]);

  React.useEffect(() => {
    profile && fetchAdd();
  }, [profile]);
  console.log(profile);

  return (
    <div>
      {profile ? (
        <div>
          <Stack sx={{ marginTop: '-5px' }} spacing={2} direction="row">
            <Button onClick={() => navigate('/profile')} variant="contained">
              {profile.given_name}
            </Button>
          </Stack>
        </div>
      ) : (
        // <div style={{ marginLeft: '200px' }}>
        //   <img src={profile.picture} alt="user image" />
        //   <h3>User Logged in</h3>
        //   <p>Name: {profile.name}</p>
        //   <p>Email Address: {profile.email}</p>
        //   <br />
        //   <br />
        //   <button onClick={logOut}>Log out</button>
        //   <br />
        //   <input type="text" value={text} onChange={handleChangeText} />
        //   <button onClick={handleAddMovie}>Add</button>
        //   <br />
        //   {movies.map((movie) => (
        //     <div key={movie.id}>
        //       {movie.text}
        //       <button type="button" onClick={() => handleDeleteMovie(movie.id)}>
        //         X
        //       </button>
        //     </div>
        //   ))}
        //   <br />
        // </div>
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
};
export default GoogleAuth;
