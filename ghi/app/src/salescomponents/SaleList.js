import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SalesHistory() {

    const [salesHistory, setSalesHistory] = useState([]);
    const [salesPeople, setSalesPeople] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [employeeFilter, setEmployeeFilter] = useState('');

    const handleEmployeeChange = (event) => {
        const value = event.target.value;
        setEmployeeFilter(value);

    }

    const fetchData = async () => {
        const historyResponse = await fetch('http://localhost:8090/api/sales_history/');
        const salesPersonResponse = await fetch('http://localhost:8090/api/sales_persons/');

        if (historyResponse.ok){
          let data= await historyResponse.json();
          setSalesHistory(data.sales_history)
          setFilteredSales(data.sales_history);
        }else{
          console.error(historyResponse);
        };

        if (salesPersonResponse.ok){
            let data= await salesPersonResponse.json();
            setSalesPeople(data.sales_persons)
        }else{
            console.error(salesPersonResponse);
          };
    };

    useEffect(  () =>  {
        fetchData()

    }, [] );

    useEffect(() => {
        if (employeeFilter) {
            setFilteredSales(salesHistory.filter(sale => sale.seller === employeeFilter));
        } else {
            setFilteredSales(salesHistory);
        }
    }, [employeeFilter, salesHistory]);


    return(
        <>
                <select className="form-select pe-4 w-100"
                 onChange={handleEmployeeChange}
                >
                    <option value={employeeFilter} className="text-center">Filter Sales By Employee:</option>
                    <option value={''} key={'null'}>
                            All Sales Persons
                    </option>

                    { salesPeople.map (sale => {
                    return (
                        <option value={sale.sales_person} key={sale.id}>
                            {sale.sales_person}
                        </option>
                    );
                })}
                </select>
          <table className="table table-striped  pt-4 w-100 mx-auto ">
            <thead>


              <tr>
                <th>Sales Person:</th>
                <th>Customer:</th>
                <th>Vehicle Vin:</th>
                <th>Sale Price:</th>
              </tr>
            </thead>
            <tbody>


            {filteredSales.map(sale => {
                    return (
                        <tr key={sale.vin_number}>
                            <td>{sale.seller}</td>
                            <td>{sale.buyer}</td>
                            <td>{sale.vin_number}</td>
                            <td>${sale.sale_price}</td>
                        </tr>
                        );
                    })}
            </tbody>
          </table>
          <Link className="btn btn-primary" to="/sales/newsale">Add a Sales Record</Link>
        </>
        )
}

export default SalesHistory;
