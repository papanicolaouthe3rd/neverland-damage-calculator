const API_CONFIG = {
    api_url: 'http://localhost:7001'
}


function getAndPreperateParameters() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams.entries());
    // Preprocess parameters
    delete params['save_form_vals'];
    for (const key of ['attack', 'crit']) {
        params[key] = parseInt(params[key]);
    }
    for (const key of ['attack_amplifier', 'crit_rate', 'crit_dmg', 
            'break_rate', 'dmg_increase', 'pvp_dmg_increase', 'pierce_rate']) {
        params[key] = parseFloat(params[key]) / 100;
    }
    return params;
}

const recommendationsEndPoint = `${API_CONFIG.api_url}/calculate`;

fetch(recommendationsEndPoint, {
    method: 'POST',
    body: JSON.stringify(getAndPreperateParameters()),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(console.log).catch(console.log);