const authenticate = async (pb, body) => {
    console.log(Object.keys(body))
    let jsonData = null;
    if(Object.keys(body).includes('passwordConfirm')){
        jsonData = body;
    }else{
        jsonData = await body.json();
    }



    try {
        const user = await pb.collection('users').authWithPassword(jsonData.username, jsonData.password);
        // after the above you can also access the auth data from the authStore
        const authStore = {
            isValid: pb.authStore.isValid,
            token: pb.authStore.token,
            id : user.record.id,
            username: jsonData.username,
        };
        return authStore;
    } catch (err) {
        if (err) {
            console.log("Failed to authenticate");
            return {
                "errors": err
            }
        }
    }
};

module.exports = authenticate;