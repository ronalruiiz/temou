import React, { useState } from 'react';
import { updateQuestion } from '../pages/dashboard/CreateTherapy/TherapyServices';
import { IonText, IonRadioGroup, IonRadio, IonLabel, IonItem, IonCheckbox, IonCol, IonRow  } from '@ionic/react';


const Form = (props) => {
    const handleOptionChange = (e) => {
        let question =  props.question
        question.response = e.target.value
        updateQuestion(props.question.id,props.question)
    };

    const handleCheckboxChange = (index: any,value) => {
        let question =  props.question
        if(!Array.isArray(question.response)){
            question.response = []
        }
        
        question.response[index] = value
        updateQuestion(props.question.id,question)
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
                <IonRadioGroup value={props.question.response} onIonChange={handleOptionChange}>
                    {props.question.options.map((option, index) => (
                        <IonItem lines="none" key={index}>
                            <IonRadio value={index} />
                            <IonLabel>{'\u00A0'}{option}</IonLabel>
                        </IonItem>
                    ))}
                </IonRadioGroup>
            ) : (
                <>
                    {props.question.options.map((option, index) => (
                        <IonItem lines="none" key={index}>
                            <IonCheckbox onIonChange={(e: any) => handleCheckboxChange(index,e.target.value)}></IonCheckbox>
                            <IonLabel>{'\u00A0'}{option}</IonLabel>
                        </IonItem>
                    ))}
                </>
            )}
            </IonCol>
        </IonRow>
    );
};

export default Form;
