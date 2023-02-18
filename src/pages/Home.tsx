import axios from 'axios';
import React from 'react';
import Banner from '../components/Banner';
import Movies from '../components/Movies';
import Section from '../components/Section';
import { CredentialResponse, GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import { async } from '@firebase/util';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
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

  const [firstImg, setFirstImg] = React.useState(
    'https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/7VrRna8S3x6xbijooeBmxqvHXiu.jpg',
  );
  const [secondImg, setSecondImg] = React.useState(
    'https://image.tmdb.org/t/p/w1920_and_h600_multi_faces/rGbRnRvkmrSub07ty89Vnlsh6UX.jpg',
  );

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

  return (
    <main>
      <Banner
        h1={'Welcome.'}
        h2={'Millions of movies, TV shows and people to discover. Explore now.'}
      />
      <Banner img={secondImg} h1={`THAT'S A WRAP 2022`} h2={'The best (and worst) from 2022.'} />
      <Section />
      <div>
        <h2>React Google Login</h2>
        <br />
        <br />
        {profile ? (
          <div style={{ marginLeft: '200px' }}>
            <img src={profile.picture} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <button onClick={logOut}>Log out</button>
            <br />
            <input type="text" value={text} onChange={handleChangeText} />
            <button onClick={handleAddMovie}>Add</button>
            <br />
            {movies.map((movie) => (
              <div key={movie.id}>
                {movie.text}
                <button type="button" onClick={() => handleDeleteMovie(movie.id)}>
                  X
                </button>
              </div>
            ))}
            <br />
          </div>
        ) : (
          <button onClick={() => login()}>Sign in with Google 🚀 </button>
        )}
      </div>
      {/* <Movies /> */}
    </main>
  );
};
export default Home;
