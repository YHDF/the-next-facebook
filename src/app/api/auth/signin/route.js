import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';
import authenticate from '../shared/authenticate';

const pb = new PocketBase('http://127.0.0.1:8090');


export async function POST(request) {

  try {
    const authData = await authenticate(pb, request);

    // "logout" the last authenticated model
    pb.authStore.clear();

    // Registering the new topics

    return new Response(JSON.stringify(authData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.log(err.toString());
    return NextResponse.error(err.toString());
  }
}
