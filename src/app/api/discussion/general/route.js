import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

const CHANNEL_NAME= 'CHNL-GENERAL'
//console.log();

const pb = new PocketBase('http://127.0.0.1:8090');


export async function GET(request) {

  try {
    const discussions = pb.collection('discussions')
    let records = await discussions.getList(1, 20, {
      filter: `channel = "${CHANNEL_NAME}"`
    });


    return new Response(JSON.stringify(records), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.log(`Could not find channel: ${err.toString()}`);
  }
}
