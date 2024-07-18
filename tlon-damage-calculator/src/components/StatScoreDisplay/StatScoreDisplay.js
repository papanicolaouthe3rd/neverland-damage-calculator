import './StatScoreDisplay.css';

import { ProgressBar } from "react-progressbar-fancy";
import { statLabelToNameMapping } from 'components/StatsAndTargetForm/StatsAndTargetForm';

function StatScoreDisplay({ scoreData }) {


    const progressBars = Object.keys(scoreData.stat_scores).map((key) => {
        return (
            <div style={{margin: '15px auto'}}>
                <ProgressBar score={scoreData.stat_scores[key]} label={statLabelToNameMapping[key]} />
            </div>
        );
    });

    return (
        <div>
            <h1>Stats optimization against {scoreData.player}</h1>

            <h2>Stat scores</h2>
            { progressBars }
        </div>
    );
}

export default StatScoreDisplay;