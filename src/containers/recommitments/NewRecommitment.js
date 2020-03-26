import React, { useRef, useState } from "react";
import { FormGroup, FormControl, Tabs, Tab } from "react-bootstrap";
import { API } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import "../../containers/NewNote.css";

export default function NewRecommitment(props) {
  const file = useRef(null);
  const [goal, setGoal] = useState("");
  const [conflictField, setConflictField] = useState("");
  const [revelation, setRevelation] = useState("");
  const [praiseTheEnemy, setPraiseTheEnemy] = useState("");
  const [doOrDie, setDoOrDie] = useState("");
  const [crossThreshold, setCrossThreshold] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return goal.length > 0;
  }

  // function handleFileChange(event) {
  //   file.current = event.target.files[0];
  // }

  async function handleSubmit(event) {
    event.preventDefault();
  
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
  
    setIsLoading(true);
  
    try {
      const attachment = file.current
        ? await s3Upload(file.current)
        : null;
  
      await createRecommitment(
        { 
          goal,
          conflictField,
          revelation,
          praiseTheEnemy,
          doOrDie,
          crossThreshold,
          attachment 
        });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createRecommitment(recommitment) {
    return API.post("recommitments", "/recommitments", {
      body: recommitment
    });
  }

  return (
    <div className="NewNote">
      <h2>Your Recommitment Scene</h2>
      <form onSubmit={handleSubmit}>
        <Tabs defaultActiveKey={1} id="uncontrolled-tab">
          <Tab eventKey={1} title="1. The Goal">
            <header>The Goal</header>
            <FormGroup controlId="goal">
              <FormControl
                value={goal}
                componentClass="textarea"
                onChange={e => setGoal(e.target.value)}
              />
            </FormGroup>
          </Tab>
          <Tab eventKey={2} title="2. The Conflict">
            <header>The Conflict</header>
            <FormGroup controlId="conflictField">
              <FormControl
                value={conflictField}
                componentClass="textarea"
                onChange={e => setConflictField(e.target.value)}
              />
            </FormGroup>
          </Tab>
          <Tab eventKey={3} title="3. The Revelation">
            <header>The Revelation</header>
            <FormGroup controlId="revelation">
              <FormControl
                value={revelation}
                componentClass="textarea"
                onChange={e => setRevelation(e.target.value)}
              />
            </FormGroup>
          </Tab>
          <Tab eventKey={4} title="4. Praising The Enemy">
            <header>Praising The Enemy</header>
            <FormGroup controlId="praiseTheEnemy">
              <FormControl
                value={praiseTheEnemy}
                componentClass="textarea"
                onChange={e => setPraiseTheEnemy(e.target.value)}
              />
            </FormGroup>
          </Tab>
          <Tab eventKey={5} title="5. Do or Die">
            <header>Do or Die</header>
            <FormGroup controlId="doOrDie">
              <FormControl
                value={doOrDie}
                componentClass="textarea"
                onChange={e => setDoOrDie(e.target.value)}
              />
            </FormGroup>
          </Tab>
          <Tab eventKey={6} title="6. Crossing the Threshold">
            <header>Crossing The Threshold</header>
            <FormGroup controlId="crossThreshold">
              <FormControl
                value={crossThreshold}
                componentClass="textarea"
                onChange={e => setCrossThreshold(e.target.value)}
              />
            </FormGroup>
          </Tab>
        </Tabs>
        {/* <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup> */}
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