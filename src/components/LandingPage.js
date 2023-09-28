import React from "react";
import logo from '../asset/living.jpg';
import { Container } from "react-bootstrap";


import SearchPage from "./SearchPage";

const LandingPage = ()=>{

    return(
        <div style={{width:'100%', backgroundImage:`url(${logo})`, backgroundRepeat: 'no-repeat', backgroundSize:'cover', height:'100vh'}}>
            <Container style={{paddingTop:'5%'}}>
            <SearchPage></SearchPage>
            </Container>
        </div>
    )
}
export default LandingPage