# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.js >> API CRUD testing @api >> Read - GET
- Location: tests\api.spec.js:47:7

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { postData } from '../tests/test-data/bookingInfo';
  3   | 
  4   | let token;
  5   | let bookingId;
  6   | 
  7   | test.describe('API CRUD testing @api', () => {
  8   |   
  9   |   const baseURL = 'https://restful-booker.herokuapp.com';
  10  |   
  11  |   test.beforeAll(async ({ request }) => {
  12  |     const response = await request.post(`${baseURL}/auth`, {
  13  |       data: {
  14  |         username: "admin",
  15  |         password: "password123",
  16  |       },
  17  |       headers: {
  18  |         "Content-Type": "application/json",
  19  |       },
  20  |     });
  21  |     expect(response.ok()).toBeTruthy();
  22  |     const json = await response.json();
  23  | 
  24  |     console.log(json);
  25  | 
  26  |     token = json.token;
  27  |   });
  28  |   
  29  |   test('Create - POST', async ({request}) => {
  30  |     
  31  |     const response = await request.post(`${baseURL}/booking`, {
  32  |       data: postData,
  33  |     });
  34  | 
  35  |     expect(response.status()).toBe(200);
  36  | 
  37  |     const body = await response.json();
  38  |     expect(body.booking.firstname).toBe(postData.firstname);
  39  |     expect(body.booking.lastname).toBe(postData.lastname);
  40  |     expect(body.booking.totalprice).toBe(postData.totalprice);
  41  |     expect(body.bookingid).toBeDefined();
  42  | 
  43  |     console.log(body);
  44  |     bookingId = body.bookingid;
  45  |   })
  46  | 
  47  |   test('Read - GET', async ({request}) => {
  48  | 
  49  |     const response = await request.get(`${baseURL}/booking/${bookingId}`);
> 50  |     expect(response.ok()).toBeTruthy();
      |                           ^ Error: expect(received).toBeTruthy()
  51  | 
  52  |     const body = await response.json();
  53  |         
  54  |     expect(response.status()).toBe(200);
  55  |     expect(body.firstname).toBe(postData.firstname);
  56  |     expect(body.lastname).toBe(postData.lastname);
  57  |     expect(body.totalprice).toBe(postData.totalprice);
  58  |     expect(body.bookingdates.checkin).toBe(postData.bookingdates.checkin);
  59  |     expect(body.bookingdates.checkout).toBe(postData.bookingdates.checkout);
  60  |   })
  61  |     
  62  |   test('Update - PUT', async ({request}) => {
  63  |       
  64  |     console.log(token);
  65  |     console.log(bookingId);
  66  | 
  67  |     const response = await request.put(`${baseURL}/booking/${bookingId}`, {
  68  |       headers: {
  69  |         "Content-Type": "application/json",
  70  |         Accept: "application/json",
  71  |         Cookie: `token=${token}`,
  72  |       },
  73  |         
  74  |       data: {
  75  |         firstname: "Ada",
  76  |         lastname: "Wong",
  77  |         totalprice: 249,
  78  |         depositpaid: true,
  79  |         bookingdates: {
  80  |           checkin: "2026-04-04",
  81  |           checkout: "2026-05-05",
  82  |         },
  83  |       },
  84  |     });
  85  | 
  86  |     expect(response.ok()).toBeTruthy();
  87  |     expect(response.status()).toBe(200);
  88  |       
  89  |     const newBody = await response.json();
  90  |     expect(newBody.firstname).toBe("Ada");
  91  |     expect(newBody.lastname).toBe("Wong");
  92  |       
  93  |     console.log(newBody);
  94  |   })
  95  | 
  96  |   test('Delete - DELETE', async ({request}) => {
  97  |       
  98  |     const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
  99  |       headers: {
  100 |         "Content-Type": "application/json",
  101 |         Cookie: `token=${token}`,
  102 |       },
  103 |     });
  104 |       
  105 |     expect(response.ok()).toBeTruthy();
  106 |     expect(response.status()).toBe(201);
  107 | 
  108 |     const responseCheck = await request.get(`${baseURL}/booking/${bookingId}`);
  109 |     expect(responseCheck.status()).toBe(404);
  110 |   })
  111 | })
  112 | 
```