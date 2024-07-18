import './StatsComparisonEvalPage.css';

import StatsAndTargetForm from 'components/StatsAndTargetForm/StatsAndTargetForm';

import React, { useState } from 'react';

import { ThreeDots } from 'react-loader-spinner';

import StatScoreDisplay from 'components/StatScoreDisplay/StatScoreDisplay';

function StatsComparisonEvalPage() {
    const [ pageState, setPageState ] = useState("form");
    const [ statScores, setStatScores ] = useState(null);

    // const dummyData = {
    //     player: "Test Player 1",
    //     stat_scores: {
    //         "ATK": 50,
    //         "CRIT": 50,
    //         "CRIT DMG": 20,
    //     }
    // };

    const onSubmit = (formValues) => {
        setPageState("results");
        console.log(formValues);

        
        fetch("http://localhost:7001/calculate", {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            
            console.log(data);
            setStatScores(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const renderPagePart = (param) => {
        switch(param) {
            case "form":
                return <StatsAndTargetForm onSuccessfulSubmitCallback={onSubmit} />;
            case "results":
                if (statScores) {
                    return <StatScoreDisplay scoreData={statScores} />;
                }
                else {
                    return (
                        <div class="vh-100 d-flex justify-content-center align-items-center">
                            <ThreeDots color="#666"/>
                        </div>
                    );
                };
        }
    }

    return (
        <>
            {renderPagePart(pageState)}
        </>
    );
}

export default StatsComparisonEvalPage;