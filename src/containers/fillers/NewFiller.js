import React, { useRef, useState } from "react";
import { FormGroup, FormControl, Tabs, Tab } from "react-bootstrap";
import { API } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";
import LoaderButton from "../../components/LoaderButton";
import "../../containers/NewNote.css";

export default function NewFiller(props) {
  const file = useRef(null);
  const [goal, setGoal] = useState("");
  const [conflictField, setConflictField] = useState("");
  const [disaster, setDisaster] = useState("");
  const [dilemma, setDilemma] = useState("");
  const [decision, setDecision] = useState("");
  const [actionField, setActionField] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return goal.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const attachment = file.current
        ? await s3Upload(file.current)
        : null;
  
      await createFiller(
        { 
          goal,
          conflictField,
          disaster,
          dilemma,
          decision,
          actionField,
          attachment 
        });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createFiller(filler) {
    return API.post("fillers", "/fillers", {
      body: filler
    });
  }

  return (
    <div className="NewNote">
      <h2>The Filler Scene</h2>
      <form onSubmit={handleSubmit}>
        <Tabs defaultActiveKey={1} id="uncontrolled-tab">
          <Tab eventKey={1} title="1. The Goal">
            <FormGroup controlId="goal">
              <FormControl
                value={goal}
                componentClass="textarea"
                onChange={e => setGoal(e.target.value)}
              />
            </FormGroup>
          </Tab>
          <Tab eventKey={2} title="2. The Conflict">
            <FormGroup controlId="conflictField">
              <FormControl
                value={conflictField}
                componentClass="textarea"
                onChange={e => setConflictField(e.target.value)}
              />
            </FormGroup>
          </Tab>
          <Tab eventKey={3} title="3. The Disaster">
            <FormGroup controlId="disaster">
              <FormControl
                value={disaster}
                componentClass="textarea"
                onChange={e => setDisaster(e.target.value)}
              />
            </FormGroup>
          </Tab>
          <Tab eventKey={4} title="4. The Dilemma">
            <FormGroup controlId="dilemma">
              <FormControl
                value={dilemma}
                componentClass="textarea"
                onChange={e => setDilemma(e.target.value)}
              />
            </FormGroup>
          </Tab>
          <Tab eventKey={5} title="5. The Decision">
            <FormGroup controlId="decision">
              <FormControl
                value={decision}
                componentClass="textarea"
                onChange={e => setDecision(e.target.value)}
              />
            </FormGroup>
          </Tab>
          <Tab eventKey={6} title="6. The Action">
            <FormGroup controlId="actionField">
              <FormControl
                value={actionField}
                componentClass="textarea"
                onChange={e => setActionField(e.target.value)}
              />
            </FormGroup>
          </Tab>
        </Tabs>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        > 
          Create
        </LoaderButton>
      </form>
    </div>
  );
}