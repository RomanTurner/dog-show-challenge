document.addEventListener("DOMContentLoaded", () => {
  const GLOBAL_URL = "http://localhost:3000/dogs";
  const formDiv = document.querySelector(".margin.flex");
  formDiv.classList.add("hidden");
  function getDogs() {
    fetch(GLOBAL_URL)
      .then((res) => res.json())
      .then((dogs) => displayDogsToTable(dogs))
      .catch((error) => console.error("Error:", error));
  }

  function displayDogsToTable(dogs) {
    let tbody = document.getElementById("table-body");
    dogs.forEach((dog) => {
      //td sex, name, breed,  button set  & attribute id
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let btn = document.createElement("button");
      btn.addEventListener("click", (e) => editDog(e));
      td1.textContent = dog.name;
      td2.textContent = dog.breed;
      td3.textContent = dog.sex;
      btn.textContent = "Edit Dog";
      btn.setAttribute("id", dog.id);
      tr.append(td1, td2, td3, btn);
      appendChildToParent(tbody, tr);
    });
  }

  function editDog(e) {
    formDiv.classList.toggle("hidden");
    let dog = e.target.closest("tr").children;
    let form = document.querySelector("#dog-form");
    form.name.value = dog[0].textContent;
    form.breed.value = dog[1].textContent;
    form.sex.value = dog[2].textContent;
    form.addEventListener("submit", (e) => updateDog(e, dog, form));
  }
  function updateDog(e, dog, form) {
    e.preventDefault();
    let newDog = {
      name: form.name.value,
      breed: form.breed.value,
      sex: form.sex.value,
    };

    let configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDog),
    };

    fetch(GLOBAL_URL + "/" + dog[3].id, configObject)
      .then((res) => res.json())
      .then((res) => displayUpdate(res, dog))
      .catch((error) => console.error("ERROR:", error));
  }
  function displayUpdate(dog, oldSpot) {
    console.log(dog);
    console.log(oldSpot);
    oldSpot[0].textContent = dog.name;
    oldSpot[1].textContent = dog.breed;
    oldSpot[2].textContent = dog.sex;
  }

  function appendChildToParent(parent, child) {
    parent.appendChild(child);
  }

  getDogs();
});
