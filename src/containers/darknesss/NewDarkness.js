import React, { useRef, useState } from "react";
import { FormGroup, FormControl, Tabs, Tab } from "react-bootstrap";
import { API } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";
import LoaderButton from "../../components/LoaderButton";
// import config from "../../config";
import "../../containers/NewNote.css";

export default function NewDarkness(props) {
  const file = useRef(null);
  const [goal, setGoal] = useState("");
  const [conflictField, setConflictField] = useState("");
  const [ultimateDisaster, setUltimateDisaster] = useState("");
  const [darkestMoment, setDarkestMoment] = useState("");
  const [oneChance, setOneChance] = useState("");
  const [doAndDie, setDoAndDie] = useState("");
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
  
      await createDarkness(
        { 
          goal,
          conflictField,
          ultimateDisaster,
          darkestMoment,
          oneChance,
          doAndDie,
          attachment 
        });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createDarkness(darkness) {
    return API.post("darknesss", "/darknesss", {
      body: darkness
    });
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <h2>The Darkness Scene</h2>
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
          <Tab eventKey={3} title="3. The Ultimate Disaster">
            <FormGroup controlId="ultimateDisaster">
              <FormControl
                value={ultimateDisaster}
                componentClass="textarea"
                onChange={e => setUltimateDisaster(e.target.value)}
              />
            </FormGroup>
          </Tab>
          <Tab eventKey={4} title="4. The Darkest Moment">
            <FormGroup controlId="darkestMoment">
              <FormControl
                value={darkestMoment}
                componentClass="textarea"
                onChange={e => setDarkestMoment(e.target.value)}
              />
            </FormGroup>
          </Tab>
          <Tab eventKey={5} title="5. The One Chance">
            <FormGroup controlId="oneChance">
              <FormControl
                value={oneChance}
                componentClass="textarea"
                onChange={e => setOneChance(e.target.value)}
              />
            </FormGroup>
          </Tab>
          <Tab eventKey={6} title="6. Do and Die">
            <FormGroup controlId="doAndDie">
              <FormControl
                value={doAndDie}
                componentClass="textarea"
                onChange={e => setDoAndDie(e.target.value)}
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