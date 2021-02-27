async function loadCommits() {
    const userName = document.getElementById('username').value;
    const repos = document.getElementById('repo').value;
    const ul = document.getElementById('commits');

    const url = `https://api.github.com/repos/${userName}/${repos}/commits`;

    ul.innerHTML = '';

    try {
        const respons = await fetch(url);
        const data = await respons.json();

        if(respons.status === 404){
            throw new Error(`Error: ${respons.status} (${respons.statusText})`);
        }
        data.forEach(r => {
            let li = document.createElement('li');
            li.textContent = `${r.commit.author.name}: ${r.commit.message}`;
            ul.appendChild(li);
        })

    } catch (error) {

        let li = document.createElement('li');
        li.textContent = error;
        ul.appendChild(li);
    }

}
