document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('attribute-form');

    const defaultFormValues = {
        "atk": 100000,
        "atk-amplifier": 32,
        "crit": 10000,
        "crit-rate": 32,
        "crit-dmg": 0,
        "break-rate": 50,
        "dmg-increase": 10,
        "pvp-dmg-increase": 12,
        "pierce-rate": 50,
        "target-player": "shionne",
        "save_form_vals": "off"
    };

    // Load saved values
    const formData = JSON.parse(localStorage.getItem("formData")) || defaultFormValues;
    for (const [key, value] of Object.entries(formData)) {
        if (form.elements[key]) {
            if (form.elements[key].type === 'checkbox') {
                form.elements[key].checked = (value === "on");
            } else {
                form.elements[key].value = value;
            }
        }
    }
    
    form.addEventListener('submit', (event) => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if(data["save_form_vals"] === "on") {
            const serializedData = JSON.stringify(data);
            localStorage.setItem("formData", serializedData);
        } else {
            localStorage.removeItem("formData");
        }
    });
});