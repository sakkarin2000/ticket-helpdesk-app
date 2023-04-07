# ticket-helpdesk-app

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
5. Test the web application at localhost

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

### POST **/api/v1/ticket**

Create ticket 

- URL: **`/ticket`**
- Method: **`POST`**
- Headers:
    - Content-Type: **`application/json`**
- Body:
    
    ```
    jsonCopy code
    {
      "title": "string",
      "description": "string",
      "contact_info": "string"
    }
    
    ```
    
    | Field | Type | Required | Description |
    | --- | --- | --- | --- |
    | title | string | Yes | The title of the ticket |
    | description | string | Yes | The description of the ticket |
    | contact_info | string | Yes | The contact information of the ticket |

### **Response**

- Status Code: **`201 Created`** if the ticket is created successfully
- Status Code: **`400 Bad Request`** if the required fields are not provided or invalid
- Status Code: **`500 Internal Server Error`** if there is an error while creating the ticket
- Body:
    - If the ticket is created successfully:
        
        ```
        jsonCopy code
        {
          "message": "Create ticket success",
        }
        ```
        
        | Field | Type | Description |
        | --- | --- | --- |
        | message | string | The success message |
    - If there is an error while creating the ticket:
        
        ```
        jsonCopy code
        {
          "message": "Error, Can't create ticket"
        }
        ```
        
        | Field | Type | Description |
        | --- | --- | --- |
        | message | string | The error message details |
        

### PUT **/api/v1/ticket**

Update ticket Info and Status

### **Request Parameters**

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| title | Yes | string | The new title of the ticket |
| description | Yes | string | The new description of the ticket |
| contact_info | Yes | string | The new contact information for the ticket |
| ticket_id | Yes | string | The unique identifier of the ticket to be updated |
| status | Yes | string | The new status of the ticket (e.g., -1 = Rejected, 1 = Accept, 0 = Pending, 2 = Resolved) |

### **Response Codes**

| Status Code | Description |
| --- | --- |
| 201 | Ticket updated successfully |
| 400 | Bad Request. Required parameter ticket_id is missing. |
| 404 | Ticket with the provided ticket_id not found in the database. |
| 500 | Internal Server Error. Something went wrong on the server. |

### **Example Request**

```
javascriptCopy code
PUT /tickets
{
    "title": "New Title",
    "description": "New Description",
    "contact_info": "new_contact_info@example.com",
    "ticket_id": "a uuidV4()",
    "status": "-1"
}

```

### **Example Response**

```
javascriptCopy code
HTTP/1.1 201 OK
"Update ticket info & status success"

```
