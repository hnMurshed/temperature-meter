const loadData = () => {
    const cityName = document.getElementById('search-field').value;
    const API_KEY = '990d57c164a90233157c8043fd767d7a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    console.log(url);

    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data))
}

const setInnerText = (id, data) => {
    document.getElementById(id).innerText = data;
}

const controlDisplay = (id, style) => {
    document.getElementById(id).style.display = style;
}

const displayData = data => {
    console.log(data);
    if (data.cod === '404') {
        controlDisplay('not-found-field', 'block');
        controlDisplay('temp-field', 'none');

        setInnerText('page-not-found-num', data.cod);
        setInnerText('city-name-not-found', data.message);
    }
    else {
        controlDisplay('temp-field', 'block');
        controlDisplay('not-found-field', 'none');

        setInnerText('city-name', data.name);
        setInnerText('temperature', data.main.temp);
        setInnerText('condition', data.weather[0].main);
        const iconImg = document.getElementById('icon-img');
        iconImg.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

        // clear search field
        document.getElementById('search-field').value = '';
    }
}