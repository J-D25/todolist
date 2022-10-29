const section = document.getElementById("content");
const menu = document.getElementById("menu");
const input = document.querySelector("input");
const inputStatus = input.previousElementSibling;
const count = document.querySelector(".text-gray-400");

var imgAttributes = {
    "imgSrc": ["./assets/images/empty_check.png", "./assets/images/filled_check.png"],
    "imgAlt": ["checkbox vide", "checkbox cochée"],
    "imgClass": [["text-gray-700"], ["text-gray-300", "line-through"]]
}

// Au chargement de la page
window.addEventListener("load", () => {
    menu.firstElementChild.style.color = "#3a7cfd";
    setImgAttribute(inputStatus, 0);
    // suppression des tâches existantes
    while (section.lastElementChild) {
        section.removeChild(section.lastElementChild);
    }
    fetch("./../php/list.php")
        .then(response => response.json())
        .then(data => {
            data.taches.forEach(tache => {
                showTaches(tache);
            });
            count.textContent = data.count + (data.count > 1 ? " tâches restantes" : " tâche restante");
        })
})

// Au clic sur la checkbox de l'input
inputStatus.addEventListener("click", () => {
    setImgAttribute(inputStatus, +!Number(inputStatus.dataset['status']));
})

// Au remplissage de l'input
input.addEventListener("change", (event) => {
    if (event.target.value && event.target.value != " ") {
        let newTache = {
            "nom": event.target.value,
            "status": (Number(inputStatus.dataset['status']) + 1)
        }
        let tacheToAdd = new FormData();
        tacheToAdd.append("nom", newTache.nom);
        tacheToAdd.append("status", newTache.status);
        fetch("./../php/add.php", { method: "POST", body: tacheToAdd })
            .then(response => response.json())
            .then(data => {
                if (data.responseDB === true) {
                    input.value = "";
                    setImgAttribute(inputStatus, 0);
                    newTache.id = data.id;
                    showTaches(newTache);
                    count.textContent = data.count + (data.count > 1 ? " tâches restantes" : " tâche restante");
                }
            })
    }
})

// crée une div contenant la nouvelle tâche et l'insère
function showTaches(tache) {
    const div = document.createElement("div");
    div.classList.add("bg-white", "py-4", "pl-5", "pr-2", "flex", "items-center", "border-b", "shadow-md", "lg:shadow-none");

    const img = document.createElement("img");
    img.classList.add("pr-3");
    setImgAttribute(img, (tache.status - 1));

    const p = document.createElement("p");
    p.classList.add(...imgAttributes.imgClass[(tache.status - 1)]);
    const pContent = document.createTextNode(tache.nom);
    p.appendChild(pContent);

    img.addEventListener("click", () => {
        let imgStatus = +!Number(img.dataset['status']);
        let pClasses = imgAttributes.imgClass[imgStatus].join(' ');
        setImgAttribute(img, imgStatus);
        p.setAttribute("class", pClasses);

        let tacheToUpdate = new FormData();
        tacheToUpdate.append("id", tache.id);
        tacheToUpdate.append("status", (imgStatus + 1));
        fetch("./../php/update.php", { method: "POST", body: tacheToUpdate })
            .then(response => response.json())
            .then(data => {
                count.textContent = data.count + (data.count > 1 ? " tâches restantes" : " tâche restante");
            })
    })

    div.appendChild(img);
    div.appendChild(p);
    section.appendChild(div);
}

// insère la source de l'image et son status
function setImgAttribute(img, status) {
    img.src = imgAttributes.imgSrc[status];
    img.alt = imgAttributes.imgAlt[status];
    img.dataset.status = status;
}