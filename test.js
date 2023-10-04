const jsonString = `{
    "username": "user1",
    "password": "password1"
}`;

try {
    const jsonObject = JSON.parse(jsonString);
    console.log(jsonObject);
} catch (error) {
    console.error('Error parsing JSON:', error);
}