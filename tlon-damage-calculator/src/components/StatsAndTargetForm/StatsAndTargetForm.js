import './StatsAndTargetForm.css';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import React from 'react';
// import Tooltip from 'react-bootstrap/Tooltip';

const availablePlayers = [
    { username: "Test player 1", id: "tp1" },
    { username: "Test player 2", id: "tp2" },
];
const isSupportedPlayerId = queryId => 
    availablePlayers.some(player => player.id === queryId);

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
    "target_player": availablePlayers[0].id,
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


const labelToName = attributeFormFields.flat().reduce((acc, field) => ({
    ...acc,
    [field.name]: field.label
}), { "target_player": "Target player" });



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
    if (!isSupportedPlayerId(formData["target_player"])) {
        formData["target_player"] = defaultFormValues["target_player"];
    }
    return formData;
}

function storeFormValues(formData) {
    localStorage.setItem("storedAttributeFormData", JSON.stringify(formData));
}

function clearStoredFormValues() {
    localStorage.removeItem("storedAttributeFormData");
}

function processFormValues(formData, onErrorCallback) {
    const processedData = {...formData};
    delete processedData['save_form_vals'];
    if (!isSupportedPlayerId(processedData["target_player"])) {
        onErrorCallback("Invalid target player selected.");
        return null;
    }
    for (const key of ['attack', 'crit']) {
        try {
            if (processedData[key] === "") {
                throw new Error("Empty value");
            }
            processedData[key] = parseInt(processedData[key]);
            if (processedData[key] < 0) {
                throw new Error("Negative value");
            }
        } catch (error) {
            onErrorCallback(`${labelToName[key]} must be a positive integer.`);
            return null;
        }
    }
    for (const key of ['attack_amplifier', 'crit_rate', 'crit_dmg', 
            'break_rate', 'dmg_increase', 'pvp_dmg_increase', 'pierce_rate']) {
        try{
            if (processedData[key] === "") {
                throw new Error("Empty value");
            }
            processedData[key] = parseFloat(processedData[key]) / 100;
            if (processedData[key] < 0) {
                throw new Error("Negative value");
            }
        } catch (error) {
            onErrorCallback(`${labelToName[key]} must be a positive real number.`);
            return null;
        }
    }
    onErrorCallback(null);
    return processedData;
}

function StatsAndTargetForm({ 
        onSuccessfulSubmitCallback = _ => { throw new Error("No callback provided.") } 
    }) {
    const [ formState, setFormState ] = React.useState(getStoredFormValues());
    const [ errorMessage, setErrorMessage ] = React.useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        if (formState["save_form_vals"]) {
            storeFormValues(formState);
        }
        else {
            clearStoredFormValues();
        }
        const processedForm = processFormValues(formState, setErrorMessage);
        if (processedForm !== null) {
            onSuccessfulSubmitCallback(processedForm);
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
        <>
            { (errorMessage !== null) && 
            <Alert variant="danger" key="formDangerAlert" style={{ margin: "10px" }}>
                {errorMessage}
            </Alert>
            } 
            <div className="form-container">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="target-player-section">
                        <Form.Label>Target player</Form.Label>
                        <Form.Control as="select" 
                                value={formState["target_player"]} 
                                onChange={updateEntrySetterFactory("target_player")}>
                            { availablePlayers.map((player) => ( 
                                <option value={player.id}>{player.username}</option>
                            ))}
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
                                                onChange={updateEntrySetterFactory(field.name)}
                                                min={ field.type === "number" ? 0 : null }
                                                step={ field.type === "number" ? (
                                                    field.append === "%" ? 0.01 : 1
                                                ) : null }
                                                required
                                            />
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
        </>
    );
}

export default StatsAndTargetForm;