async function getInfo() {
    const input = document.getElementById('stopId');
    const stationName = document.getElementById('stopName');
    const stopsList = document.getElementById('buses');

    const url = 'http://localhost:3030/jsonstore/bus/businfo/' + input.value;

    try {
        const respons = await fetch(url);
        const data = await respons.json();

        stationName.textContent = data.name;
        stopsList.innerHTML = '';
        Object.entries(data.buses).forEach(([station,time]) =>{
            let li = document.createElement('li');
            li.textContent = `Bus ${station} arrives in ${time}`
           stopsList.appendChild(li);
        })

    } catch (error) {
        stopsList.innerHTML = '';
        stationName.textContent = 'Error';
    }

}