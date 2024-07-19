import './StatScoreDisplay.css';

import { ProgressBar } from "react-progressbar-fancy";
import { statLabelToNameMapping } from 'components/StatsAndTargetForm/StatsAndTargetForm';

import { Alert } from 'react-bootstrap';

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
                    <h1>Stats optimization against {scoreData.player}</h1>
                    <h2>Stat scores</h2>
                    { Object.keys(scoreData.stat_scores).map((key) => (
                        <div style={{margin: '15px auto'}}>
                            <ProgressBar score={scoreData.stat_scores[key]} label={statLabelToNameMapping[key]} />
                        </div>
                    ))}
                </>  
            )} 
        </div>
    );
}

export default StatScoreDisplay;