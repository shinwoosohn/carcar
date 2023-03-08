import React, { useEffect, useState } from 'react';

function AddCustomer() {

    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
        setSuccess(false)
    }

    const [address, setAddress] = useState('')
    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
        setSuccess(false)
    }

    const [phoneNumber, setPhoneNumber] = useState('')
    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
        setSuccess(false)
    }

    const [success, setSuccess] = useState(false)
    const handleSuccessChange = (event) => {
        const value = event.target.value;
        setSuccess(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.customer_name = name;
        data.address = address;
        data.phone_number = phoneNumber;

        const addCustomerUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(addCustomerUrl, fetchConfig);
        if (response.ok) {
          const newCustomer = await response.json();

          setName('')
          setAddress('')
          setPhoneNumber('')
          setSuccess(true)
        }

    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Customer:</h1>
            <form onSubmit={handleSubmit} id="create-customer-form">

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
                    onChange={handlePhoneNumberChange}
                    placeholder="Phone Number"
                    required type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="form-control"
                    value={phoneNumber}/>
                <label htmlFor="phoneNumber">Phone Number:</label>
              </div>

              <div className="form-floating mb-3">
                <input
                    onChange={handleAddressChange}
                    placeholder="Customer Address"
                    required type="text"
                    name="address"
                    id="address"
                    className="form-control"
                    value={address}/>
                <label htmlFor="address">Address:</label>
              </div>

              <button className="btn btn-primary mx-auto d-grid">Add Customer</button>

            </form>

          </div>

          <div className="row d-grid pt-4 w-50 mx-auto ">
                {success && <button type="button" className="btn btn-success">Customer Added</button>}
            </div>
        </div>
        </div>

    );



}

export default AddCustomer;
