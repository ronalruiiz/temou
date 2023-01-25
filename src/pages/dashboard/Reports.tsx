import { IonAvatar, IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { download, save, search, close} from 'ionicons/icons';
import { useRef } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import LineChart from '../../charts/LineaChart';
import './../../assets/scss/custom/pages/reports.scss'
import BarCharts from '../../charts/BarCharts';
import RadarCharts from '../../charts/RadarCharts';
import LineDos from '../../charts/LineDos';


const ReportesdeResultado: React.FC = () => {



  const { name } = useParams<{ name: string; }>();

  const modal = useRef<HTMLIonModalElement>(null);
  function dismiss() {
    modal.current?.dismiss();}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonItem>
          <IonTitle>Reportes de Resultados          
          </IonTitle>
          <IonItem>
        <IonAvatar slot="start">
          <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
        </IonAvatar>
        <IonLabel>Item Avatar</IonLabel>
      </IonItem>
          </IonItem>
          
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
     
      
        <IonCard>
          <IonItem>
            <input className='form-control' placeholder="Buscar" ></input><button className="btn btn-primary"> <IonIcon slot='icon-only' icon={search} /></button>
         
            <button color='primary' className="btn btn-primary"  slot='end'><IonIcon icon={download} /> Generar Reporte</button>
          </IonItem>
          <IonItem></IonItem>
          </IonCard>
          <IonCard>
          <LineChart />
          </IonCard>
          
          <IonCard>
            <IonList>
              <IonItem>
                <IonAvatar>
                <img alt="Silhouette of a person's head" src="https://media.istockphoto.com/id/1193994027/es/foto/lindo-ni%C3%B1o-al-aire-libre.jpg?s=612x612&w=0&k=20&c=b0CsffKlmhc_n5GDRRG2x_C9xfM8tjZXCVgqjme8lSo=" />
                </IonAvatar>
                <IonToolbar>
                  <IonLabel className='nombres-estudiantes'>Freddy Tene Torres</IonLabel>
                  <IonButton color="tertiary" slot='end'>
                  Informacion
                  </IonButton>
                  <IonButton color="danger" slot='end'>
                    Dashboard
                  </IonButton>
                  <IonButton id='open-dashboard' color="success" slot='end'>
                    Dashboard
                  </IonButton>
                </IonToolbar>
            </IonItem>
         


            <IonItem>
                <IonAvatar>
                <img alt="Silhouette of a person's head" src="data:image/jpeg;base64,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" />
                </IonAvatar>
                <IonToolbar>
                  <IonLabel className='nombres-estudiantes'>Freddy Tene Torres</IonLabel>
                  <IonButton color="tertiary" slot='end'>
                    Informacion
                  </IonButton>
                  <IonButton color="danger" slot='end'>
                    Dashboard
                  </IonButton>
                  <IonButton color="success" slot='end'>
                    Dashboard
                  </IonButton>
                </IonToolbar>
            </IonItem>
            <IonItem>
                <IonAvatar>
                <img alt="Silhouette of a person's head" src="https://media.istockphoto.com/id/991204888/es/foto/sonriente-a-joven-hispana-posando-y-mirando-a-la-c%C3%A1mara-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=Vqs21WlGVGqiAR6lzbZE2mjXlsuBRYjrjUzx58uMpeA=" />
                </IonAvatar>
                <IonToolbar>
                  <IonLabel className='nombres-estudiantes'>Freddy Tene Torres</IonLabel>
                  <IonButton color="tertiary" slot='end'>
                  Informacion
                  </IonButton>
                  <IonButton color="danger" slot='end'>
                    Dashboard
                  </IonButton>
                  <IonButton color="success" slot='end'>
                    Dashboard
                  </IonButton>
                </IonToolbar>
            </IonItem>
            <IonItem>
                <IonAvatar>
                <img alt="Silhouette of a person's head" src="https://www.worldvision.cl/hs-fs/hubfs/Chile/DSC_1319%20(1)-min.jpg?width=900&name=DSC_1319%20(1)-min.jpg" />
                </IonAvatar>
                <IonToolbar>
                  <IonLabel className='nombres-estudiantes'>Freddy Tene Torres</IonLabel>
                  <IonButton color="tertiary" slot='end'>
                  Informacion
                  </IonButton>
                  <IonButton color="danger" slot='end'>
                    Dashboard
                  </IonButton>
                  <IonButton color="success" slot='end'>
                    Dashboard
                  </IonButton>
                </IonToolbar>
            </IonItem>
        </IonList>
        </IonCard>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
        
        
        <IonModal  className='dashboard-modal'  id="example-modal" ref={modal} trigger="open-dashboard" > 
          
        
           
              <IonToolbar>
            <IonItem>
            <IonButton onClick={dismiss} fill='clear' slot='end'><IonIcon slot='icon-only' icon={close}></IonIcon></IonButton>
            <IonAvatar>
                <img alt="Silhouette of a person's head" src="https://media.istockphoto.com/id/1193994027/es/foto/lindo-ni%C3%B1o-al-aire-libre.jpg?s=612x612&w=0&k=20&c=b0CsffKlmhc_n5GDRRG2x_C9xfM8tjZXCVgqjme8lSo=" />
                </IonAvatar>
                </IonItem>
            </IonToolbar>

           <IonCard>
              <IonItem>
                <LineDos/>
                <BarCharts/>
                <RadarCharts/>
                </IonItem>
                </IonCard>
            
            
              <IonList>
                <IonGrid>
                  
                <IonLabel>Fecha </IonLabel>
                <IonItem>
                  <IonLabel>Terapia 1</IonLabel>
                  
                  <IonButton color="danger" slot='end'>50% completada</IonButton>
                  
                </IonItem>
               
                
            
              
                
                <IonLabel>Fecha </IonLabel>
                <IonItem>
                  <IonLabel>Terapia 2</IonLabel>
                  <IonButton color="success" slot='end'>90% completada</IonButton>
                </IonItem>
                
              
              
                
                <IonLabel>Fecha</IonLabel>
                <IonItem>
                  <IonLabel>Terapia 3</IonLabel>
                  <IonButton color="warning" slot='end'>70% completada</IonButton>
                </IonItem>
                
                </IonGrid>
                </IonList>
                
            
          </IonModal>

      </IonContent>

    </IonPage>
  );
};

export default ReportesdeResultado;
