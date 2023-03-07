import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleList from './VehicleList';
import AddModel from './AddModel';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

            <Route path="/models" element={<VehicleList />} />
            <Route path="/models/new" element={<AddModel />} />



        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
