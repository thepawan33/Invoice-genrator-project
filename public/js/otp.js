let genrate = document.querySelector("#otpGen");

genrate.addEventListener("click", () => {
  let email = document.querySelector("#email");
  if (email.value != "") {
    let otpInput = document.querySelector("#otpInput");
    otpInput.style = "display:block";
    async function sendReq() {
      await axios
        .post("/otp", {
          email: email.value,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    sendReq();
    alert("Your Otp Send Successfully Check On Your E-mail");
    hideButton();
  } else {
    alert("Please Enter Valid Email");
  }
});

function hideButton() {
  let p = document.querySelector("#tempory");
  genrate.style = "display:none";
  p.style = "display:initial;color:red";
  setTimeout(() => {
    genrate.style = "initial";
    p.style = "display:none";
  }, 30000);
}
