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

    const resultText = await response.text();

    if (response.ok) {
      formStatus.textContent = resultText || "Message received successfully.";
      document.getElementById("contactForm").reset();
    } else {
      formStatus.textContent = `Error ${response.status}: ${resultText || "Request failed."}`;
    }
  } catch (error) {
    console.error(error);
    formStatus.textContent = "Server connection error.";
  }
});