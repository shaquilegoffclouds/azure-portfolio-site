document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formStatus = document.getElementById("formStatus");

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim()
  };

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const rawText = await response.text();
    let result = {};

    try {
      result = rawText ? JSON.parse(rawText) : {};
    } catch {
      result = { error: rawText || "Non-JSON response returned by API." };
    }

    if (response.ok) {
      formStatus.textContent = result.message || "Message received successfully.";
      document.getElementById("contactForm").reset();
    } else {
      formStatus.textContent = `Error ${response.status}: ${result.error || result.message || "Request failed."}`;
    }
  } catch (error) {
    console.error(error);
    formStatus.textContent = "Server connection error.";
  }
});