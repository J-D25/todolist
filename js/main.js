const section = document.getElementById("content");
const menu = document.getElementById("menu");
window.addEventListener("load", () => {
    menu.firstElementChild.style.color = "#3a7cfd";
    // suppression des tâches existantes
    while (section.lastElementChild) {
        section.removeChild(section.lastElementChild);
    }
    fetch("./../php/list.php")
        .then(response => response.json())
        .then(data => {
            data.forEach(tache => {
                const div = document.createElement("div");
                div.classList.add("bg-white", "py-4", "pl-5", "pr-2", "flex", "items-center", "border-b", "shadow-md", "lg:shadow-none");
                const img = document.createElement("img");
                img.classList.add("pr-3");
                const p = document.createElement("p");

                if (tache.status == 1) {
                    // tache en cours
                    img.src = "./assets/images/empty_check.png";
                    img.alt = "checkbox vide";
                    p.classList.add("text-gray-700");

                } else if (tache.status == 2) {
                    // tache terminée
                    img.src = "./assets/images/filled_check.png";
                    img.alt = "checkbox cochée";
                    p.classList.add("text-gray-300", "line-through");

                }
                const pContent = document.createTextNode(tache.nom);
                p.appendChild(pContent);
                div.appendChild(img);
                div.appendChild(p);
                section.appendChild(div);
            });

        })
})