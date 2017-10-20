const fetch = require('node-fetch');

//// simple function
// function showGitHubUser(handle) {
//     const url = `https://api.github.com/users/${handle}`;
//     fetch(url)
//         .then(response => response.json())
//         .then(user => {
//             console.log(user.name);
//             console.log(user.location);
//         });
// }
// showGitHubUser("jzena");

//// async function
// async function showGitHubUser(handle) {
//     const url = `https://api.github.com/users/${handle}`;
//     const response = await fetch(url);
//     const user = await response.json();
//     console.log(user.name);
//     console.log(user.location);
// }
// showGitHubUser("jzena");


//// Call an asynchronous function
// async function showGitHubUser(handle) {
//     const url = `https://api.github.com/users/${handle}`;
//     const response = await fetch(url);
//     return await response.json();    
// }

// showGitHubUser("jzena")
//     .then(user => {
//         console.log(user.name);
//         console.log(user.location);
//     });


//// convert any function into an asynchronous function
// class GitHubApiClient {
//     async fetchUser(handle) {
//         const url = `https://api.github.com/users/${handle}`;
//         const response = await fetch(url);
//         return await response.json();
//     }
// }
// (async () => {
//     const client = new GitHubApiClient();
//     const user = await client.fetchUser("jzena");
//     console.log(user.name);
//     console.log(user.location);
// })();

//// Handle Errors in asynchronous functions
// async function fetchGitHubUser(handle) {
//     const url = `https://api.github.com/users/${handle}`;
//     const response = await fetch(url);
//     const body = await response.json();

//     if (response.status !== 200)
//         throw Error(body.message);

//     return body;
// }

// fetchGitHubUser("jzena")
//     .then(user => {
//         console.log(user.name);
//         console.log(user.location);
//     })
//     .catch(err => {
//         console.log(`Error: ${err.message}`)
//     });


//// Await multiple promises sequentially or concurrently
// async function fetchFromGitHub(endpoint) {
//     const url = `https://api.github.com${endpoint}`;
//     const response = await fetch(url);
//     return await response.json();

// }
// async function showUserAndRepost(handle) {
//     //Promise secuentially
//     //const user = await fetchFromGitHub(`/users/${handle}`);
//     //const repos = await fetchFromGitHub(`/users/${handle}/repos`);

//     //Promise in paralell
//     const userPromise = fetchFromGitHub(`/users/${handle}`);
//     const reposPromise = fetchFromGitHub(`/users/${handle}/repos`);

//     const user = await userPromise;
//     const repos = await reposPromise;

//     console.log("user.name");
//     console.log(`${repos.length} repos`);
// }

// showUserAndRepost("jzena");



//// await multiple promises concurrently with promise.all()
async function fetchFromGitHub(endpoint) {
    const url = `https://api.github.com${endpoint}`;
    const response = await fetch(url);
    return await response.json();

}
async function showUserAndRepost(handle) {
    const [user, repos] = await Promise.all([
        fetchFromGitHub(`/users/${handle}`),
        fetchFromGitHub(`/users/${handle}/repos`)
    ]);

    console.log(user.name);
    console.log(`${repos.length} repos`);
}
showUserAndRepost("jzena");

// run: node async.js