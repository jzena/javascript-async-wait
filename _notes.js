const fetch = require('node-fetch');

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// instructor: https://github.com/mariusschulz/egghead-async-await
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
// async function fetchFromGitHub(endpoint) {
//     const url = `https://api.github.com${endpoint}`;
//     const response = await fetch(url);
//     return await response.json();

// }
// async function showUserAndRepost(handle) {
//     const [user, repos] = await Promise.all([
//         fetchFromGitHub(`/users/${handle}`),
//         fetchFromGitHub(`/users/${handle}/repos`)
//     ]);

//     console.log(user.name);
//     console.log(`${repos.length} repos`);
// }
// showUserAndRepost("jzena");


//// Use the await operator with any thenable
// const Bluebird = require("bluebird");
// async function main() {

//     console.log("working...");
//     await Bluebird.delay(2000);
//     console.log("Done.");
// }

// main();


//// Iterate asynchronously with the for-await-of loop
Symbol.asyncIterator = Symbol.asyncIterator || Symbol("asyncIterator");

const delay = (ms) => new Promise(resolve => {
    setTimeout(resolve, ms);
});

async function* someGenerator() {
    await delay(1000);
    yield 1;
    await delay(1000);
    yield 2;
    await delay(1000);
    yield 3;

}

async function main() {
    // for await (const value of someGenerator()) {
    //     console.log(value);
    // }
    const generator = someGenerator();
    while (true) {
        const { value, done } = await generator.next();
        if (done) {
            break;
        }
        console.log(value);

    }
}
main();

// run: node async.js