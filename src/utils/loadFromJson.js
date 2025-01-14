export async function loadFromJson (url) {
  try {
    const response = await fetch(url)
    const jsonData = await response.json()
    // console.log("json", jsonData)
    if (!response.ok) {
      throw new Error ('An error occurred while loading data')
    }
    return jsonData
  } catch (error) {
    console.error("Error", error);
    alert(error.message);
  }
}



