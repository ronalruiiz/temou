import React, { useState } from 'react';
import { IonText, IonRadioGroup, IonRadio, IonLabel, IonItem, IonCheckbox, IonCol, IonRow } from '@ionic/react';

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
        <IonRow style={{width:"100%"}}>
            {props.question.image && (
                <IonCol size-sm="12" size-md="6" size="12">
                    <IonItem lines="none" className='mt-3' >
                        
                            <img
                                src={props.question.image}
                                alt="Preview"
                                style={{ width: '220px'}}
                            />
                        
                    </IonItem>
                </IonCol>)}
                <IonCol size-sm="12" size-md="6" size="12">
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
                </IonCol>
        </IonRow>
    );
};

export default Question;
