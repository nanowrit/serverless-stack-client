import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, Tabs, Tab } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { s3Upload } from "../../libs/awsLib";
import config from "../../config";
import "../../containers/Notes.css";

export default function Recommitment(props) {
    const file = useRef(null);
    const [recommitment, setRecommitment] = useState(null);
    const [goal, setGoal] = useState("");
    const [conflictField, setConflictField] = useState("");
    const [revelation, setRevelation] = useState("");
    const [praiseTheEnemy, setPraiseTheEnemy] = useState("");
    const [doOrDie, setDoOrDie] = useState("");
    const [crossThreshold, setCrossThreshold] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadRecommitment() {
      return API.get("recommitments", `/recommitments/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const recommitment = await loadRecommitment();
        const { 
          goal, 
          conflictField, 
          revelation,
          praiseTheEnemy, 
          doOrDie,
          crossThreshold,
          attachment } = recommitment;

        if (attachment) {
          recommitment.attachmentURL = await Storage.vault.get(attachment);
        }

        setGoal(goal);
        setConflictField(conflictField);
        setRevelation(revelation);
        setPraiseTheEnemy(praiseTheEnemy);
        setDoOrDie(doOrDie);
        setCrossThreshold(crossThreshold);
        setRecommitment(recommitment);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return goal.length > 0 || conflictField.length > 0 || revelation.length > 0 || praiseTheEnemy.length > 0 || doOrDie.length > 0 || crossThreshold.length > 0;
  }
  
  // function formatFilename(str) {
  //   return str.replace(/^\w+-/, "");
  // }
  
  // function handleFileChange(event) {
  //   file.current = event.target.files[0];
  // }
  
  function saveRecommitment(recommitment) {
    return API.put("recommitments", `/recommitments/${props.match.params.id}`, {
      body: recommitment
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
  
      await saveRecommitment({
        goal,
        conflictField,
        revelation,
        praiseTheEnemy,
        doOrDie,
        crossThreshold,
        attachment: attachment || recommitment.attachment
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deleteRecommitment() {
    return API.del("recommitments", `/recommitments/${props.match.params.id}`);
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
      await deleteRecommitment();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Notes">
      {recommitment && (
        <form onSubmit={handleSubmit}>
          <h2>Your Recommitment Scene</h2>
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
            <Tab eventKey={4} title="4. Praising the Enemy">
              <header>Praising the Enemy</header>
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
              <header>Crossing the Threshold</header>
              <FormGroup controlId="crossThreshold">
                <FormControl
                  value={crossThreshold}
                  componentClass="textarea"
                  onChange={e => setCrossThreshold(e.target.value)}
                />
              </FormGroup>
            </Tab>
          </Tabs>
          {/* {recommitment.attachment && (
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={recommitment.attachmentURL}
                >
                  {formatFilename(recommitment.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup> */}
          {/* )}
          <FormGroup controlId="file">
            {!recommitment.attachment && <ControlLabel>Attachment</ControlLabel>}
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