const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.verifyFbUsers = functions.auth.user().onCreate((user, context) => {
    if(!user.providerData[0].providerId.includes('facebook')) {
        return {
            result: 'User created with email and password!',
        };
    }
    admin.auth().updateUser(user.uid, {
        emailVerified: true,
    })
    .then(resp => console.log(resp))
    .catch(error => console.log(error));
});

// exports.addCustomClaim = functions.https.onCall((data, context) => {
//     admin.auth().getUserByEmail(data.email)
//         .then(resp => {
//             if(resp.emailVerified !== true) {
//                 return {
//                     error: 'Request not authorized. Your email is not verified.', 
//                 }
//             }
//             return admin.auth().setCustomUserClaims(resp.uid, {
//                 verified: true,
//             });
//         })
//         .catch(error => console.log(error));
// });