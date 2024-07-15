import API_CONFIG from './api_config.js';
import { escapeHtml } from './utils.js';

document.addEventListener('DOMContentLoaded', function() {

    function getAndPreperateParameters() {
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

    const recommendationContainer = document.getElementById('recommendation-container');
    function addToRecommendationContainer(html) {
        if(recommendationContainer) {
            recommendationContainer.innerHTML += html;
        }
    }
    function createAndInsertAlert(alertText) {
        const alertHTML = `
            <div class="rest-failure-alert">
                <div class="alert alert-danger" role="alert">` + escapeHtml(alertText) + `</div>

                <a href="index.html">Go bath to the home page</a>
            </div>`;
        addToRecommendationContainer(alertHTML);
    }
    function addRecommendations(data) {
        console.log(data);
        const recommendationHTML = `
            <h1>Recommendations against player ` + escapeHtml(data['player']) + `</h1>
        `;
        addToRecommendationContainer(recommendationHTML);
    }

    const recommendationsEndPoint = `${API_CONFIG.api_url}/calculate`;

    fetch(recommendationsEndPoint, {
        method: 'POST',
        body: JSON.stringify(getAndPreperateParameters()),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error();
        }
        return response.text();
    })
    .then(data => {
        data = JSON.parse(data);
        addRecommendations(data);
    })
    .catch(err => {
        console.log(err);
        createAndInsertAlert('Issues processing the request. Please try again later.');
    });
});