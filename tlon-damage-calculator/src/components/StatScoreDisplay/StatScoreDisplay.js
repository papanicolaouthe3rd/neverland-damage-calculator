import './StatScoreDisplay.css';

import { ProgressBar } from "react-progressbar-fancy";
import { statLabelToNameMapping } from 'components/StatsAndTargetForm/StatsAndTargetForm';

import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function StatScoreDisplay({ scoreData }) {

    return (
        <div>
            { scoreData.status === "error" && (
                <Alert variant="danger" key="formDangerAlert" style={{ margin: "10px" }}>
                    {scoreData.message}
                </Alert>
            )}
            { scoreData.status === "ok" && (
                <>
                    <h1>Stats optimization against {scoreData.data.player}</h1>
                    <h2>Stat scores</h2>
                    { Object.keys(scoreData.data.stat_scores).map((key) => (
                        <div style={{margin: '15px auto'}}>
                            <ProgressBar 
                                score={scoreData.data.stat_scores[key] * 100} 
                                label={statLabelToNameMapping[key]} />
                        </div>
                    ))}

                    <p>All stats are evaluated in terms of value given by a single purple IO of this stat.</p>
                    <p><Button variant="primary" onClick={(e) => window.location.reload()}>Go Back to the form</Button></p>
                </>  
            )} 
        </div>
    );
}

export default StatScoreDisplay;