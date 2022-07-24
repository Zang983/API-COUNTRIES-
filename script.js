
let listePays = "", pageActuelle = 0, nombreDrapeauAfficher = 305;
let btn_filter = document.getElementById("filter_block");
let filters = [];

class filter {
    name = "";
    status = false;
    constructor(name, status) {
        this.name = name;
        this.status = status
        this.block = document.getElementById(this.name)
    }
    clickEvent(resultat) {
        document.getElementById(this.name).addEventListener("click", () => {
            resetDom()
            let result="";
            let resultatFiltre = [];
            this.status = !this.status
            this.changeColor(this)

            for(let element of filters){
                if(element.status === true){ 
                    result = resultat.filter(contryRegion => contryRegion.region === element.name)
                    resultatFiltre = resultatFiltre.concat(result)
                }
            }
            if (resultatFiltre.length === 0) {
                for (pays of resultat) {
                    afficheElement(pays)
                }
            }
            else {
                for (pays of resultatFiltre) {
                    afficheElement(pays)
                }
            }
        })
    }
    changeColor(filtre)
    {
        if(filtre.status === true)
        {
            filtre.block.style.color="red";
        }
        else
        {
            filtre.block.style.color="inherit"
        }
    }
}
function searchBar(result,value)
{
    let resultatFiltre=""
    resultatFiltre=result.filter(pays =>pays.name.common.slice(0,value.length).toUpperCase()===value.toUpperCase());
    resetDom();
    for(pays of resultatFiltre)
    {
        afficheElement(pays)
    }
}

function afficheElement(pays) {
    let name = pays.name.common, capital = pays.capital, region = pays.region
    let flag = pays.flags.png
    let link = `./country.html?cca2=${pays.cca2}&cca3=${pays.cca3}ccn3=${pays.ccn3}`;
    let blockParent = document.getElementById("countries_display");
    let population =new Intl.NumberFormat("en-US").format(pays.population)

    /* Création du lien */
    let newLink = document.createElement("a");
    newLink.setAttribute("href", link);
    newLink.setAttribute("id", pays.cca2);
    newLink.setAttribute("class", "country_card country_card_index");

    /* Création d'une nouvelle figure */
    let newFigure = document.createElement("figure");
    newLink.appendChild(newFigure);
    /* Ajout du drapeau */
    let newFlag = document.createElement("img");
    newFlag.setAttribute("src", flag);
    newFlag.setAttribute("alt", `Flag of ${name}`);
    newFlag.setAttribute("class", "country_flag country_flag_index");
    newFigure.appendChild(newFlag);
    /*Ajout du figcaption */
    let newFigcaption = document.createElement("figcaption");
    newFigure.appendChild(newFigcaption);
    /* Ajout du titre */
    let newH2 = document.createElement("h2");
    newH2.setAttribute("class", "country_name country_name_index");
    newH2.innerText = name;
    newFigcaption.appendChild(newH2);
    /* Ajout du contenant des infos */
    let newInformationList = document.createElement("div");
    newInformationList.setAttribute("class", "information_list information_list_index");
    newFigcaption.appendChild(newInformationList);
    /* Ajout de la population */
    let newP = document.createElement("p");
    newP.setAttribute("class", "population_country population_country_index");
    newP.innerHTML = `<strong class="information_name_index information_name"> Population : </strong>` + population
    newInformationList.appendChild(newP)
    /* Ajout de la région */
    newP = document.createElement("p");
    newP.setAttribute("class", "region_country region_contry_index");
    newP.innerHTML = `<strong class="information_name_index information_name"> Région : </strong>` + region
    newInformationList.appendChild(newP)
    /* Ajout de la Capitale */
    newP = document.createElement("p");
    newP.setAttribute("class", "region_country region_contry_index");
    newP.innerHTML = `<strong class="capital_country capital_country_index"> Capital : </strong>` + capital
    newInformationList.appendChild(newP)
    /* Ajout du nouveau block dans le main*/
    blockParent.appendChild(newLink);
}

function resetDom() {
    let blockParent = document.getElementById("countries_display");
    while (blockParent.firstChild) {
        blockParent.removeChild(blockParent.firstChild)
    }

}
function accueil() {
    fetch("https://restcountries.com/v3.1/all")
        .then(res => {
            if (res.ok) {
                return res.json()
            }
        })
        .then(result => {
            console.log(result[0])
            console.log(result[1])
            let inputSearch = document.getElementById("search_input");
            inputSearch.addEventListener("input",()=>searchBar(result,inputSearch.value))
            creationFiltre(result)
            for (pays of result) {
                afficheElement(pays)
            }

        })
        .catch(error => console.log(error))
}

function creationFiltre(resultat) {
   
    filters.push(new filter("Africa", false))
    filters.push(new filter("Americas", false))
    filters.push(new filter("Asia", false))
    filters.push(new filter("Europe", false))
    filters.push(new filter("Oceania", false))
    for (filtre of filters) {
        filtre.clickEvent(resultat);
    }
}


accueil();

btn_filter.addEventListener("click",()=>{
    let filter_list = document.getElementById("filter_list")
    let status = getComputedStyle(filter_list).display
    status ==="none" ? filter_list.style.display="block" : filter_list.style.display="none"
})

