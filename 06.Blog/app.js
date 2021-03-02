async function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/blog/posts';
    const respons = await fetch(url);
    const data = await respons.json();

    const select = document.getElementById('posts');
    const loadBtn = document.getElementById('btnLoadPosts').addEventListener('click', () => {
        load(select, data);
    });
    const veiwBtn = document.getElementById('btnViewPost').addEventListener('click', () => {
        getPost(select)
    });

}

async function load(select, data) {

    select.innerHTML = '';
    Object.values(data).forEach(p => {
        console.log(p)
        let option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.title;
        select.appendChild(option);
    })
}

function getPost(select) {
    const postID = select.value;
    getComent(postID);
}

async function getComent(id) {
    const ul = document.getElementById('post-comments');
    ul.innerHTML = '';

    const postURL = 'http://localhost:3030/jsonstore/blog/posts/' + id;
    const cometURL = 'http://localhost:3030/jsonstore/blog/comments';

    const [postRespons, comentRespons] = await Promise.all([
        fetch(postURL),
        fetch(cometURL)
    ]);

    const postData = await postRespons.json();

    document.getElementById('post-title').textContent = postData.title;
    document.getElementById('post-body').textContent = postData.body;

    const comentData = await comentRespons.json();
    const coments = Object.values(comentData).filter(c => c.postId == id);

    coments.map(creatCom).forEach(c => ul.appendChild(c));
}

function creatCom(coment) {
    let li = document.createElement('li');
    li.textContent = coment.text;
    li.id = coment.id
    return li
}

attachEvents();