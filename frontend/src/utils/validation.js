export function nameValidate(name) {
    let error = '';

    if (!name) {
      error  = 'Name is required';
    } else if (name.length < 3) {
      error = 'Name must be at least 3 characters long';
    }
    return error;
}

export function emailValidate(email) {
    let error = '';

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    if (!email) {
      error  = 'Email is required';
    } else if (!isValidEmail(email)) {
      error = 'Invalid email address';
    }
    return error;
}

export function passwordValidate(password) {
    let error = '';

    const isValidPassword = (password) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
        return passwordPattern.test(password);
    };

    if (!password) {
      error = 'Password is required';
    } else if (password.length < 8) {
      error = 'Password must be at least 8 characters long';
    } else if (!isValidPassword(password)) {
        error =
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character';
    }

    return error;
}
// export default function formValidation(data) {
//     let errors = {};

//     const isValidEmail = (email) => {
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailPattern.test(email);
//     };

//     const isValidPassword = (password) => {
//         const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
//         return passwordPattern.test(password);
//     };

//     if (!data.email) {
//       errors.email = 'Email is required';
//     } else if (!isValidEmail(data.email)) {
//       errors.email = 'Invalid email address';
//     }

//     if (!data.password) {
//       errors.password = 'Password is required';
//     } else if (data.password.length < 8) {
//       errors.password = 'Password must be at least 8 characters long';
//     } else if (!isValidPassword(data.password)) {
//         errors.password =
//         'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character';
//     }

//     return errors;
// }