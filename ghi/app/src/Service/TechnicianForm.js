import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function TechnicianForm() {
    const navigate = useNavigate();
    const [technicianName, setTechnicianName] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.technician_name = technicianName;
        data.employee_number = employeeNumber;

        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            setTechnicianName('');
            setEmployeeNumber('');
            navigate('/technicians/');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a new technician</h1>
                <form onSubmit={handleSubmit} id="create-technician-form">
                    <div className="form-floating mb-3">
                        <input onChange={(e) => setTechnicianName(e.target.value)} value={technicianName} placeholder="Technician Name" required type="text" name="technician_name" id="technician_name" className="form-control"/>
                        <label htmlFor="technician_name">Technician name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={(e) => setEmployeeNumber(e.target.value)} value={employeeNumber} placeholder="Employee Number" required type="text" name="employee_number" id="employee_number" className="form-control"/>
                        <label htmlFor="employee_number">Employee Number</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default TechnicianForm;
