import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';
import Nav from './Nav';
import VehicleList from './VehicleList';
import AddModel from './AddModel';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import AddSalesPerson from './salescomponents/AddSalesPerson';
import AddCustomer from './salescomponents/AddCustomer';

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
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/automobiles/new" element={<AutomobileForm />} />
          <Route path="/technicians" element={<TechnicianList />} />
          <Route path="/technicians/new" element={<TechnicianForm />} />

          <Route path="/sales/newemployee" element={<AddSalesPerson />} />
          <Route path="/sales/newcustomer" element={<AddCustomer />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
