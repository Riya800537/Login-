// LOGIN LOGIC
document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const msg = document.getElementById("message");

    if (user === "ria" && pass === "1234") {
        msg.textContent = "Login successful!";
        msg.style.color = "green";
        window.location.href = "welcome.html";
    } else {
        msg.textContent = "Invalid username or password.";
        msg.style.color = "red";
    }
});

// FEEDBACK SUBMIT LOGIC
document.getElementById("feedbackForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        message: document.getElementById("messageBox").value.trim(),
        subscribe: document.getElementById("subscribe").checked,
        department: document.getElementById("department").value
    };

    if (!data.name || !data.email || !data.message) {
        document.getElementById("statusMsg").textContent = "Please fill required fields.";
        document.getElementById("statusMsg").style.color = "red";
        return;
    }

    fetch("http://localhost:3000/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(result => {
            const msg = document.getElementById("statusMsg");

            if (result.success) {
                msg.style.color = "green";
                msg.textContent = "Feedback submitted successfully!";
                document.getElementById("feedbackForm").reset();
            } else {
                msg.style.color = "red";
                msg.textContent = "Error submitting feedback.";
            }
        })
        .catch(err => {
            document.getElementById("statusMsg").style.color = "red";
            document.getElementById("statusMsg").textContent = "Network error!";
            console.error("Fetch Error:", err);
        });
});




