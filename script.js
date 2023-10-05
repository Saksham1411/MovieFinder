let search = document.getElementById('search');
let btn = document.getElementById('btn');
let showFav = document.getElementById('showFav');

window.addEventListener('DOMContentLoaded', () => {
    let fav = JSON.parse(localStorage.getItem('fav'));
    addToDisplay(fav, 'rem');
})

showFav.addEventListener('click', () => {
    let fav = JSON.parse(localStorage.getItem('fav'));
    addToDisplay(fav, 'rem');
})

let ExtractedData;
btn.addEventListener('click', async () => {
    ExtractedData = await getdata();
});

// console.log('hello');
async function getdata() {
    let item = search.value;
    let raw = await fetch(`https://www.omdbapi.com/?apikey=df6d4496&s=${item}`);
    let data = await raw.json();

    let arr = data.Search;
    search.value = "";

    addToDisplay(arr, 'add');
    return arr;
}

function addToDisplay(arr, type) {
    output = '';
    console.log(arr);
    if (arr === null) {
        document.getElementById('main').innerHTML = "no movie found";
    } else {
        arr.forEach((i, idx) => {
            output += `<div class="card">
            <div>
                <img src='${i.Poster}' alt='Poster'>
                <p>Name:- ${i.Title}</p>
                <p>Type:- ${i.Type}</p>
            </div>`
            if (type === 'add') {
                output += `
                    <div class=hide>
                        <button class='btn' id='fav' key='${idx}'>Add to Favorite</button>
                    </div>
                </div>`
            }
            if(type === 'rem'){
                output += `
                    <div class=hide>
                        <button class='btn' id='rem'>Remove</button>
                    </div>
                </div>`
            }
        });
        document.getElementById('main').innerHTML = output;
        initFav();
    }
}

function initFav() {
    let favBtn = document.querySelectorAll('#fav');
    favBtn.forEach(i => {
        i.addEventListener('click', (e) => {
            let idx = e.target.getAttribute('key');
            addToFav(ExtractedData[idx]);
        })
    });
}

function addToFav(item) {
    let fav;
    if (localStorage.getItem('fav') == null) {
        fav = [];
        localStorage.setItem('fav', JSON.stringify(fav));
    } else {
        fav = JSON.parse(localStorage.getItem('fav'));
    }

    //adding
    console.log(item);
    let flag = false;
    fav.some(i => {
        if (i.imdbID === item.imdbID) flag = true;
    })
    if (!flag) fav.push(item);
    localStorage.setItem('fav', JSON.stringify(fav));
}
