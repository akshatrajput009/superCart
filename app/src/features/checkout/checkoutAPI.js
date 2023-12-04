// A mock function to mimic making an async request for data
export function fetchAddress(address) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/address", {
      method: "POST",
      body: JSON.stringify(address),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
