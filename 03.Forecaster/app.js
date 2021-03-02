function attachEvents() {
    const input = document.getElementById('location');
    const getWeatherBtn = document.getElementById('submit');
    const forcast = document.getElementById('forecast');
    const curent = document.getElementById('current');
    const upcoming = document.getElementById('upcoming');

    getWeatherBtn.addEventListener('click', find);

    const icon = {
        Sunny: '☀',
        'Partly sunny': '⛅',
        Overcast: '☁',
        Rain: '☔',
    }

    async function find() {
        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        const respons = await fetch(url);
        const data = await respons.json();
        if (input.value !== '') {
            let isCorrect = true;
            data.forEach(l => {
                if (l.name.toLowerCase() === input.value.toLowerCase()) {
                    getWeather(l.code);
                    getForecast(l.code);
                    isCorrect = false;
                }
            })
            if (isCorrect) {
                alert('Enter correct city name');
            }
        } else {
            alert('Enter a city name!');
        }
        input.value = '';
    }

    async function getWeather(town) {
        const url = 'http://localhost:3030/jsonstore/forecaster/today/' + town;
        const respons = await fetch(url);
        const data = await respons.json();
        curent.innerHTML = '';

        forcast.style.display = 'block';
        let city = data.name;
        let info = data.forecast;
        let label = e('div', {className: 'label'}, 'Current condition');
        const result =
            e('div', {className: 'forecast'},
                e('span', {className: 'condition symbol'}, `${icon[info.condition]}`),
                e('span', {className: 'condition'},
                    e('span', {className: 'forecast-data'}, city),
                    e('span', {className: 'forecast-data'}, `${info.low}°/${info.high}°`),
                    e('span', {className: 'forecast-data'}, info.condition))
            );
        curent.appendChild(label);
        curent.appendChild(result);
    }

    async function getForecast(town) {
        const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + town;
        const respons = await fetch(url);
        const data = await respons.json();
        upcoming.innerHTML = '';
        let label = e('div', {className: 'label'}, 'Three-day forecast');
        let forecastInfo = e('div', {className: 'forecast-info'});
        upcoming.appendChild(label);
        upcoming.appendChild(forecastInfo);

        let upcom = data.forecast;
        upcom.forEach(c => {
            const result = e('span', {className: 'upcoming'},
                e('span', {className: 'symbol'}, icon[c.condition]),
                e('span', {className: 'forecast-data'}, `${c.low}°/${c.high}°`),
                e('span', {className: 'forecast-data'}, c.condition));
            upcoming.appendChild(result);
        })
    }
}

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

attachEvents();