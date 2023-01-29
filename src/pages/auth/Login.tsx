import {
    IonContent,
    IonPage,
    IonToast,
    IonCardContent,
    IonLoading,
    IonCol,
    IonRow,
    IonGrid,
    IonCard,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonIcon,
} from '@ionic/react';
import React, { useState } from "react";
import actions from '../../actions/auth';
import { connect } from 'react-redux';
import "../../assets/scss/custom/pages/login.scss"
import { logInSharp, personAddSharp } from 'ionicons/icons';


const Login: React.FC = (props: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [segment, setSegment] = useState("login");

    /*Register*/
    const [rName, setRName] = useState("");
    const [rEmail, setREmail] = useState("");
    const [rPassword, setRPassword] = useState("");
    const [rPasswordConfirm, setRPasswordConfirm] = useState("");


    const clear = () => {
        props.logout()
    }
    

    /*Login*/
    const onSubmit = async (e) => {
        e.preventDefault()
        props.login({ email, password }, props.history)
    }

    /*Register*/
    const onRSubmit = (e) => {
        e.preventDefault()
        props.register({
            name: rName,
            email: rEmail,
            password_confirmation: rPasswordConfirm,
            password: rPassword
        }, props.history)
    }



    return (
        <IonPage>
            <IonContent >
                <IonGrid style={{ height: "100%" }}>
                    <IonRow style={{ height: "100%" }} className="ion-align-items-center ion-justify-content-center">
                        <IonCol className="ion-align-self-center ion-text-center" sizeXl="4" sizeXs="12" sizeSm="auto" sizeMd="5" sizeLg="4">
                        <img width="210px" height="70px" className="mb-3" src={require('../images/img-temonet-sf.png')} alt="Foodlicious" />
                            <IonCard>
                                <IonSegment scrollable value={segment} onIonChange={(e: any) => setSegment(e.detail.value)}>
                                    <IonSegmentButton value="login">
                                        <IonIcon icon={logInSharp} />
                                    </IonSegmentButton>
                                    <IonSegmentButton value="register">
                                        <IonIcon icon={personAddSharp} />
                                    </IonSegmentButton>
                                </IonSegment>

                                {segment == "login" && (
                                    <IonCardContent>

                                        <form onSubmit={onSubmit}>
                                            <IonItem className="mt-2 mx-3" color="transparent">
                                                <IonLabel position="floating">Email</IonLabel>
                                                <IonInput value={email} type="email" onIonChange={(e: any) => setEmail(e.detail.value!)} required />
                                            </IonItem>
                                            <IonItem className="mt-2 mx-3" color="transparent">
                                                <IonLabel position="floating">Password</IonLabel>
                                                <IonInput value={password} type="password" onIonChange={(e: any) => setPassword(e.detail.value!)} required />
                                            </IonItem>
                                            {/* <div className="ion-text-right text-muted my-3 mr-2">
                                                <span>
                                                    <Link
                                                        className="text-primary"
                                                        to="/auth/recover"
                                                    >
                                                        ¿Se te olvidó tu contraseña?
                                                    </Link>
                                                </span>
                                            </div> */}
                                            <IonButton className="mx-3 mt-4" shape="round" expand="block" type="submit" color="primary">
                                                Inicia sesión
                                            </IonButton>

                                            <div className="text-center text-muted my-4">
                                                <span>

                                                    ¿No tienes una cuenta?{'\u00A0'}
                                                    <span
                                                        className="text-primary ml-2"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => setSegment('register')}
                                                    >
                                                    Regístrate
                                                    </span>
                                                </span>
                                            </div>
                                        </form>

                                    </IonCardContent>
                                )}
                                {segment == "register" && (
                                    <IonCardContent>
                                        <form onSubmit={onRSubmit}  >
                                            <IonItem className="mt-2 mx-3" color="transparent">
												<IonLabel position="floating">Nombre</IonLabel>
												<IonInput value={rName} type="text" onIonChange={(e:any) => setRName(e.detail.value!)} required/>
											</IonItem>
                                            <IonItem className="mt-2 mx-3" color="transparent">
												<IonLabel position="floating">Email</IonLabel>
												<IonInput value={rEmail} type="email" onIonChange={(e:any) => setREmail(e.detail.value!)} required/>
											</IonItem>
                                            <IonItem className="mt-2 mx-3" color="transparent">
												<IonLabel position="floating">Password</IonLabel>
												<IonInput value={rPassword} type="password" onIonChange={(e:any) => setRPassword(e.detail.value!)} required/>
											</IonItem>
                                            <IonItem className="mt-2 mb-4 mx-3" color="transparent">
												<IonLabel position="floating">Password Confirmation</IonLabel>
												<IonInput value={rPasswordConfirm} type="password" onIonChange={(e:any) => setRPasswordConfirm(e.detail.value!)} required/>
											</IonItem>
                                            <IonButton className="mx-3" shape="round" expand="block" type="submit" color="primary">
												Regístrate
											</IonButton>

											<div className="text-center text-muted my-4">
											<span>

													¿Ya tienes una cuenta?
														<span
															className="text-primary ml-2"
															style={{cursor:"pointer"}}
															onClick={()=>setSegment('login')}
														>
													{'\u00A0'}Iniciar sesión
														</span>
											</span>
											</div>
                                        </form>
                                    </IonCardContent>
                                )}
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {props.state.statusMsg && (
					<IonToast
						isOpen={(props.state.statusMsg)?true:false}
						duration={4000}
						onDidDismiss={() => clear()}
						keyboardClose={true}
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
				{}
				<IonLoading
					isOpen={props.state.request}
					message={'Please wait...'}
				/>
            </IonContent>
        </IonPage>
    )
}

const mapStateToProps = (state: any) => {
    return { state: state.auth }
}

export default connect(mapStateToProps, actions)(Login);