const form = document.querySelector("#schedule-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get("name")?.toString().trim() || "Website visitor";
    const email = data.get("email")?.toString().trim() || "";
    const phone = data.get("phone")?.toString().trim() || "";
    const date = data.get("date")?.toString().trim() || "";
    const message = data.get("message")?.toString().trim() || "";

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Preferred date: ${date}`,
      "",
      "Piano / service notes:",
      message
    ].join("\n");

    const mailto = new URL("mailto:cookpianoservice@gmail.com");
    mailto.searchParams.set("subject", `Piano service request from ${name}`);
    mailto.searchParams.set("body", body);
    window.location.href = mailto.toString();
  });
}
