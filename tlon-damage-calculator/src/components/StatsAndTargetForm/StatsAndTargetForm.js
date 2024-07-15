import './StatsAndTargetForm.css';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import React from 'react';
// import Tooltip from 'react-bootstrap/Tooltip';

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
    "save_form_vals": false
};

const attributeFormFields = [
    [
        { label: "ATK", type: "number", name: "attack" },
        { label: "ATK Amplifier", type: "number", append: "%", name: "attack_amplifier" }
    ],
    [
        { label: "Base CRIT", type: "number", name: "crit" },
        { label: "Additional CRIT Rate", type: "number", append: "%", name: "crit_rate" },
        { label: "Crit DMG +", type: "number", append: "%", name: "crit_dmg" }
    ],
    [
        { label: "Break Rate", type: "number", append: "%", name: "break_rate" }
    ],
    [
        { label: "DMG increase", type: "number", append: "%", name: "dmg_increase" },
        { label: "Damage to adventurers increased", type: "number", append: "%", name: "pvp_dmg_increase" }
    ],
    [
        { label: "Pierce Rate", type: "number", append: "%", name: "pierce_rate" }
    ]
];

function getStoredFormValues() {
    const formData = JSON.parse(localStorage.getItem("storedAttributeFormData")) || defaultFormValues;
    for (const key of Object.keys(defaultFormValues)) {
        if (formData[key] === undefined) {
            formData[key] = defaultFormValues[key];
        }
    }
    for (const key of Object.keys(formData)) {
        if (defaultFormValues[key] === undefined) {
            delete formData[key];
        }
    }
    return formData;
}

function storeFormValues(formData) {
    localStorage.setItem("storedAttributeFormData", JSON.stringify(formData));
}

function clearStoredFormValues() {
    localStorage.removeItem("storedAttributeFormData");
}

function processFormValues(formData) {
    const processedData = {...formData};
    delete processedData['save_form_vals'];
    for (const key of ['attack', 'crit']) {
        processedData[key] = parseInt(processedData[key]);
    }
    for (const key of ['attack_amplifier', 'crit_rate', 'crit_dmg', 
            'break_rate', 'dmg_increase', 'pvp_dmg_increase', 'pierce_rate']) {
        processedData[key] = parseFloat(processedData[key]) / 100;
    }
    return processedData;
}

function StatsAndTargetForm() {
    const [ formState, setFormState ] = React.useState(getStoredFormValues());

    function handleSubmit(event) {
        event.preventDefault();
        if (formState["save_form_vals"]) {
            storeFormValues(formState);
        }
        else {
            clearStoredFormValues();
        }

    }

    function updateEntrySetterFactory(key, checkbox=false) {
        return e => {
            const newValue = checkbox ? e.target.checked : e.target.value;
            setFormState({
                ...formState,
                [key]: newValue
            });
        }
    }

    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="target-player-section">
                    <Form.Label>Target player</Form.Label>
                    <Form.Control as="select" 
                            value={formState["target_player"]} 
                            onChange={updateEntrySetterFactory("target_player")}>
                        <option value="shionne">Shionne EU34</option>
                        <option value="2high4you">2High4You EU52</option>
                    </Form.Control>
                </Form.Group>

                <div className="section-heading">Your attributes</div>

                { attributeFormFields.map((fieldRow) => (
                    <Row className="formFieldsRow">
                        { fieldRow.map((field) => (
                            <Col>
                                <Form.Group>
                                    <Form.Label>{field.label}</Form.Label>
                                    <InputGroup>
                                        { field.prepend && <InputGroup.Text >{field.prepend}</InputGroup.Text>}
                                        <Form.Control type={field.type} 
                                            value={formState[field.name]} 
                                            onChange={updateEntrySetterFactory(field.name)}/>
                                        { field.append && <InputGroup.Text >{field.append}</InputGroup.Text>}
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        ))}
                    </Row>
                ))}
                <Row className="formFieldsRow">
                    <Col>
                        <Form.Group>
                            <Form.Check type="checkbox" label="Save form values" 
                                checked={formState["save_form_vals"]} 
                                onChange={updateEntrySetterFactory("save_form_vals", true)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="formFieldsRow">
                    <Col>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Col>
                </Row>
                
            </Form>
        </div>  
    );
}

export default StatsAndTargetForm;