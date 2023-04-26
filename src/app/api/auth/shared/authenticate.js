const authenticate = async (pb, body) => {
    let jsonData = null;
    if (typeof body === 'object') {
        jsonData = body;
    } else {
        console.log('body is not an object');
        jsonData = await body.json();
    }

    try {
        await pb.collection('users').authWithPassword(jsonData.username, jsonData.password);
        // after the above you can also access the auth data from the authStore
        const authStore = {
            isValid: pb.authStore.isValid,
            token: pb.authStore.token,
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