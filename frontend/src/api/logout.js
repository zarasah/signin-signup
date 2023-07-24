export default async function logout(sessionToken) {
    console.log('token', sessionToken)
    try {
        await fetch('http://localhost:4001/logout', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": sessionToken
            },
        })
    } catch (error) {
        throw new Error(error.message || 'Invalid email or password');
    }
}