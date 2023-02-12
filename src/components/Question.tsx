import React, { useState } from 'react';
import { IonList, IonText, IonRadioGroup, IonRadio, IonLabel, IonItem, IonCheckbox } from '@ionic/react';

const Question = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([1]);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleCheckboxChange = (value: any) => {
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter(option => option !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };

    return (
        <React.Fragment>
            {props.question.type === 'text' ? (
                <>
                    {props.question.options.map((option, index) => (
                        <>
                            <IonText key={index}>
                                {option}
                            </IonText>
                        </>
                    ))}
                </>
            ) : props.question.type === 'single' ? (
                <IonRadioGroup value={selectedOption} onIonChange={handleOptionChange}>
                    {props.question.options.map((option, index) => (
                        <IonItem lines="none" key={index}>
                            <IonRadio value={option} />
                            <IonLabel>{'\u00A0'}{option}</IonLabel>
                        </IonItem>
                    ))}
                </IonRadioGroup>
            ) : (
                <>
                    {props.question.options.map((option, index) => (
                        <IonItem lines="none" key={index}>
                            <IonCheckbox key={index} onIonChange={(e: any) => handleCheckboxChange(e.target.value)}></IonCheckbox>
                            <IonLabel>{'\u00A0'}{option}</IonLabel>
                        </IonItem>
                    ))}
                </>
            )}
        </React.Fragment>
    );
};

export default Question;
