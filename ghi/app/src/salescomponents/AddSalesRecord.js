import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function AddSale(props) {
    const navigate = useNavigate();

    useEffect(  () =>  {
        fetchData()

    }, [] );

    const [salesPeople, setSalesPeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [automobiles, setAutomobiles] = useState([]);


    const [seller, setSeller] = useState('');
    const handleSellerChange = (event) => {
        const value = event.target.value;
        setSeller(value);
    }

    const [buyer, setBuyer] = useState('');
    const handleBuyerChange = (event) => {
        const value = event.target.value;
        setBuyer(value);
    }

    const [salePrice, setSalePrice] = useState('');
    const handleSalePriceChange = (event) => {
        const value = event.target.value;
        setSalePrice(value);
    }

    const [vinNumber, setVinNumber] = useState('');
    const handleVinNumberChange = (event) => {
        const value = event.target.value;
        setVinNumber(value);
    }

    const fetchData = async () => {
        const salesUrl = 'http://localhost:8090/api/sales_persons/';
        const customerUrl = 'http://localhost:8090/api/customers/';
        const autoUrl = 'http://localhost:8090/api/automobiles/';

        const salesResponse = await fetch(salesUrl);
        const customerResponse = await fetch(customerUrl);
        const autoResponse = await fetch(autoUrl);

        if (salesResponse.ok) {
            const salesData = await salesResponse.json();
            setSalesPeople(salesData.sales_persons)
        }

        if (customerResponse.ok) {
            const customerData = await customerResponse.json();
            setCustomers(customerData.customers)
        }

        if (autoResponse.ok) {
            const autoData = await autoResponse.json();
            setAutomobiles(autoData)
        }

    }



    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.seller = seller;
        data.buyer = buyer;
        data.sale_price = salePrice;
        data.sold_auto_vin = vinNumber;

        const addSaleUrl = 'http://localhost:8090/api/sales_history/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(addSaleUrl, fetchConfig);
        if (response.ok) {
          const newSale = await response.json();

          setSeller('');
          navigate('/sales/history');
        }

    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Make a new sale:</h1>
            <form onSubmit={handleSubmit} id="create-hat-form">

              <div className="mb-3">
                <select
                onChange={handleSellerChange}
                required name="seller" id="seller" className="form-select"
                value={seller}>
                  <option value="">Choose a Sales Person:</option>
                  { salesPeople.map (employee => {
                    return (
                        <option value={employee.sales_person} key={employee.id}>
                            {employee.sales_person}
                        </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-3">
                <select
                onChange={handleBuyerChange}
                required name="buyer" id="buyer" className="form-select"
                value={buyer}>
                  <option value="">Choose a Customer:</option>
                  { customers.map (customer => {
                    return (
                        <option value={customer.customer_name} key={customer.id}>
                            {customer.customer_name}
                        </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-3">
                <select
                onChange={handleVinNumberChange}
                required name="vinNumber" id="vinNumber" className="form-select"
                value={vinNumber}>
                  <option value="">Choose a Vehichle Vin:</option>
                  { automobiles.map (auto => {
                    return (
                        <option value={auto.vin_number} key={auto.vin_number}>
                            {auto.vin_number}
                        </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-floating mb-3">
                <input
                    onChange={handleSalePriceChange}
                    placeholder="$0.00"
                    required type="Number"
                    name="salePrice"
                    id="salePrice"
                    step="0.01"
                    min="0"
                    className="form-control"
                    value={salePrice}/>
                <label htmlFor="salePrice">Sale Price:</label>
              </div>

              <button className="btn btn-primary">Make Sale</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default AddSale;
