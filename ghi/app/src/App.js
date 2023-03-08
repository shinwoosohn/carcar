import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';
import Nav from './Nav';
import VehicleList from './VehicleList';
import AddModel from './AddModel';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';
import TechnicianForm from './Service/TechnicianForm';
import TechnicianList from './Service/TechnicianList';
import AddSalesPerson from './salescomponents/AddSalesPerson';
import AddCustomer from './salescomponents/AddCustomer';
import AddSale from './salescomponents/AddSalesRecord';
import SalesHistory from './salescomponents/SaleList';
import AppointmentForm from './Service/AppointmentForm';
import AppointmentList from './Service/AppointmentList';
import ServiceHistory from './Service/ServiceHistory';

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
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="/appointments/new" element={<AppointmentForm />} />
          <Route path="/services" element={<ServiceHistory />} />
          <Route path="/sales/newemployee" element={<AddSalesPerson />} />
          <Route path="/sales/newcustomer" element={<AddCustomer />} />
          <Route path="/sales/newsale" element={<AddSale />} />
          <Route path="/sales/saleshistory" element={<SalesHistory />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
