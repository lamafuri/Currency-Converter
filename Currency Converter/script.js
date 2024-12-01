const toImg = document.getElementById("toImg");
const fromImg = document.getElementById("fromImg");
const selects = document.querySelectorAll("select");
const submit = document.getElementById("submit");
const outputBox = document.getElementById("outputAmount");

submit.addEventListener("click",(event)=>{
    const inputAmount = document.getElementById("inputAmount").value;
    (async function(){
        let convertedAmount = await convert(inputAmount); //since convert is a async function so it returns a promise so, we receive the amount inside resolve and to get it we use await
        outputBox.innerText = convertedAmount;
    })();//iife
    event.preventDefault();//to avoid auto refreshing of the page
})

function flagChange(curFlag, changedOne) {
    let imgUrl = `https://flagsapi.com/${countryList[curFlag]}/shiny/64.png`
    if (changedOne.id == "to")
        toImg.setAttribute("src", imgUrl);//changing flag with change in select value
    else if (changedOne.id == "from")
        fromImg.setAttribute("src", imgUrl);
}

//Adding all country currency to option for selection dropdown
for (let select of selects) {
        for (const currCode in countryList) {
            let newOption = document.createElement("option");
            newOption.value = currCode;
            newOption.innerHTML= currCode;
            select.appendChild(newOption);
    }
}

async function convert(fromAmount) {
    let from = document.getElementById("from").value; //get country currency
    let to = document.getElementById("to").value;
    console.log("from "+from);
    console.log("to "+to)
    let response = await fetch(`https://v6.exchangerate-api.com/v6/4a5abdb1912022894b0a0846/latest/${from}`);
    response = await response.json();
    // console.log(rates["result"]);
    let rates = response["conversion_rates"];
    let resultAmount = rates[to]*fromAmount;
    console.log("final amount =>"+resultAmount);
    return resultAmount; //returns a promise where resultAmount is wrappped inside resolve;
}


