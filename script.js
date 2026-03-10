document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formStatus = document.getElementById("formStatus");

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      formStatus.textContent = "Message sent successfully.";
      document.getElementById("contactForm").reset();
    } else {
      formStatus.textContent = "There was a problem sending your message.";
    }
  } catch (error) {
    formStatus.textContent = "Server connection error.";
    console.error(error);
  }
});