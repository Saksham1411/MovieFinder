let search = document.getElementById('search'); 
let btn = document.getElementById('btn');
btn.addEventListener('click',addToDisplay);
console.log('hello');
async function getdata(item){
    let raw = await fetch(`http://www.omdbapi.com/?apikey=df6d4496&s=${item}`);
    let data = await raw.json();

    let arr = data.Search;
    return arr;
    
}

async function addToDisplay(){
    let item = search.value;
    let arr = await getdata(item);
    output = '';
    console.log(arr);
    if(arr===undefined){
        document.getElementById('main').innerHTML = "no movie found";

    }else{

        arr.forEach(i => {
            output+=`<div class="card">
        <img src='${i.Poster}' alt='Poster'>
        <p>Name:- ${i.Title}</p>
        <p>Type:- ${i.Type}</p>
        </div>
        `
        ;
    });
    document.getElementById('main').innerHTML = output;
    }
}
// search.addEventListener('input', addToDisplay);


// getdata();