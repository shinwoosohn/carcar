import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddModel() {
    const navigate = useNavigate();

    useEffect(  () =>  {
        fetchData()

    }, [] );


    const [manufacturers, setManufacturers] = useState([]);

    const [manufacturer, setManufacturer] = useState('');
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const [pictureUrl, setPictureUrl] = useState('')
    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }



    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    }



    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturer_id = manufacturer;


        const addModelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(addModelUrl, fetchConfig);
        if (response.ok) {
          const newModel = await response.json();

          setName('')
          setPictureUrl('')
          setManufacturer('')
          navigate('/models/')
        }

    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Vehicle Model:</h1>
            <form onSubmit={handleSubmit} id="create-model-form">
              <div className="form-floating mb-3">
                <input  onChange={handleNameChange}
                        placeholder="Name"
                        required type="text"
                        name="name" id="name"
                        className="form-control"
                        value={name}/>
                <label htmlFor="name">Name:</label>
              </div>
              <div className="form-floating mb-3">
                <input
                    onChange={handlePictureUrlChange}
                    placeholder="Picture URL"
                    required type="url"
                    name="picture"
                    id="picture"
                    className="form-control"
                    value={pictureUrl}/>
                <label htmlFor="picture">Picture URL:</label>
              </div>
                <select
                onChange={handleManufacturerChange}
                required name="manufacturer" id="manufacturer" className="form-select"
                value={manufacturer}>
                  <option value="">Choose a Manufacturer:</option>
                  { manufacturers.map (manu => {
                    return (
                        <option value={manu.id} key={manu.id}>
                            {manu.name}
                        </option>
                    );
                  })}

                </select>

              <button className="btn btn-primary mt-3">Add Vehicle Model</button>

            </form>
          </div>
        </div>
        </div>

    );



}

export default AddModel;
