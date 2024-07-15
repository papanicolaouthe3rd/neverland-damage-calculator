document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('attribute-form');

    const defaultFormValues = {
        "attack": 100000,
        "attack_amplifier": 32,
        "crit": 10000,
        "crit_rate": 32,
        "crit_dmg": 0,
        "break_rate": 50,
        "dmg_increase": 10,
        "pvp_dmg_increase": 12,
        "pierce_rate": 50,
        "target_player": "shionne",
        "save_form_vals": "off"
    };

    let storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData === null) {
        storedFormData = defaultFormValues;
    }
    else {
        for (const key of Object.keys(defaultFormValues)) {
            if (!storedFormData.hasOwnProperty(key)) {
                storedFormData[key] = defaultFormValues[key];
            }
        }
    }
    
    // Load saved values
    const formData = storedFormData
    
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