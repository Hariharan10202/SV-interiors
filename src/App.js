import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { productInputs, userInputs } from './formSource';
import './style/dark.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/AuthContext';
import { productColumns } from './datatablesource';
import { userColumns } from './datatablesource';

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/login' />;
  };

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path='login' element={<Login />} />
            <Route path='users'>
              <Route
                index
                element={
                  <RequireAuth>
                    <List path='users' columns={userColumns} title='Add New User' />
                  </RequireAuth>
                }
              />
              <Route
                path=':userId'
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path='new'
                element={
                  <RequireAuth>
                    <New
                      path='users'
                      inputs={userInputs}
                      columns={userColumns}
                      title='Add New User'
                    />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path='products'>
              <Route
                index
                element={
                  <RequireAuth>
                    <List path='products' columns={productColumns} title='Add New Product' />
                  </RequireAuth>
                }
              />
              <Route
                path=':productId'
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path='new'
                element={
                  <RequireAuth>
                    <New
                      path='products'
                      inputs={productInputs}
                      columns={productColumns}
                      title='Add New Product'
                    />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
