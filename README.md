
# Installation Guide

1. Clone the project
2. Change directory to “ticket-helpdesk-app”
    
    ```jsx
    cd ticket-helpdesk-app
    ```
    
3. Run the application with docker compose
    
    ```jsx
    docker-compose up --build
    ```
    
4. Wait for all the container to build and run the services up
5. Test the web application at localhost:3000

# API Document
# **GET /api/v1/ticket**

Retrieve a list of tickets.

## **Query Parameters**

- **`limit`** (required) - The maximum number of tickets to retrieve. Must be a positive integer.
- **`offset`** (required) - The offset of the first ticket to retrieve. Must be a non-negative integer.
- **`status`** (optional) - The status of the tickets to retrieve. Must be an integer.

## **Response**

Returns a JSON object with the following properties:

- **`data`** (array) - An array of ticket objects.
- **`meta`** (object) - A metadata object with the following properties:
    - **`limit`** - The maximum number of tickets requested.
    - **`offset`** - The offset of the first ticket requested.
    - **`count`** - The number of tickets returned in this response.
    - **`total`** - The total number of tickets that match the specified criteria.
    - **`overall_total`** - The total number of tickets in the system.

### **Ticket Object**

A ticket object has the following properties:

- **`ticket_id`** (string) - The unique ID of the ticket.
- **`title`** (string) - The title of the ticket.
- **`description`** (string) - The description of the ticket.
- **`contact_info`** (string) - The contact information of the ticket
- **`created_at`** (string) - The date and time the ticket was created.
- **`updated_at`** (string) - The date and time the ticket was updated recently.
- **`status`** (integer) - The current status of the ticket.
- **`status_name_en`** (string) - The status name of the ticket in English

### **Example**

Request:

```
bashCopy code
GET /api/ticket?limit=10&offset=0

```

Response:

```
cssCopy code
HTTP/1.1 200 OK
Content-Type: application/json

{
  "data": [
    {
	    "ticket_id": "040151be-dee4-4467-b41a-ef156952c3f5",
	    "title": "Cloud Native Summit",
	    "description": "Purchase ticket is available!",
	    "contact_info": "sakkarin2000@gmail.com",
	    "created_at": "2023-03-08T10:13:39.981Z",
	    "updated_at": "2023-03-08T10:13:39.981Z",
	    "status": 0,
	    "status_name_en": "pending"
		},
		{
	    "ticket_id": "e305688e-9d86-420d-a537-df501d6ed59a",
	    "title": "Bangkok Developer Meeting",
	    "description": "Purchase ticket to join the event",
	    "contact_info": "sakkarin@gmail.com",
	    "created_at": "2023-03-08T10:14:59.249Z",
	    "updated_at": "2023-03-08T10:14:59.249Z",
	    "status": 0,
	    "status_name_en": "pending"
		}
  ],
  "meta": {
    "limit": 10,
    "offset": 0,
    "count": 2,
    "total": 100,
    "overall_total": 100
  }
}

```
