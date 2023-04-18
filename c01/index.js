// // // import from "../"  -->ESModules ES2015

// const https = require("https"); // --> CommonJS
// const url = require("url"); 

// // const server = http.createServer((req, res) => {
// //     res.writeHead(200, { "Content-Type": "text/html" });
// //     const query = url.parse(req.url, true).query;
// //     const text = query.year + " " + query.month;
// //     // res.write();
// //     res.end(text);
// // });

// // server.listen(10000);

// const getUsers = https.get(
//     "https://jsonplaceholder.typicode.com/users", (res) => {
//     let data = [];
//     const headerDate = res.headers  && res.headers.date ? res.headers.date : "no response";

//     console.log('Date in response code', headerDate);
//     console.log('Status code', res.statusCode);

//     res.on('data', (chunk) => {
//         data.push(chunk);
//     })

//     res.on('end', () => {
//         console.log('Response ended');
//         const users = JSON.parse(Buffer.concat(data).toString());

//         for(let user of users) {
//             console.log(`User with id: ${user.id}, name: ${user.name}`);
//         }
//     })
//   }
// );

// getUsers.on('error', (err) => {
//     console.error(err.message);
// })


//classic(justFunction)
function sobiranje (a, b) {
    return a + b;
};
console.log(sobiranje(4, 5));

//arrow
const odzemanje = (x, y) => x - y;
console.log(odzemanje(10, 5));

//tretata xD
const mnozenje = function (num1, num2) {
    return num1 * num2;
};
console.log(mnozenje(6, 8))

// Homework 
// 1. Ternary nested operations

//mail na vangel: h.vangel22@gmail.com