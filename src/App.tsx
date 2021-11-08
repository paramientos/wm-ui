import React from 'react';
import './App.css';
import './Components/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row} from "react-bootstrap";
import SearchForm from "./Components/SearchForm";


function App() {
  return (
      <>
        <Container>
          <Row>
            <SearchForm/>
          </Row>

        </Container>
      </>
  );
}

export default App;
