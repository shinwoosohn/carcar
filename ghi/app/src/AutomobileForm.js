import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AutomobileForm() {
    const navigate = useNavigate();
    const [model, setModel] = useState('');
    const [models, setModels] = useState([]);
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');

    const fetchModel = async () => {
        const response = await fetch('http://localhost:8100/api/models/');
        if (response.ok) {
            const modelsData = await response.json();
            setModels(modelsData.models);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.model_id = model;
        data.color = color;
        data.year = year;
        data.vin = vin;

        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const automobileResponse = await fetch(automobileUrl, fetchConfig);
        if (automobileResponse.ok) {
            const newAutomobile = await automobileResponse.json();

            setModel('');
            setColor('');
            setYear('');
            setVin('');
            navigate('/automobiles/');

        }
    }

    useEffect(() => {
        fetchModel();
    }, []);

    return(
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new automobile</h1>
            <form onSubmit={handleSubmit} id="create-location-form">
              <div className="form-floating mb-3">
                <input onChange={(e) => setColor(e.target.value)} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={(e) => setYear(e.target.value)} value={year} placeholder="Year" required type="text" name="year" id="year" className="form-control"/>
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={(e) => setVin(e.target.value)} value={vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control"/>
                <label htmlFor="vin">Vin</label>
              </div>
              <div className="mb-3">
                <select onChange={(e) => setModel(e.target.value)} value={model} required id="model" name="model_id" className="form-select">
                  <option value="">Choose a model</option>
                  {models && models.map(model => {
                    return (
                        <option key={model.id} value={model.id}>
                            {model.name}
                        </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}
export default AutomobileForm;
