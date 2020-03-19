import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import "../../containers/NewNote.css";

export default function NewBeginning(props) {
  const file = useRef(null);
  const [hook, setHook] = useState("");
  const [backstory, setBackstory] = useState("");
  const [incitingIncident, setIncitingIncident] = useState("");
  const [triggerEvent, setTriggerEvent] = useState("");
  const [debate, setDebate] = useState("");
  const [decision, setDecision] = useState("");
  const [threshold, setThreshold] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return hook.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

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
  
      await createBeginning(
        { 
          hook,
          backstory,
          incitingIncident,
          triggerEvent,
          debate,
          decision,
          threshold,
          attachment 
        });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createBeginning(beginning) {
    return API.post("beginnings", "/beginnings", {
      body: beginning
    });
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <h2>The Beginning Scene</h2>
        <header>The Hook</header>
        <FormGroup controlId="hook">
          <FormControl
            value={hook}
            componentClass="textarea"
            onChange={e => setHook(e.target.value)}
          />
        </FormGroup>
        <header>The Back Story</header>
        <FormGroup controlId="backstory">
          <FormControl
            value={backstory}
            componentClass="textarea"
            onChange={e => setBackstory(e.target.value)}
          />
        </FormGroup>
        <header>The Inciting Incident</header>
        <FormGroup controlId="incitingIncident">
          <FormControl
            value={incitingIncident}
            componentClass="textarea"
            onChange={e => setIncitingIncident(e.target.value)}
          />
        </FormGroup>
        <header>The Trigger</header>
        <FormGroup controlId="triggerEvent">
          <FormControl
            value={triggerEvent}
            componentClass="textarea"
            onChange={e => setTriggerEvent(e.target.value)}
          />
        </FormGroup>
        <header>The Debate</header>
        <FormGroup controlId="debate">
          <FormControl
            value={debate}
            componentClass="textarea"
            onChange={e => setDebate(e.target.value)}
          />
        </FormGroup>
        <header>The Decision</header>
        <FormGroup controlId="decision">
          <FormControl
            value={decision}
            componentClass="textarea"
            onChange={e => setDecision(e.target.value)}
          />
        </FormGroup>
        <header>The Threshold</header>
        <FormGroup controlId="threshold">
          <FormControl
            value={threshold}
            componentClass="textarea"
            onChange={e => setThreshold(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup>
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