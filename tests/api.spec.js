import { test, expect } from '@playwright/test';
import { postData } from '../tests/test-data/bookingInfo';

let token;
let bookingId;

test.describe.serial('API CRUD testing @api', () => {
  
  const baseURL = 'https://restful-booker.herokuapp.com';
  
  test('Get token', async ({ request }) => {
    const response = await request.post(`${baseURL}/auth`, {
      data: {
        username: "admin",
        password: "password123",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(response.ok()).toBeTruthy();
    const json = await response.json();

    console.log(json);

    token = json.token;
  });
  
  test('Create - POST', async ({request}) => {
    
    const response = await request.post(`${baseURL}/booking`, {
      data: postData,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.booking.firstname).toBe(postData.firstname);
    expect(body.booking.lastname).toBe(postData.lastname);
    expect(body.booking.totalprice).toBe(postData.totalprice);
    expect(body.bookingid).toBeDefined();

    console.log(body);
    bookingId = body.bookingid;
  })

  test('Read - GET', async ({request}) => {

    const response = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
        
    expect(response.status()).toBe(200);
    expect(body.firstname).toBe(postData.firstname);
    expect(body.lastname).toBe(postData.lastname);
    expect(body.totalprice).toBe(postData.totalprice);
    expect(body.bookingdates.checkin).toBe(postData.bookingdates.checkin);
    expect(body.bookingdates.checkout).toBe(postData.bookingdates.checkout);
  })
    
  test('Update - PUT', async ({request}) => {
      
    console.log(token);
    console.log(bookingId);

    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
        
      data: {
        firstname: "Ada",
        lastname: "Wong",
        totalprice: 249,
        depositpaid: true,
        bookingdates: {
          checkin: "2026-04-04",
          checkout: "2026-05-05",
        },
      },
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
      
    const newBody = await response.json();
    expect(newBody.firstname).toBe("Ada");
    expect(newBody.lastname).toBe("Wong");
      
    console.log(newBody);
  })

  test('Delete - DELETE', async ({request}) => {
      
    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });
      
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const responseCheck = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(responseCheck.status()).toBe(404);
  })
})
