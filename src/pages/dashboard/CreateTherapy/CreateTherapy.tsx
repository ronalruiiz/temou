import { IonButton, IonButtons, IonFabButton, IonFab, IonCol, IonFabList, IonContent, IonDatetime, IonToast, IonSelect, IonSelectOption, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonPopover, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { removeCustomer, saveCustomer, searchCustomers } from './TerapiaSuperficialApi';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import actions from '../../../actions/therapy';
import moment from 'moment'
import { add, close, chevronUp, documentText, imageOutline, save } from 'ionicons/icons';


const CreateTherarapy: React.FC = (props: any) => {
  let { type }: any = useParams();

  const [name, setName] = useState("");
  const [description, SetDescription] = useState("");

  const [clientes, setClientes] = useState<any>([]);
  const [customer, setCustomer] = useState<any>({});
  const [expiration, setExpiration] = useState<any>([]);
  const [visibility, setVisibility] = useState<any>([]);

  const modal = useRef<HTMLIonModalElement>(null);
  const modal2 = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
    modal2.current?.dismiss();
  }

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    let result = searchCustomers();
    setClientes(result);
  }

  const clear = () => {
    props.clear()
  }

  const remove = (id: string) => {
    removeCustomer(id);
    search();
  }

  const addText = () => {
    customer.id = Math.round(Math.random() * 100000);
    saveCustomer(customer)
    dismiss();
    search()
  }

  const onRSubmit = (e: any) => {
    e.preventDefault()

    props.store({
      name: name,
      description: description,
      visibility: Boolean(visibility),
      type: type?.toLowerCase(),
      expiration: moment(expiration).format("D-M-Y")
    })

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
                  {clientes.map((cliente: any) =>
                    <IonItem>
                      <IonLabel>{cliente.text}</IonLabel>
                      <IonIcon onClick={() => remove(cliente.id)} icon={close} slot="end"></IonIcon>
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
                  <IonSelect placeholder="Select Visibilidad" onIonChange={(e) => setVisibility(e.detail.value)}>
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
            <IonFabButton id="open-custom-dialog">
              <IonIcon icon={documentText}></IonIcon>
            </IonFabButton>
            <IonFabButton id="open-button-op">
              <IonIcon icon={imageOutline}></IonIcon>
            </IonFabButton>
            <IonFabButton id="open-button-check">
              <IonIcon icon={chevronUp}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>

      <IonPopover trigger="open-button-op" reference="trigger" side="top" alignment="center" dismissOnSelect={true}>
        <IonContent  >
          <IonList>
            <IonItem button={true} id="open-options-dialog">
              Imagen + 2 Opciones
            </IonItem>
            <IonItem button={true} detail={false}>
              Imagen + 3 Opciones
            </IonItem>
          </IonList>
        </IonContent>
      </IonPopover>

      <IonModal className='modal-texto' id="example-modal" ref={modal2} trigger="open-options-dialog" >
        <IonToolbar>
          <IonButton onClick={addText} slot='end'>Guardar</IonButton>
          <IonButton onClick={dismiss} slot='end'>Cancelar</IonButton>
        </IonToolbar>
      </IonModal>

      <IonPopover trigger="open-button-check" reference="trigger" side="top" alignment="center" dismissOnSelect={true}>
        <IonContent  >
          <IonList>
            <IonItem button={true} detail={false}>
              Imagen + 2 Opciones
            </IonItem>
            <IonItem button={true} detail={false}>
              Imagen + 3 Opciones
            </IonItem>
          </IonList>
        </IonContent>
      </IonPopover>

      <IonModal className='modal-texto' ref={modal} trigger="open-custom-dialog" >
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
          <IonItem >
            <IonLabel position="stacked">Ingrese el texto</IonLabel>
            <IonTextarea onIonChange={e => customer.text = e.detail.value}  ></IonTextarea>
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


