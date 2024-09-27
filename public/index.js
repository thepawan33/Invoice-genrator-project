const ol = document.querySelector("ol");
const btn = document.querySelector(".btt-2");
const button = document.querySelector("#btn-2123");
const form = document.querySelector("form");

btn.addEventListener("click", function () {
  let li = document.createElement("li");
  li.innerHTML = `<div class="row mt-4">
  <div class="mb-3 col-md-3">
    <label class="form-label">Item name</label>
    <input
      name="it_name"
      placeholder="item name"
      class="form-control"
      type="text"
      required
    />
  </div>
  <div class="mb-3 col-md-2">
    <label class="form-label">Quantity</label>
    <input
      name="it_quantity"
      placeholder="enter quantity"
      class="form-control"
      type="number"
      required
    />
  </div>
  <div class="mb-3 col-md-2">
    <label class="form-label">Unit</label>
    <input
      name="it_unit"
      placeholder="pcs/pkt/kg"
      class="form-control"
      type="text"
      required
    />
  </div>
 
  <div class="mb-3 col-md-2">
    <label class="form-label">Rate</label>
    <input
      name="it_price"
      placeholder="enter rate"
      class="form-control"
      type="number"
      required
    />
  </div>
   <div class="mb-3 col-md-2">
    <label class="form-label">Tax name</label>
    <input
      name="tax_name"
      placeholder="enter tax name"
      class="form-control"
      value="GST"
      type="text"
      required
    />
  </div>
  <div class="mb-3 col-md-2">
    <label class="form-label">Tax %</label>
    <input
      name="tax_percent"
      placeholder="enter 0%"
      class="form-control"
      type="number"
      required
    />
  </div>
  <div class="col-auto">
    <button  class="btn btn-primary mb-3 mt-4 bg-danger del_btn">delete</button>
  </div> 
</div> 
`;
  ol.appendChild(li);
});

ol.addEventListener("click", (event) => {
  let detail = event.target.nodeName;
  let pr = event.target.parentElement.parentElement.parentElement;
  if (detail == "BUTTON") {
    pr.remove();
  }
});

button.addEventListener("click", () => {
  const inputId = document.querySelector("#inp-21");
  let res = inputId.value;

  async function sendReq() {
    await axios
      .post("/list/find", {
        id: res,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  sendReq()
    .then(() => {
      setTimeout(() => {
        location.reload(true);
      }, 500);
    })
    .catch((e) => {
      console.log("heollo ai eror");
    });
  inputId.value = "";
});
