// use one component only per page

let folded;
let titleElement;
let headerElement;
let markElement;
let bodyElement;

function collapsibleInit(){
    titleElement = document.getElementsByClassName("collapsible-title")[0];
    bodyElement = document.getElementsByClassName("collapsible-body")[0];
    folded = bodyElement.hasAttribute("open") ? false : true;
    console.log(folded)
    headerElement = titleElement.children[0];
    headerElement.innerHTML = 
    `<span class="collapsible-mark">` + (folded ? `✊` : `🖐`) + `</span>` + headerElement.innerHTML;

    markElement = document.getElementsByClassName("collapsible-mark")[0];

    titleElement.addEventListener("click", collapsibleClick);
}

function collapsibleClick(){
    folded = !folded;
    markElement.innerHTML = folded ? '✊' : '🖐';
    bodyElement.style.display = folded ? 'none' : 'block';
}