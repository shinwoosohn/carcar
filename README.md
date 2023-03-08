# CarCar

Team:

* Shinwoo Edward Sohn - Service Microservice
* Will Richanbach - Sales Microservice

## Design

CarCar is an application used for automobile dealership management.

To run the Service microservice as part of the Project Beta package from a freshly cloned repository, navigate to the project-beta project folder and execute the following commands:

docker volume create beta-data
docker-compose build
docker-compose up

You will now see sales-api and sales-poller containers running in Docker. The Sales
microservice will now be available at http://localhost:8090/. Admin access to view or update sales database is available via django web interface at http://localhost:8090/admin however a user must be configured via command line first.
There are RESTful endpoints for the following entities:
Sales: the company that manufactures the automobile
VehicleModel: the model of a vehicle created by the manufacturer
Automobile: the actual automobile of a specific vehicle model
The following documentation describes the available functionality in the Inventory API.


## Service Microservice

The Service microservice provides a RESTful API interface for viewing and creating Appointments, Technicians, and Service History. A polling service makes regular requests to the Inventory API to update AutomobileVO value objects which the service microservice uses to represent vehicles that were purchased from the dealership or not.

The following models and associated parameters are used:

    * Appointment
        * vin : Automobile VIN
        * customer_name : Customer Name
        * date_time : Date & Time of Appointment
        * reason : Reason for Appointment
        * vip : Boolean value indicating whether vehicle was purchased from dealership or not
        * finished : Boolean value indicating status of Appointment (Pending/Completed)
        * technician_name : Foreign key to show Technician Name

    * Technician
        * technician_name : Technician Name
        * employee_number : Employee Number

    * AutomobileVO
        * vin : Unique Vin of Vehicle
        * import_href : The inventory url path for each automobileVO

The Appointment model does not have VIN as a foreign key because clients who do not own a vehicle from the inventory should also be able to make an appointment. The Technician field is a foreign key because many appointments can have a single technician.

### Service Microservice RESTful

| Action        | Method           | URL  |
| ------------- |:-------------:| -----:|
| List of technicians| GET | http://localhost:8080/api/technicians/ |
| Create new technicians      | POST      |   http://localhost:8080/api/technicians/ |



## Sales microservice

Explain your models and integration with the inventory
microservice, here.
