import {createRESTUrl} from "./general";

const authorize = (email, password) => {
    return new Promise((resolve, reject) => {
        fetch(createRESTUrl(`/user/api/user/authorization`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((response) => {
            if (response.ok && response.headers.get("SecurityToken") && response.headers.get("userId")) {
                resolve({
                    securityToken: response.headers.get("SecurityToken"),
                    userId: response.headers.get("userId"),
                });
            } else {
                reject();
            }
        });
    });
};

const createNewUser = (email, password, username, photoUrl) => {
    return new Promise((resolve, reject) => {
        fetch(createRESTUrl(`/user/api/user`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                photoUrl: photoUrl,
                username: username
            })
        }).then((response) => {
            if (response.ok) {
                resolve(response.ok);
            } else {
                reject();
            }
        });
    });
};

export {authorize, createNewUser}