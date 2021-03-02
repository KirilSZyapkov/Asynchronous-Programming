function solve() {
    const outPut = document.querySelector('#info span');
    const depBtn = document.getElementById('depart');
    const arrBtn = document.getElementById('arrive');

    let stop = {
        next: 'depot'
    }

    async function depart() {
        const url = 'http://localhost:3030/jsonstore/bus/schedule/' + stop.next;
        const respons = await fetch(url);
        const data = await respons.json();
        stop = data;

        outPut.textContent = `Next stop ${stop.name}`;
        depBtn.disabled = true;
        arrBtn.disabled = false;
    }

    function arrive() {
        depBtn.disabled = false;
        arrBtn.disabled = true;
        outPut.textContent = `Arriving at ${stop.name}`
    }

    return {
        depart,
        arrive
    };
}

let result = solve();