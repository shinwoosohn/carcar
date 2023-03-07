import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';
import Nav from './Nav';
import VehicleList from './VehicleList';
import AddModel from './AddModel';
import AutomobileForm from './AutomobileForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="/models" element={<VehicleList />} />
          <Route path="/models/new" element={<AddModel />} />

          <Route path="/automobiles/new" element={<AutomobileForm />} />



        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
