import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

//id = @request.auth.id
const pb = new PocketBase('http://127.0.0.1:8090');


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('q');

  try {
    const records = await pb.collection('users').getList(1, 20, {
      filter : `username ?~ "${keyword}"`
    })

    return new Response(JSON.stringify(records), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.log(`Could not find users: ${err.toString()}`);
  }

}
