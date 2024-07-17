import './ExplanationTooltip.css';

import { HiQuestionMarkCircle } from "react-icons/hi";

import { OverlayTrigger, Tooltip } from 'react-bootstrap';


function ExplanationTooltip({ explanation, size='1.3em' }) {
    const tooltip = (
        <Tooltip>
            {explanation}
        </Tooltip>
    );

    return (
        <OverlayTrigger placement="top" overlay={tooltip}>
            <span class="tooltip-icon"><HiQuestionMarkCircle size={size} /></span>
        </OverlayTrigger>
    );
}

export default ExplanationTooltip;