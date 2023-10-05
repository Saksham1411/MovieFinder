let search = document.getElementById('search');
let btn = document.getElementById('btn');
let showFav = document.getElementById('showFav');

window.addEventListener('DOMContentLoaded',()=>{
    let fav = JSON.parse(localStorage.getItem('fav'));
    addToDisplay(fav);
})

showFav.addEventListener('click',()=>{
    let fav = JSON.parse(localStorage.getItem('fav'));
    addToDisplay(fav);
})

let ExtractedData;
btn.addEventListener('click', async()=>{
    ExtractedData= await getdata();
});

// console.log('hello');
async function getdata() {
    let item = search.value;
    let raw = await fetch(`https://www.omdbapi.com/?apikey=df6d4496&s=${item}`);
    let data = await raw.json();

    let arr = data.Search;
    search.value="";

    addToDisplay(arr);
    return arr;
}

function addToDisplay(arr) {
    output = '';
    console.log(arr);
    if (arr === null) {
        document.getElementById('main').innerHTML = "no movie found";
    } else {
        arr.forEach((i,idx) => {
            output += `<div class="card">
            <div>
                <img src='${i.Poster}' alt='Poster'>
                <p>Name:- ${i.Title}</p>
                <p>Type:- ${i.Type}</p>
            </div>
            <div class=hide>
                <button class='btn' id='fav' key='${idx}'>Add to Favorite</button>
            </div>
            </div>
            `;
        });
        document.getElementById('main').innerHTML = output;
        initFav();
    }
}

function initFav(){
    let favBtn = document.querySelectorAll('#fav');
    favBtn.forEach(i=>{
        i.addEventListener('click',(e)=>{
            let idx = e.target.getAttribute('key');
            addToFav(ExtractedData[idx]);
        })
    });
}

function addToFav(item){
    let fav;
    if(localStorage.getItem('fav')==null){
        fav=[];
        localStorage.setItem('fav',JSON.stringify(fav));
    } else{
        fav = JSON.parse(localStorage.getItem('fav'));
    }
    
    //adding
    fav.push(item);
    localStorage.setItem('fav',JSON.stringify(fav));
}
