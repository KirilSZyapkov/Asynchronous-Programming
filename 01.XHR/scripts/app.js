function loadRepos() {
    const loadBtn = document.querySelector('button');
    const repos = document.getElementById('res');

    loadBtn.addEventListener('click', function onLoadRepos() {
        const url = 'https://api.github.com/users/testnakov/repos';
        const httpRequest = new XMLHttpRequest();
        httpRequest.addEventListener('readystatechange', function () {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                repos.textContent = httpRequest.responseText;
            }
        });
        httpRequest.open('GET', url);
        httpRequest.send();
    });

}