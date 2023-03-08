import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SalesHistory() {



    const [autos, setAutos] = useState([]);

    const fetchAutomobiles = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');

        if (response.ok){
          let data= await response.json();
          setAutos(data.autos)

        }else{
          console.error(response);
        };
      };

    useEffect(  () =>  {
        fetchAutomobiles()

    }, [] );

    return(
        <>
          <table className="table table-striped d-grid pt-4 w-100 mx-auto ">
            <thead>
              <tr>
                <select className="form-select pe-4 w-100" aria-label="Default select example">
                    <option selected>Filter Sales By Employee: </option>
                    <option value=""/>
                    <option value=""/>
                </select>
              </tr>

              <tr>
                <th>Sales Person:</th>
                <th>Customer:</th>
                <th>Vehicle Vin:</th>
                <th>Sale Price:</th>
              </tr>
            </thead>
            <tbody>
            { autos.map( auto => {
              return (

                      <tr key={auto.vin}>
                        <td>{ auto.vin }</td>
                        <td>{ auto.color }</td>
                        <td>{ auto.year }</td>
                        <td>{ auto.model.name }</td>
                        <td>{ auto.model.manufacturer.name }</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          <Link className="btn btn-primary" to="/automobiles/new/">Add a New Automobile</Link>
        </>
        )
}

export default SalesHistory;
