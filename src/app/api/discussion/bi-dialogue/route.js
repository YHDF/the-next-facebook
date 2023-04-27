import PocketBase from 'pocketbase';
import { aleaRNGFactory } from "number-generator";

const CHANNEL_PREFIX = 'CHNL'
const generator = aleaRNGFactory(2);

const pb = new PocketBase('http://127.0.0.1:8090');

const filterStringBuilder = (data) => {
  let str = '';

  data.forEach((value, key) => {
    if(key === data.length - 1) {
      str = str.concat(`users ?~ "${value.id}"`);
    }else{
      str = str.concat(`users ?~ "${value.id}" && `);

    }
  })
  return str;

}

export async function POST(request) {

  const payload = await request.text();
  let data = JSON.parse(payload.replace(/\s+/g, ''));

  const createData = {
    "channel": CHANNEL_PREFIX.concat('-', generator.uInt32().toString()),
    "users": [
      data[0].id,
      data[1].id
    ],
  };

  

  try {
    const discussions = pb.collection('discussions')
    let records = await discussions.getList(1, 20, {
      filter: filterStringBuilder(data)
    });

    if (records != null && records.totalItems === 0) {
      records = await pb.collection('discussions').create(createData);
    }

    return new Response(JSON.stringify(records), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.log(`Could not find users: ${err.toString()}`);
  }
}
