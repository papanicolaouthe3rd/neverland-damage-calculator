import './StatsComparisonEvalPage.css';

import StatsAndTargetForm from 'components/StatsAndTargetForm/StatsAndTargetForm';

import React, { useState } from 'react';

import { ThreeDots } from 'react-loader-spinner';

import StatScoreDisplay from 'components/StatScoreDisplay/StatScoreDisplay';

import axiosInstance from 'utils/axiosConfig';


function StatsComparisonEvalPage() {
    const [ pageState, setPageState ] = useState("form");
    const [ statScores, setStatScores ] = useState(null);

    const onSubmit = (formValues) => {
        setPageState("results");

        axiosInstance
            .post('/calculate', formValues)
            .then((response) => {
                console.log(response);
                if(response.status === 200) {
                    const data = response.data;
                    setStatScores({
                        "status": "ok",
                        "data": data
                    });
                }
                else {
                    setStatScores({
                        "status": "error",
                        "message": "Error in processing request."
                    });
                }
            })
            .catch((_) => {
                setStatScores({
                    "status": "error",
                    "message": "Malfunctioning connection to the server."
                });
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