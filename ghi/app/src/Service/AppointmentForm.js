import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function AppointmentForm() {
    const navigate = useNavigate();
    const [vin, setVin] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [reason, setReason] = useState('');
    const [technician, setTechnician] = useState('');
    const [technicians, setTechnicians] = useState([]);

    const fetchTechnician = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.vin = vin;
        data.customer_name = customerName;
        data.date_time = dateTime;
        data.reason = reason;
        data.technician_name = technician;

        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            setVin('');
            setCustomerName('');
            setDateTime('');
            setReason('');
            setTechnician('');
            navigate('/appointments/');
        }
    }

    useEffect(() => {
        fetchTechnician();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a new appointment</h1>
                <form onSubmit={handleSubmit} id="create-appointment-form">
                    <div className="form-floating mb-3">
                        <input onChange={(e) => setVin(e.target.value)} value={vin} placeholder="Automobile VIN" required type="text" name="vin" id="vin" className="form-control"/>
                        <label htmlFor="vin">Automobile VIN</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={(e) => setCustomerName(e.target.value)} value={customerName} placeholder="Customer Name" required type="text" name="customer_name" id="customer_name" className="form-control"/>
                        <label htmlFor="customer_name">Customer Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={(e) => setDateTime(e.target.value)} value={dateTime} placeholder="Date & Time" required type="datetime-local" name="date_time" id="date_time" className="form-control"/>
                        <label htmlFor="date_time">Date & Time</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={(e) => setReason(e.target.value)} value={reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control"/>
                        <label htmlFor="reason">Reason</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={(e) => setTechnician(e.target.value)} value={technician} required id="technician_name" name="technician_name"  className="form-select">
                        <option>Choose a technician</option>
                        {technicians.map(technician => {
                            return (
                                <option key={technician.id} value={technician.technician_name}>
                                    {technician.technician_name}
                                </option>
                            )
                        })}
                        </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default AppointmentForm;
