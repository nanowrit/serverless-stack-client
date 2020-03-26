import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel, Tabs, Tab } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { s3Upload } from "../../libs/awsLib";
import config from "../../config";
import "../../containers/Notes.css";

export default function Beginning(props) {
    const file = useRef(null);
    const [beginning, setBeginning] = useState(null);
    const [hook, setHook] = useState("");
    const [backstory, setBackstory] = useState("");
    const [incitingIncident, setIncitingIncident] = useState("");
    const [triggerEvent, setTriggerEvent] = useState("");
    const [debate, setDebate] = useState("");
    const [decision, setDecision] = useState("");
    const [threshold, setThreshold] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadBeginning() {
      return API.get("beginnings", `/beginnings/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const beginning = await loadBeginning();
        const { 
          hook, 
          backstory, 
          incitingIncident,
          triggerEvent, 
          debate,
          decision,
          threshold,
          attachment } = beginning;

        if (attachment) {
          beginning.attachmentURL = await Storage.vault.get(attachment);
        }

        setHook(hook);
        setBackstory(backstory);
        setIncitingIncident(incitingIncident);
        setTriggerEvent(triggerEvent);
        setDebate(debate);
        setDecision(decision);
        setThreshold(threshold);
        setBeginning(beginning);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return hook.length > 0 || backstory.length > 0 || incitingIncident.length > 0 || triggerEvent.length > 0 || debate.length > 0 || decision.length > 0 || threshold.length > 0;
  }
  
  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }
  
  // function handleFileChange(event) {
  //   file.current = event.target.files[0];
  // }
  
  function saveBeginning(beginning) {
    return API.put("beginnings", `/beginnings/${props.match.params.id}`, {
      body: beginning
    });
  }
  
  async function handleSubmit(event) {
    let attachment;
  
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
      if (file.current) {
        attachment = await s3Upload(file.current);
      }
  
      await saveBeginning({
        hook,
        backstory,
        incitingIncident,
        triggerEvent,
        debate,
        decision,
        threshold,
        attachment: attachment || beginning.attachment
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deleteBeginning() {
    return API.del("beginnings", `/beginnings/${props.match.params.id}`);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this scene?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      await deleteBeginning();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Notes">
      {beginning && (
        <form onSubmit={handleSubmit}>
          <h2>The Beginning Scene</h2>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab">
            <Tab eventKey={1} title="1. The Hook">
              <header>The Hook</header>
              <FormGroup controlId="hook">
                <FormControl
                  value={hook}
                  componentClass="textarea"
                  onChange={e => setHook(e.target.value)}
                />
              </FormGroup>
            </Tab>
            <Tab eventKey={2} title="2. The Back Story">
              <header>The Back Story</header>
              <FormGroup controlId="backstory">
                <FormControl
                  value={backstory}
                  componentClass="textarea"
                  onChange={e => setBackstory(e.target.value)}
                />
              </FormGroup>
            </Tab>
            <Tab eventKey={3} title="3. The Inciting Incident">
              <header>The Inciting Incident</header>
              <FormGroup controlId="incitingIncident">
                <FormControl
                  value={incitingIncident}
                  componentClass="textarea"
                  onChange={e => setIncitingIncident(e.target.value)}
                />
              </FormGroup>
            </Tab>
            <Tab eventKey={4} title="4. The Trigger">
              <header>The Trigger</header>
              <FormGroup controlId="triggerEvent">
                <FormControl
                  value={triggerEvent}
                  componentClass="textarea"
                  onChange={e => setTriggerEvent(e.target.value)}
                />
              </FormGroup>
            </Tab>
            <Tab eventKey={5} title="5. The Debate">
              <header>The Debate</header>
              <FormGroup controlId="debate">
                <FormControl
                  value={debate}
                  componentClass="textarea"
                  onChange={e => setDebate(e.target.value)}
                />
              </FormGroup>
            </Tab>
            <Tab eventKey={6} title="6. The Decision">
              <header>The Decision</header>
              <FormGroup controlId="decision">
                <FormControl
                  value={decision}
                  componentClass="textarea"
                  onChange={e => setDecision(e.target.value)}
                />
              </FormGroup>
            </Tab>
            <Tab eventKey={7} title="7. The Threshold">
              <header>The Threshold</header>
              <FormGroup controlId="threshold">
                <FormControl
                  value={threshold}
                  componentClass="textarea"
                  onChange={e => setThreshold(e.target.value)}
                />
              </FormGroup>
            </Tab>
          </Tabs>
          {beginning.attachment && (
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={beginning.attachmentURL}
                >
                  {formatFilename(beginning.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )}
          {/* <FormGroup controlId="file">
            {!beginning.attachment && <ControlLabel>Attachment</ControlLabel>}
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
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}