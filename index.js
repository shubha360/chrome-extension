let myLeads = [];
const inputEl = document.querySelector('#input-el');
const inputBtn = document.querySelector('#input-btn');
const tabBtn = document.querySelector('#tab-btn');
const deleteBtn = document.querySelector('#delete-btn');
const ulEl = document.querySelector('#ul-el');

const leadsFromLS = JSON.parse(localStorage.getItem('myLeads'));

if (leadsFromLS) {
    myLeads = leadsFromLS;
    render(myLeads);
}

inputBtn.addEventListener('click', () => {

    saveLead();
    
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    
    render(myLeads);
    inputEl.value = '';
});

tabBtn.addEventListener('click', () => {
    
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        myLeads.push(tabs[0].url);
        localStorage.setItem('myLeads', JSON.stringify(myLeads));
        render(myLeads); 
    });
});

deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

function saveLead() {
    myLeads.push(inputEl.value);
}

function render(leads) {
    let listItems = "";
    
    for (let i = 0; i < leads.length; i++)
        listItems += `
            <li>
                <a href="${leads[i]}" target="_blank">
                    ${leads[i]}
                </a>
            </li>
        `;
    
    console.log(listItems);
    ulEl.innerHTML = listItems;
}