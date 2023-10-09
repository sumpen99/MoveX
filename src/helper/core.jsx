// http://localhost:5173/
//http://www.omdbapi.com/?apikey=[603c16e8]& -> MOVIE
//http://img.omdbapi.com/?apikey=[603c16e8]& -> POSTERS


export const FILTER_OPTION = Object.freeze({
    NAME:"Title",
});

export const MOVIES_PER_PAGE_OPTION = Object.freeze({
    TEN:10,
});

export function stringInterPolation(...args){
    let str = "";
    args.forEach( (arg) =>
        str += `${arg} `
    );
    console.log(str)
}


/*
export async function parseBreedFromListOfClients(clients){
    return new Promise( resolve => { 
        const breeds = parseBreeds(clients); 
        resolve(breeds); 
    });
}

function parseBreeds(clients){
    const breeds = {};
    clients.map(client => {
        const breed = client.breed; 
        if(breed in breeds){
            breeds[breed]++;
        } 
        else{
            breeds[breed] = 1;
        }
    });
    return breeds;

}*/

export function capitalizeFirstLetter(string) {
    if(!string){return string;}
    return string.charAt(0).toUpperCase() + string.slice(1);
}