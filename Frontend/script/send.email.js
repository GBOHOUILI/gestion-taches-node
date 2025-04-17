// script/send_email.js

emailjs.init("gWO25MTJSlbYoBZxr");

document.getElementById("emailForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const recipient = document.getElementById("recipient").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  emailjs.send("service_r0mpihd", "template_txewj7n", {
    to_email: recipient,
    subject: subject,
    message: message,
  })
  .then(() => {
    document.getElementById("successMessage").classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("successMessage").classList.add("hidden");
    }, 3000);
    document.getElementById("emailForm").reset();
  })
  .catch((error) => {
    console.error("Erreur lors de l'envoi :", error);
    alert("Une erreur s'est produite lors de l'envoi du mail.");
  });
});
