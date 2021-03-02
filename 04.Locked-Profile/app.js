function lockedProfile() {
    const showBtn = document.querySelector('button');
    const prof = document.getElementById('user1HiddenFields');

    let radio = showBtn.parentNode;
    let lock = radio.querySelector('input');

    showBtn.addEventListener('click', () => {
        if (showBtn.textContent === 'Show more') {
            loadProfile(lock, prof, showBtn);
        } else if (showBtn.textContent === 'Hide it') {
            hideProfile(lock, prof, showBtn);

        }

    });
}

async function loadProfile(lock, prof, showBtn) {
    const toShow = Array.from(document.querySelectorAll('div>input'));
    let [userName, mail, ages] = toShow.slice(2);
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const respons = await fetch(url);
    const data = await respons.json();
    let isLocked = lock.checked;

    if (!isLocked) {
        prof.style.display = 'block';
        let [profil, date] = Object.entries(data);
        userName.value = profil[1].username;
        mail.value = profil[1].email;
        ages.value = profil[1].age;
        showBtn.textContent = 'Hide it'
    } else {
        alert('Profile is locked!');
    }

}

function hideProfile(lock, prof,showBtn) {

    let isLocked = lock.checked;
    if (!isLocked) {
        prof.style.display = '';
        showBtn.textContent = 'Show more';
    } else {
        alert('Profile is locked!');
    }
}