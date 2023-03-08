# CarCar

Team:

* Person 1 - Which microservice?
* Will Richanbach - Sales Microservice

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

The Sales microservice provides a RESTful API interface for viewing and
creating Sales Records, Sales Employees and Customers. A polling service makes regular
requests to the Inventory API to update AutomobileVO value objects which the sales microservice uses to represent vehicles that may be available for sale or have been sold.
By default, when AutomobileVO objects created in the Sales microservice in response to vehicles being added to the Inventory, the made availble_for_sale boolean will be set to True.
When the sale of a vehicle is recorded, the available_for_sale boolean will be set to False.

The following models and associated parameters are used:

• SalesPerson
    - sales_person : Employee Name
    - employee_number : Employee Number

• Customer
    - customer_name : Customer Name
    - address : Customer Address
    - phone_number : Customer Phone Number

• SalesHistory
    - sale_price : Sale Price as decimal value
    - seller : Name of Sales Person
    - buyer : Name of Customer
    - sold_auto_vin : Vin of sold vehicle via Foreign Key with AutomobileVO

• AutomobileVO
    - vin_number : Unique Vin of Vehicle
    - available_for_sale : Boolean value indicating wether available to be sold



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

Sales Person:

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

POST Example:

            {
            "sales_person":"John Wooster",
            "employee_number":"123456789"
            }

Customer:

    | Action        | Method        | Url   |
| ------------- |:-------------:| -----:|
| List Customers:      | GET        | http://localhost:8090/api/customers/ |
| Create Customer:     | POST       | http://localhost:8090/api/customers/ |

GET Example:

            {
        "customers": [
            {
                "customer_name": "Nick Adams",
                "id": 1
            }
            ]
        }

POST Example:

            {
                "customer_name":"Nick Adams",
                "address":"555 123 Lane, San Francisco, CA 94010",
                "phone_number":"415-555-1212"
            }

Sales History:

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

POST Example:

            {
                "buyer":"Nick Adams",
                "seller":"John Wooster",
                "sale_price":"5000",
                "sold_auto_vin": "9999999"
            }
