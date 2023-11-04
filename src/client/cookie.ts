async function setCookie() {
  try {
    const response = await fetch('https://twine-rt.com/set-cookie', {
      method: 'GET',
      credentials: 'include',
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

export { setCookie };
