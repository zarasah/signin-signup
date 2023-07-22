export default async function login(data) {
    try {
        const response = await fetch('http://localhost:4001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (response.ok) {
            const data = await response.json();
            return data;
        }  else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Invalid email or password');
        }
    } catch (error) {
        throw new Error(error.message || 'Invalid email or password');
    }
}