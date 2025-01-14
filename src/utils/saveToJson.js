export async function saveToJson(url, bodyData) {
  try {
    await fetch(`${url}/${bodyData.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("An error occurred while saving data", bodyData);
    }
  } catch (error) {
    console.error("Error", error.message);
    alert(error.message);
  }
}
