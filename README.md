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
| Create new technician      | POST      |   http://localhost:8080/api/technicians/ |

GET List of technicians Example:

    {
        "technicians": [
            {
                "technician_name": "Eddy",
                "employee_number": "000001",
                "id": 1
            }
        ]
    }

POST Create new technician Request Example:

    {
        "technician_name": "Jeff",
        "employee_id": "000004"
    }

POST Create new technician Return Example:

    {
        "technician_name": "Jeff",
        "employee_id": "000004",
        "id": 4
    }

| Action        | Method           | URL  |
| ------------- |:-------------:| :-----|
| List of appointments | GET | http://localhost:8080/api/appointments/ |
| Create new appointment     | POST      | http://localhost:8080/api/appointments/ |
| Show appointment details     | GET      | http://localhost:8080/api/appointments/:id/ |
| Update appointment     | PUT      | http://localhost:8080/api/appointments/:id/ |
| Delete appointment    | DELETE      | http://localhost:8080/api/appointments/:id/ |

GET List of appointments Example:

    {
        "appointments": [
            {
                "vin": "1C3CC5FB2AN120174",
                "customer_name": "Vincent",
                "date_time": "2023-03-20T12:30:00+00:00",
                "reason": "Oil Change",
                "vip": false,
                "finished": false,
                "technician_name": {
                    "technician_name": "Eddy",
                    "employee_number": "000001",
                    "id": 1
                },
                "id": 1
            },
        ]
    }

GET Show appointment details Example:

    {
        "vin": "1C3CC5FB2AN120174",
        "customer_name": "Kevin",
        "date_time": "2023-03-20T12:30:00+00:00",
        "reason": "Oil Change",
        "vip": false,
        "finished": false,
        "technician_name": {
            "technician_name": "Eddy",
            "employee_id": "000001"
        },
        "id": 1
    }

POST Create new appointment Request Example:

    {
        "vin": "2FMDK4KC4CBA27842",
        "customer_name": "John",
        "date_time": "2023-11-30 03:30",
        "reason": "Refill Blinker Fluid",
        "technician_name": "Derek"
    }

POST Create new appointment Return Example:

    {
        "vin": "2FMDK4KC4CBA27842",
        "customer_name": "John",
        "date_time": "2023-11-30 03:30",
        "reason": "Refill Blinker Fluid",
        "vip": true,
        "finished": false,
        "technician_name": {
            "technician_name": "Derek",
            "employee_number": "000003",
            "id": 3
        },
        "id": 16
    }

PUT Update appointment details Request Example:

    {
        "customer_name": "Vincent",
        "date_time": "2023-03-30 12:30"
    }

PUT Update appointment details Return Example:

    {
        "vin": "1C3CC5FB2AN120174",
        "customer_name": "Vincent",
        "date_time": "2023-03-30T12:30:00+00:00",
        "reason": "Oil Change",
        "vip": false,
        "finished": false,
        "technician_name": {
            "technician_name": "Eddy",
            "employee_id": "000001"
        },
        "id": 1
    }

DELETE Delete appointment Example:

    {
        "deleted": true
    }


## Sales microservice

Explain your models and integration with the inventory
microservice, here.

The Sales microservice provides a RESTful API interface for viewing and
creating Sales Records, Sales Employees and Customers. A polling service makes regular
requests to the Inventory API to update AutomobileVO value objects which the sales microservice uses to represent vehicles that may be available for sale or have been sold.
By default, when AutomobileVO objects created in the Sales microservice in response to vehicles being added to the Inventory, the made availble_for_sale boolean will be set to True.
When the sale of a vehicle is recorded, the available_for_sale boolean will be set to False.

The following models and associated parameters are used:

* SalesPerson
    * sales_person : Employee Name
    * employee_number : Employee Number

* Customer
    * customer_name : Customer Name
    * address : Customer Address
    * phone_number : Customer Phone Number

* SalesHistory
    * sale_price : Sale Price as decimal value
    * seller : Name of Sales Person
    * buyer : Name of Customer
    * sold_auto_vin : Vin of sold vehicle via Foreign Key with AutomobileVO

* AutomobileVO
    * vin_number : Unique Vin of Vehicle
    * available_for_sale : Boolean value indicating wether available to be sold



To run the Sales microservice as part of the Project Beta package from a freshly cloned repository, navigate to the project-beta project folder and execute the following commands:

docker volume create beta-data
docker-compose build
docker-compose up

You will now see sales-api and sales-poller containers running in Docker. The Sales
microservice will now be available at http://localhost:8090/. Admin access to view or update sales database is available via django web interface at http://localhost:8090/admin however a user must be configured via command line first.

There are RESTful endpoints for the following entities:

Sales Person: List or Create Sales Persons
Customer: List or Create Customers
Sales History: List or Create Sales Records

The following documentation describes the available functionality in the Sales API:

### Sales Person:

| Action        | Method        | Url   |
| ------------- |:-------------:| -----:|
| List Sales Persons:      | GET        | http://localhost:8090/api/sales_persons/ |
| Create Sales Person:     | POST       | http://localhost:8090/api/sales_persons/ |

GET Example:

            {
            "sales_persons": [
                {
                    "sales_person": "John Wooster",
                    "employee_number": "123456789",
                    "id": 1
                }
                ]
            }

POST Request Example:

            {
                "sales_person":"John Wooster",
                "employee_number":"123456789"
            }

POST Return Example:

            {
                "sales_person": "John Wooster",
                "employee_number": "35555",
                "id": 9
            }

### Customer:

| Action        | Method        | Url   |
| ------------- |:-------------:| -----:|
| List Customers:  | GET        | http://localhost:8090/api/customers/ |
| Create Customer: | POST       | http://localhost:8090/api/customers/ |

GET Example:

            {
        "customers": [
            {
                "customer_name": "Nick Adams",
                "id": 1
            }
            ]
        }

POST Request Example:

            {
                "customer_name":"Nick Adams",
                "address":"555 123 Lane, San Francisco, CA 94010",
                "phone_number":"415-555-1212"
            }

POST Return Example:

            {
	            "customer_name": "Nick Adams",
	            "id": 1
            }

### Sales History:

| Action        | Method        | Url   |
| ------------- |:-------------:| -----:|
| List Sales History:      | GET        | http://localhost:8090/api/sales_history/ |
| Create Sales History:     | POST       | http://localhost:8090/api/sales_history/ |

GET Example:

            {
    "sales_history": [
        {
            "seller": "John Wooster",
            "buyer": "Nick Adams",
            "sale_price": 500.0,
            "vin_number": "1C3CC5FB2AN120174"
        }
        ]
    }

POST Request Example:

            {
                "buyer":"Nick Adams",
                "seller":"John Wooster",
                "sale_price":"5000",
                "sold_auto_vin": "9999999"
            }

POST Return Example:

            {
	            "seller": "John Wooster",
	            "buyer": "Nick Adams",
	            "sale_price": "5000",
	            "vin_number": "9999999"
            }
