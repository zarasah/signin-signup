export default function postData(data) {
    
    fetch('http://localhost:4001/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    //     .then((res) => {
    //         if (res.ok) {
    //             console.log('Registration successful:', res);
    //             return res.json();
    //         } else if (res.status === 409) {
    //             throw new Error('Email already exists');
    //         } else {
    //             return res.json();
    //         }
                
    //     })
    //     .then(result => {
    //         if (result && result.error && result.error[0].message) {
    //             throw new Error(result.error[0].message);
    //         } else {
    //             return result;
    //         }
    //     })
    //     .catch((error) => {
    //         console.log('catch registerUser', error);
    //         throw new Error(error.message);
    //     }
    // )
}