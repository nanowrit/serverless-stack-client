import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, Tabs, Tab } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { s3Upload } from "../../libs/awsLib";
import config from "../../config";
import "../../containers/Notes.css";

export default function Filler(props) {
    const file = useRef(null);
    const [filler, setFiller] = useState(null);
    const [goal, setGoal] = useState("");
    const [conflictField, setConflictField] = useState("");
    const [dilemma, setDilemma] = useState("");
    const [decision, setDecision] = useState("");
    const [actionField, setActionField] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadFiller() {
      return API.get("fillers", `/fillers/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const filler = await loadFiller();
        const { 
          goal, 
          conflictField, 
          dilemma,
          decision, 
          actionField,
          attachment } = filler;

        if (attachment) {
          filler.attachmentURL = await Storage.vault.get(attachment);
        }

        setGoal(goal);
        setConflictField(conflictField);
        setDilemma(dilemma);
        setDecision(decision);
        setActionField(actionField);
        setFiller(filler);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return goal.length > 0 || conflictField.length > 0 || dilemma.length > 0 || decision.length > 0|| actionField.length > 0;
  }
  
  // function formatFilename(str) {
  //   return str.replace(/^\w+-/, "");
  // }
  
  // function handleFileChange(event) {
  //   file.current = event.target.files[0];
  // }
  
  function saveFiller(filler) {
    return API.put("fillers", `/fillers/${props.match.params.id}`, {
      body: filler
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
  
      await saveFiller({
        goal,
        conflictField,
        dilemma,
        decision,
        actionField,
        attachment: attachment || filler.attachment
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deleteFiller() {
    return API.del("fillers", `/fillers/${props.match.params.id}`);
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
      await deleteFiller();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Notes">
      {filler && (
        <form onSubmit={handleSubmit}>
          <h2>The Filler Scene</h2>
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
            <Tab eventKey={3} title="3. The Dilemma">
              <header>The Dilemma</header>
              <FormGroup controlId="dilemma">
                <FormControl
                  value={dilemma}
                  componentClass="textarea"
                  onChange={e => setDilemma(e.target.value)}
                />
              </FormGroup>
            </Tab>
            <Tab eventKey={4} title="4. The Decision">
              <header>The Decision</header>
              <FormGroup controlId="decision">
                <FormControl
                  value={decision}
                  componentClass="textarea"
                  onChange={e => setDecision(e.target.value)}
                />
              </FormGroup>
            </Tab>
            <Tab eventKey={5} title="5. The Action">
              <header>The Action</header>
              <FormGroup controlId="actionField">
                <FormControl
                  value={actionField}
                  componentClass="textarea"
                  onChange={e => setActionField(e.target.value)}
                />
              </FormGroup>
            </Tab>
          </Tabs>
          {/* {filler.attachment && (
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={filler.attachmentURL}
                >
                  {formatFilename(filler.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )}
          <FormGroup controlId="file">
            {!filler.attachment && <ControlLabel>Attachment</ControlLabel>}
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