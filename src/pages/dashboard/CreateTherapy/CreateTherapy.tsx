import { IonButton, IonButtons, IonFabButton, IonFab, IonCol, IonFabList, IonContent, IonDatetime, IonToast, IonSelect, IonSelectOption, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonPopover, IonRow, IonTextarea, IonTitle, IonToolbar, IonText } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { removeQuestion, saveQuestion, getQuestion } from './TherapyServices';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import actions from '../../../actions/therapy';
import moment from 'moment'
import { add, close, chevronUp, documentText, imageOutline, save, imageSharp } from 'ionicons/icons';
import Question from '../../../components/Question';


interface question {
  id: number
  options: string[]
  image: any
  response: any | any[]
  type: string
}


const CreateTherarapy: React.FC = (props: any) => {
  let { type }: any = useParams();

  const [name, setName] = useState("");
  const [description, SetDescription] = useState("");
  const [visibility, setVisibility] = useState<any>([]);
  const [expiration, setExpiration] = useState<any>([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);


  const [questions, setQuestions] = useState<any>([]);
  const [question] = useState<question>({ id: 0, options: [], image: {}, response: null, type: "" });


  const modal = useRef<HTMLIonModalElement>(null);
  const modal2 = useRef<HTMLIonModalElement>(null);
  const modal3 = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
    modal2.current?.dismiss();
    modal3.current?.dismiss();
  }

  useEffect(() => {
    localStorage.setItem('questions','[]');
    search();
  }, []);

  const search = () => {
    let result = getQuestion();
    setQuestions(result);
  }

  const clear = () => {
    props.clear()
  }

  const remove = (id: string) => {
    removeQuestion(id);
    search();
  }

  const addText = () => {
    question.id = Math.round(Math.random() * 100000);
    
    question.image = preview
    saveQuestion(question)
    dismiss();
    search()
    question.options = []
    question.image = ""
    setPreview(null)
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  /*Send data api*/

  const onRSubmit = (e: any) => {
    e.preventDefault()

    props.store({
      name: name,
      description: description,
      visibility: Boolean(visibility),
      image: preview,
      type: type?.toLowerCase(),
      questions: JSON.stringify(questions),
      expiration: moment(expiration).format("D-M-Y")
    })
    localStorage['questions'] = '[]';

  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{ textTransform: "capitalize" }}>Crear Terapia {type}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRow className='justify-content-center' style={{ margin: "15px", }} >
          <IonCol size-sm="12" size-md="7" size="12">
            <IonRow >
              <IonCol size-sm="12" size-md="12" size="12">
                <IonItem fill="outline">
                  <IonLabel position="floating">Titulo terapia</IonLabel>
                  <IonInput value={name} onIonChange={(e: any) => setName(e.detail.value!)} required type='text' placeholder="¿Cómo se llamara la terapia?" > </IonInput>
                </IonItem>
              </IonCol>
              <IonCol size-sm="12" size-md="12" size="12">
                <IonItem fill="solid" >
                  <IonLabel position="floating">Descripción</IonLabel>
                  <IonTextarea value={description} onIonChange={(e: any) => SetDescription(e.detail.value!)} placeholder="Breve descripcion de la terapia que estas creando." > </IonTextarea>
                </IonItem>
              </IonCol>
              <IonCol size-sm="12" size-md="12" size="12">
                <IonList className='mt-4'>
                  {questions.map((question: any, index) =>
                    <IonItem key={index}>
                      <Question question={question} />
                      <IonIcon onClick={() => remove(question.id)} icon={close} slot="end"></IonIcon>
                    </IonItem>

                  )}
                </IonList>
              </IonCol>
            </IonRow>
          </IonCol>
          <IonCol size-sm="12" size-md="3" size="12">
            <IonRow >
              <IonCol size-sm="12" size-md="12" size="12">
                <IonItem fill="outline">
                  <IonLabel position="floating">Visibilidad</IonLabel>
                  <IonSelect placeholder="Seleccione Visibilidad" onIonChange={(e) => setVisibility(e.detail.value)}>
                    <IonSelectOption value="true">Pública</IonSelectOption>
                    <IonSelectOption value="false">Privada</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
              <IonCol size-sm="12" size-md="12" size="12">
                <IonDatetime onIonChange={(event: any) => setExpiration(event.value)}></IonDatetime>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
        {props.state.statusMsg && (
          <IonToast
            isOpen={(props.state.statusMsg) ? true : false}
            duration={4000}
            keyboardClose={true}
            onDidDismiss={() => clear()}
            buttons={[
              {
                text: 'Cerrar',
                role: 'cancel',
                handler: () => {
                  clear()
                }
              }
            ]}
            message={props.state.statusMsg}
            position="bottom"
          />
        )}
        { }

        <IonFab slot="fixed" vertical="bottom" horizontal="center" >
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton onClick={onRSubmit} id="open-button-guardar">
              <IonIcon icon={save}></IonIcon>
            </IonFabButton>
            <IonFabButton id="open-text">
              <IonIcon icon={documentText}></IonIcon>
            </IonFabButton>
            <IonFabButton id="open-image">
              <IonIcon icon={imageOutline}></IonIcon>
            </IonFabButton>
            <IonFabButton id="open-image2">
              <IonIcon icon={imageSharp}></IonIcon>
            </IonFabButton>
            <IonFabButton id="open-button-check">
              <IonIcon icon={chevronUp}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>


      <IonModal className='modal-texto' id="example-modal" ref={modal2} trigger="open-image" >
        <IonHeader >
          <IonToolbar className='px-2'>
            <IonButtons slot='start'>
              <IonButton onClick={addText} >Guardar</IonButton>
            </IonButtons>

            <IonButtons slot='end'>
              <IonButton onClick={dismiss} >Cancelar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <input type="file" onChange={handleFileChange}></input>
          <IonItem lines="none" className='mt-3' >
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{ width: '200px', marginTop: 16 }}
              />
            )}
          </IonItem>
          <IonItem className='mt-3' fill='outline'>
            <IonLabel position="floating">Ingrese opción 1</IonLabel>
            <IonInput onIonChange={(e: any) => question.options[0] = e.detail.value} />
          </IonItem>
          <IonItem className='mt-3' fill='outline'>
            <IonLabel position="floating">Ingrese opción 2</IonLabel>
            <IonInput onIonChange={(e: any) => question.options[1] = e.detail.value} />
          </IonItem>
          <IonItem className='mt-3' fill='outline'>
            <IonLabel position="floating">Tipo</IonLabel>
            <IonSelect placeholder="Seleccionar tipo" onIonChange={(e) => question.type = e.detail.value}>
              <IonSelectOption value="multiple">Múltiple</IonSelectOption>
              <IonSelectOption value="single">Unica</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonContent>
      </IonModal>

      <IonModal className='modal-texto' id="example-modal" ref={modal3} trigger="open-image2" >
        <IonHeader >
          <IonToolbar className='px-2'>
            <IonButtons slot='start'>
              <IonButton onClick={addText} >Guardar</IonButton>
            </IonButtons>

            <IonButtons slot='end'>
              <IonButton onClick={dismiss} >Cancelar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <input type="file" onChange={handleFileChange}></input>
          <IonItem lines="none" className='mt-3' >
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{ width: '200px', marginTop: 16 }}
              />
            )}
          </IonItem>
          <IonItem className='mt-3' fill='outline'>
            <IonLabel position="floating">Ingrese opción 1</IonLabel>
            <IonInput onIonChange={(e: any) => question.options[0] = e.detail.value} />
          </IonItem>
          <IonItem className='mt-3' fill='outline'>
            <IonLabel position="floating">Ingrese opción 2</IonLabel>
            <IonInput onIonChange={(e: any) => question.options[1] = e.detail.value} />
          </IonItem>
          <IonItem className='mt-3' fill='outline'>
            <IonLabel position="floating">Ingrese opción 3</IonLabel>
            <IonInput onIonChange={(e: any) => question.options[2] = e.detail.value} />
          </IonItem>
          <IonItem className='mt-3' fill='outline'>
            <IonLabel position="floating">Tipo</IonLabel>
            <IonSelect placeholder="Seleccionar tipo" onIonChange={(e) => question.type = e.detail.value}>
              <IonSelectOption value="multiple">Múltiple</IonSelectOption>
              <IonSelectOption value="single">Unica</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonContent>
      </IonModal>

      <IonModal className='modal-texto' ref={modal} trigger="open-text" >
        <IonHeader >
          <IonToolbar className='px-2'>
            <IonButtons slot='start'>
              <IonButton onClick={addText} >Guardar</IonButton>
            </IonButtons>

            <IonButtons slot='end'>
              <IonButton onClick={dismiss} >Cancelar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonItem fill="solid">
            <IonLabel position="floating">Ingrese el texto</IonLabel>
            <IonTextarea onIonChange={(e: any) => { question.options[0] = e.detail.value; question.type = "text" }}  ></IonTextarea>
          </IonItem>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

const mapStateToProps = (state: any) => {
  return { state: state.therapy }
}


export default connect(mapStateToProps, actions)(CreateTherarapy);


