import './StatsComparisonEvalPage.css';

import StatsAndTargetForm from 'components/StatsAndTargetForm/StatsAndTargetForm';

function StatsComparisonEvalPage() {
    const onSubmit = (formValues) => {
        console.log(formValues);
    };

    return (
        <>
            <StatsAndTargetForm onSuccessfulSubmitCallback={onSubmit} />
        </>
    );
}

export default StatsComparisonEvalPage;