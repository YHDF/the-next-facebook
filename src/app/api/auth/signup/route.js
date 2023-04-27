import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';
import authenticate from '../shared/authenticate';


export async function POST(request, response) {
  const jsonData = await request.json();
  const pb = new PocketBase('http://127.0.0.1:8090');
  const data = {
    username: jsonData.username,
    email: jsonData.email,
    password: jsonData.password,
    passwordConfirm: jsonData.password
  }

  try {
    const authData = await pb.collection('users').create(data).then(async (user) => {
      return await authenticate(pb, data);
    });
    console.log(`User ${data.username} created successfully`);

    // "logout" the last authenticated model
    pb.authStore.clear();

    return new Response(JSON.stringify(authData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.log(`Could not create user: ${err.toString()}`);
  }

}
