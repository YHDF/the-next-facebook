The Next Facebook

This is a simple MQTT-based chat application called "The Next Facebook". It allows users to sign up, log in, and chat with each other in a general chat room or via private messages.
Dependencies

To run the application, you need to have Node.js and Pocketbase installed on your machine.

You can install the dependencies by running the following command:

npm install

Starting the Application

To start the application, run the following command:

npm run dev

This will start the application in development mode.
Starting Pocketbase

To start Pocketbase, navigate to src/pb/[linux] | [windows] and run the following command:

./pocket serve

This will start Pocketbase and create the necessary tables for the application to function.
Usage

After starting the application and Pocketbase, navigate to http://localhost:3000 in your web browser. You will be taken to the sign-up page where you can create a new account. Once you've created an account, you can log in and start chatting with other users.

The application allows you to chat in a general chat room or via private messages with other users. To start a private chat, click on the username of the user you want to chat with and send them a message.
Contributing

If you'd like to contribute to the project, feel free to fork the repository and submit a pull request.
License

This project is licensed under the MIT license. See the LICENSE file for more details.