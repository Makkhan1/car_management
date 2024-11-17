// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import CarList from './pages/CarList';
// import CarDetail from './pages/CarDetail';
// import CarForm from './pages/CarForm';
// import { Home } from './pages/Home';

// // Higher-order component for protected routes
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   return token ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div style={styles.container}>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={  localStorage.getItem('token') ? <Home/> : <Login/>} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />

//           {/* Protected Routes */}
//           <Route
//             path="/cars"
//             element={
//               <ProtectedRoute>  
//                 <CarList />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/cars/create"
//             element={
//               <ProtectedRoute>
//                 <CarForm />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/cars/:id"
//             element={
//               <ProtectedRoute>
//                 <CarDetail />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/cars/edit/:id"
//             element={
//               <ProtectedRoute>
//                 <CarForm isEdit />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// const styles = {
//   container: {
//     margin: '20px auto',
//     padding: '20px',
//     maxWidth: '1200px',
//     fontFamily: 'Arial, sans-serif',
//   },
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import CarForm from './pages/CarForm';
import { Home } from './pages/Home';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div style={styles.container}>
        <Routes>
         
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

         
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars"
            element={
              <ProtectedRoute>
                <CarList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars/create"
            element={
              <ProtectedRoute>
                <CarForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars/:id"
            element={
              <ProtectedRoute>
                <CarDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars/edit/:id"
            element={
              <ProtectedRoute>
                <CarForm isEdit />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    margin: '20px auto',
    padding: '20px',
    maxWidth: '1200px',
    fontFamily: 'Arial, sans-serif',
  },
};

export default App;
