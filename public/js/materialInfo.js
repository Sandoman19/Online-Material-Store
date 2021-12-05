const purchaseBtn = document.getElementById("purchaseBtn");

purchaseBtn.addEventListener("click", (event) => {
  event.preventDefault();
  // send a post req to send order email
  fetch("/api/materials/{{ material.id }}/confirm-order", {
    method: "POST",
    headers: {
      "content-type": "aplication/json",
      accept: "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      alert("You fucked up");
    } else {
      // once done, alert sayign 'invoice sent'

      alert("Invoice sent");
      //then redirect to home
      window.location.href = "/";
    }
  });
});
