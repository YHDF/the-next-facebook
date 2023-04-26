import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';
import { aleaRNGFactory, NumberGeneratorState } from "number-generator";
const generator = aleaRNGFactory(2);

console.log(generator.uInt32())


const pb = new PocketBase('http://127.0.0.1:8090');

const topicPrefix = "TPC"

export async function POST(request) {

  const body = await request.json();

  const authData = await pb
    .collection('users')
    .authWithPassword(body.username, body.password)
    .then(() => {// after the above you can also access the auth data from the authStore
      const authStore = {
        isValid: pb.authStore.isValid,
        token: pb.authStore.token,
        username: body.username,
      }
      return authStore
    })
    .catch(err => { console.log("Failed to authenticate") });


  // "logout" the last authenticated model
  pb.authStore.clear();

  //Registering the new topics

  

  return NextResponse.json(authData);
}


/*export async function POST(req, res) {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const data = {
    username: "foo",
    email: "foo@example.com",
    password: "pocketbase",
    passwordConfirm: "pocke"
  }

  const authData = await pb
    .collection('users')
    .create(data)
    .then((user) => {console.log(`User ${user.username} created succesfully`)})
    .catch((err) => {console.log(`Could not create user : ${err.toString()}`)})



  // "logout" the last authenticated model
  pb.authStore.clear();



  return NextResponse.json(data);
}*/
