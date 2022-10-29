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
                const imgAttributes = {
                    "imgSrc": ["./assets/images/empty_check.png", "./assets/images/filled_check.png"],
                    "imgAlt": ["checkbox vide", "checkbox cochée"],
                    "imgClass": [["text-gray-700"], ["text-gray-300", "line-through"]]
                }
                
                img.src = imgAttributes.imgSrc[(tache.status-1)];
                img.alt = imgAttributes.imgAlt[(tache.status-1)];
                p.classList.add(...imgAttributes.imgClass[(tache.status-1)]);
                
                const pContent = document.createTextNode(tache.nom);
                p.appendChild(pContent);
                div.appendChild(img);
                div.appendChild(p);
                section.appendChild(div);
            });

        })
})