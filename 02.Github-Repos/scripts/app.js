async function loadRepos() {
    const userName = document.getElementById('username').value;
    const ul = document.getElementById('repos');
    const url = `https://api.github.com/users/${userName}/repos`;
    const respons = await fetch(url);
    const data = await respons.json();

    ul.innerHTML = '';
try {
    data.forEach(e => {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = e.url;
        a.textContent = e.full_name;
        li.appendChild(a);
        ul.appendChild(li);
    })
} catch (error){
    alert('User not found!');
}


}

// function e(type, attributes, ...content) {
//     const result = document.createElement(type);
//
//     for (let [attr, value] of Object.entries(attributes) || {}) {
//         if (attr.substring(0, 2) === 'on') {
//             result.addEvenListener(attr.substring(2).toLocaleLowerCase(), value);
//         } else {
//             result[attr] = value;
//         }
//     }
//
//     content = content.reduce((a, c) => Array.isArray(c) ? [c] : []);
//
//     content.forEach(e => {
//         if (typeof e === 'string' || typeof e === "number") {
//             result.appendChild(node);
//         } else {
//             result.appendChild(e);
//         }
//     })
//
//     return result;
//
// }