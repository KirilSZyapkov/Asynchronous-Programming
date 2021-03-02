async function solution() {
    const display = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const respons = await fetch(url);
    const data = await respons.json();

    data.forEach(a => {
        const result = e('div', {className: 'accordion'},
            e('div', {className: 'head'},
                e('span', {}, a.title),
                e('button', {className: 'button', id: a._id}, 'More')),
            e('div', {className: 'extra', display: ''})
        )
        const show = result.querySelector('button');
        const preview = result.querySelector('.extra');
        show.addEventListener('click', () => {
            if (show.textContent === 'More') {
                toShow(a._id, preview, show);
            } else if (show.textContent === 'Less') {
                toHide(preview, show);
            }
        });
        display.appendChild(result);
    })

}

async function toShow(id, togle, btn) {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + id;
    const respons = await fetch(url);
    const data = await respons.json();
    let p = document.createElement('p');
    p.textContent = data.content;
    togle.innerHTML = '';
    togle.appendChild(p);
    togle.style.display = 'block';
    btn.textContent = 'Less';
}

function toHide(hide, btn) {
    hide.style.display = '';
    btn.textContent = 'More';
}

window.addEventListener('load', solution);


function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}