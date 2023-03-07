import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="manufacturers/new" element={<ManufacturerForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
