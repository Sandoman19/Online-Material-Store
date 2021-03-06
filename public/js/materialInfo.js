const purchaseBtn = document.getElementById("purchaseBtn");

purchaseBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const materialId = event.currentTarget.getAttribute("data-material-id");
  // send a post req to send order email
  fetch("/api/materials/" + materialId + "/confirm-order", {
    method: "POST",
    headers: {
      "content-type": "aplication/json",
      accept: "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      alert("Something broke while confiming order!");
    } else {
      // once done, alert sayign 'invoice sent'

      alert("Invoice sent");
      //then redirect to home
      window.location.href = "/";
    }
  });
});

function goBack() {
  window.history.back();
}

const button = document.getElementById("purchaseBtn");

button.addEventListener("click", disableButton);

function disableButton() {
  button.disabled = true;
  button.value = "Disabled";
  window.setTimeout(function () {
    button.disabled = false;
    button.value = "Enabled";
  }, 5000);
}
