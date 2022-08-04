import { useContext, useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import styles from './login.module.scss';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  const Navigation = useNavigate();

  const LoginHandler = e => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        dispatch({ type: 'LOGIN', payload: user });
        setError(false);
        Navigation('/');
      })
      .catch(error => {
        setError(true);
      });
  };

  const GoogleHandler = event => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    const googleAuth = auth;
    signInWithPopup(googleAuth, provider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        dispatch({ type: 'LOGIN', payload: user });
        console.log(user);
        user.emailVerified && Navigation('/');
      })
      .catch(error => {
        console.log(error);
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className={styles.login}>
      <form className={styles.Wrapper}>
        <h1>Sign in</h1>
        <div className={styles.inputField}>
          <input type='text' placeholder='Email' onChange={e => setEmail(e.target.value)} />
        </div>
        <div className={styles.inputField}>
          <input
            type='password'
            autoComplete='off'
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {error && <p>Wrong Username or Password</p>}
        <div className={styles.btn}>
          <button type='submit' onClick={LoginHandler}>
            Sign in
          </button>
          <button className={styles['google-btn']} onClick={GoogleHandler}>
            <FcGoogle />
            Log in with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
