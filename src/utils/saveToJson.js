export async function saveToJson(url, bodyData) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error", error);
    alert(error.message);
  }
}
