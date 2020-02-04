//
const search= document.querySelector('#search');
const displayContainer = document.querySelector('#display_container');
const withName =document.querySelector('#with_name')
const withCapital=document.querySelector('#with_capital')
const withLanguage=document.querySelector('#with_language')
const sortCountries=document.querySelector('#sort_counties')
let countSearchResult=document.querySelector('#count_search_result')
let start
let flag
let searchInput =''

function compareCapital(a, b) {
    if (a.capital < b.capital) return -1;
    if (a.capital > b.capital)return 1;
    return 0;
}
function comparePopulation(b, a) {
    if (a.population < b.population) return -1;
    if (a.population > b.population)return 1;
    return 0;
}
function compareName(a, b) {
if (a.name < b.name) return -1;
if (a.name > b.name)return 1;
    return 0;
}
function compareLanguages(a,b) {
if (a.langs < b.langs) return -1;      
if (a.langs > b.langs)return 1;        
return 0;
}

const dislaySearch= (countries) => {
    displayContainer.innerHTML = ''  
    countries.forEach(country => {  
                const div=document.createElement('div')
                const h2= document.createElement('h2')
                const capital=document.createElement('p')
                const population = document.createElement('p')
                const flag=document.createElement('img')
                const languages=document.createElement('p')
                countSearchResult.textContent =`number of search result displayed: `+ `${displayContainer.childElementCount+1}`
                h2.textContent=country.name
                capital.textContent=country.capital
                population.textContent=country.population
                languages.textContent=country.langs
                languages.setAttribute('class','languages')
                flag.src=country.flag
                div.setAttribute("class","country_div")
                div.append(h2,capital,languages,population,flag)
                displayContainer.append(div)
               });        
    };
const searchAll= (countries) => {
    searchInput = search.value;     
    countries= countries.filter(country => {
        let searchIn=searchInput.toLowerCase()   
        return (country.name.toLowerCase().includes(searchIn))||(country.capital.toLowerCase().includes(searchIn))||(country.langs.toLowerCase().startsWith(searchIn))||(country.capital.toLowerCase().includes(searchIn))     
        })       
        dislaySearch(countries)  
};

const refineCountriesData = (countriesData)=> {
    let countries=[]
        for( {name,capital,languages,population,flag} of countriesData){
        let langs = languages.map((lang)=> lang.name)       
        langs=langs.toString()
        if( langs.length==0) langs='Not Found'
        if( capital.length==0) capital='Not Found'
      countries.push({name,capital,langs,population,flag})
        }return countries
}

const url = 'https://restcountries.eu/rest/v2/all'
fetch(url)
    .then(response => response.json())
    .then(countriesData => {   
     let refineCountries=refineCountriesData(countriesData)  
    dislaySearch(refineCountries)  
    chrtDisplay(refineCountries)    

//  ============  Add Event listener ===============
    search.addEventListener('input', function(){
       let countries=[...refineCountries]
        searchAll(countries)   
    })         
let click=true
    withName.addEventListener('click',function(){    
       let countries=[...refineCountries]
        if(click){
        searchAll(countries)
        click=false
        }
        else{
            searchAll(countries.reverse()) 
            click=true    
        }           
    })  

    withCapital.addEventListener('click',function(){    
        let countries=[...refineCountries]
         if(click){
            let sortedCountries=countries.sort(compareCapital)
         click=false
         searchAll(sortedCountries)
         }
         else{
             let sortedCountries=countries.sort(compareCapital).reverse()
             click=true 
             searchAll(sortedCountries)
         }           
     })  

     withLanguage.addEventListener('click',function(){    
        let countries=[...refineCountries]
         if(click){
        let sortedCountries=countries.sort(compareLanguages)
         click=false
         searchAll(sortedCountries)
         }
         else{
             let sortedCountries=countries.sort(compareLanguages).reverse()
             click=true 
             searchAll(sortedCountries)
         }           
     })              
})


const chrtDisplay= (refineCountries)=> {
    let chartArray=[]
    refineCountries.sort(comparePopulation)
    refineCountries.forEach(function(country){
       chartArray.push([country.name,country.population])
    })
    let tenCountryPopulation= []
  for(let i=0; i<10; i++){
    tenCountryPopulation.push(chartArray[i])
  }
console.log(tenCountryPopulation)
    anychart.onDocumentReady(function() {
        // set the data
        const data = {
            header: ["Name", "Death toll"],
            rows: tenCountryPopulation};
    
        // create the chart
        const chart = anychart.bar();
    
        // add the data
        chart.data(data);
    
        // set the chart title
        chart.title("chart");
    
        // draw
        chart.container("barChart");
        chart.draw();
      });

}






















