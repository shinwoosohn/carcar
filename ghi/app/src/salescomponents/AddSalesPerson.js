import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function AddSalesPerson() {
    // const navigate = useNavigate();

    // useEffect(  () =>  {
    //     fetchData()

    // }, [] );


    // const [manufacturers, setManufacturers] = useState([]);

    // const [manufacturer, setManufacturer] = useState('');
    // const handleManufacturerChange = (event) => {
    //     const value = event.target.value;
    //     setManufacturer(value);
    // }

    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
        setSuccess(false)
    }

    const [employeeNumber, setEmployeeNumber] = useState('')
    const handleEmployeeNumberChange = (event) => {
        const value = event.target.value;
        setEmployeeNumber(value);
        setSuccess(false)
    }

    const [success, setSuccess] = useState(false)
    const handleSuccessChange = (event) => {
        const value = event.target.value;
        setSuccess(value);
    }



    // const fetchData = async () => {
    //     const url = 'http://localhost:8100/api/manufacturers/';

    //     const response = await fetch(url);

    //     if (response.ok) {
    //         const data = await response.json();
    //         setManufacturers(data.manufacturers)
    //     }
    // }



    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.name = name;
        data.employee_number = employeeNumber;

        const addEmployeeUrl = 'http://localhost:8090/api/sales_persons/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(addEmployeeUrl, fetchConfig);
        if (response.ok) {
          const newEmployee = await response.json();

          setName('')
          setEmployeeNumber('')
          setSuccess(true)
        }

    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Sales Employee:</h1>
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
                    onChange={handleEmployeeNumberChange}
                    placeholder="Employee Number"
                    required type="text"
                    name="employeeNumber"
                    id="employeeNumber"
                    className="form-control"
                    value={employeeNumber}/>
                <label htmlFor="employeeNumber">Employee Number:</label>
              </div>

              <button className="btn btn-primary">Add Employee</button>

            </form>
            {success && <button type="button" class="btn btn-success">{newEmployee.body.sales_person} Added</button>}
          </div>
        </div>
        </div>

    );



}

export default AddSalesPerson;
