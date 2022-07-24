
let url = new URL(document.location).searchParams;
let cca2 = url.get("cca2");
let cca3 = url.get("cca3");
let ccn3 = url.get("ccn3");

let requete = `https://restcountries.com/v3.1/alpha?codes=${cca2},${cca3},${ccn3}`

function createFigure(resultat) {
    let flag = resultat.flags.png;
    let nativeName = Object.values(resultat.name);
    nativeName = nativeName[nativeName.length - 1];
    nativeName = Object.values(nativeName)[0].common;
    let population = new Intl.NumberFormat("en-US").format(resultat.population);
    let region = resultat.region;
    let subRegion = resultat.subregion;
    let capital = resultat.capital;
    let topLevelDomain = resultat.tld[0];
    let currenciesList = Object.values(resultat.currencies);
    /* Récupération des devises du pays*/
    let currencies = "";

    for (currencie of currenciesList) {
        currencies += currencie.name + ", ";
    }
    /* Suppression de la virgule ajoutée à la dernière devise*/
    currencies = currencies.slice(0, currencies.length - 2)
    /* Récupération de la liste des langes*/
    let languagesList = Object.values(resultat.languages);
    let languages = "";
    for (language of languagesList) {
        languages += language + ", ";
    }
    languages = languages.slice(0, languages.length - 2)
    let borderCountriesList = resultat.borders;
    console.log(borderCountriesList)

    /*Création de la figure*/

    let newFigure = document.createElement("figure");
    newFigure.setAttribute("id", "country_contain");

    /* Création de l'image*/
    let newFlag = document.createElement("img");
    newFlag.setAttribute("src", flag);
    newFlag.setAttribute("alt", `Flag of ${resultat.name.common}`);
    newFlag.setAttribute("class", "country_flag_big");
    newFigure.appendChild(newFlag);

    /* Création du Figcaption*/
    newFigcaption = document.createElement("figcaption");
    newFigure.appendChild(newFigcaption);

    /* Ajout du titre*/
    let newH2 = document.createElement("h2");
    newH2.innerText = resultat.name.common;
    newFigcaption.appendChild(newH2);

    /* Ajout du block d'info*/
    let divInfo = document.createElement("div");
    divInfo.setAttribute("class", "information_country_block");
    newFigcaption.appendChild(divInfo);

    /* Ajout du premier block d'info */
    let ulInformation = document.createElement('ul');
    ulInformation.setAttribute("id", "information_country1");
    ulInformation.setAttribute("class", "information_country");
    divInfo.appendChild(ulInformation);

    /*Ajout des infos du premier block */
    let li = document.createElement("li");
    li.innerHTML = `<strong>Native Name :</strong> ${nativeName}`;
    ulInformation.appendChild(li);
    li = document.createElement("li");
    li.innerHTML = `<strong>Population :</strong> ${population}`;
    ulInformation.appendChild(li);
    li = document.createElement("li");
    li.innerHTML = `<strong>Region :</strong> ${region}`;
    ulInformation.appendChild(li);
    li = document.createElement("li");;
    li.innerHTML = `<strong>Sub Region :</strong> ${subRegion}`;
    ulInformation.appendChild(li);
    li = document.createElement("li");
    li.innerHTML = `<strong>Capital :</strong> ${capital}`;
    ulInformation.appendChild(li);

    /* Création du deuxième block d'info*/
    ulInformation = document.createElement("ul");
    ulInformation.setAttribute("id", "information_country2");
    ulInformation.setAttribute("class", "information_country");
    divInfo.appendChild(ulInformation);
    li = document.createElement("li");
    li.innerHTML = `<strong>Top Level Domain :</strong> ${topLevelDomain}`;
    ulInformation.appendChild(li);
    li = document.createElement("li");
    li.innerHTML = `<strong>Currencies :</strong> ${currencies}`;
    ulInformation.appendChild(li);
    li = document.createElement("li");;
    li.innerHTML = `<strong>Languages :</strong> ${languages}`;
    ulInformation.appendChild(li);

    /* Création du block des liens des pays frontaliers*/
    newDiv = document.createElement("div");
    newDiv.setAttribute("id", "border_countries_link");
    newFigcaption.appendChild(newDiv);
    if (borderCountriesList!=undefined) {
    /*Ajout du titre*/
    let newH3 = document.createElement("h3");
    newH3.innerText = "Border Countries :";
    newDiv.appendChild(newH3);

    /*Ajout des pays frontaliers*/
    
        for (borderCountrie of borderCountriesList) {
            let requete = `https://restcountries.com/v3.1/alpha/${borderCountrie}`
            fetch(requete)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                }).then(result => {
                    console.log(result)
                    let newLinkCountry = document.createElement("a");
                    newLinkCountry.setAttribute("href", `./country.html?cca2=${result[0].cca2}&cca3=${result[0].cca3}ccn3=${result[0].ccn3}`);
                    newLinkCountry.setAttribute("class", "link_border");
                    newDiv.appendChild(newLinkCountry);
                    let newButton = document.createElement("button");
                    newButton.innerText = result[0].name.common;
                    newLinkCountry.appendChild(newButton)
                })

        }
    }
    let main = document.querySelector("main")
    main.appendChild(newFigure)
}

fetch(requete)
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    })
    .then(resultat => {


        createFigure(resultat[0]);

    })
    .catch(error => console.log(error))

