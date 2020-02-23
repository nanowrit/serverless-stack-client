import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import "../../containers/NewNote.css";

export default function NewMirror(props) {
  const file = useRef(null);
  const [goal, setGoal] = useState("");
  const [conflictField, setConflictField] = useState("");
  const [disaster, setDisaster] = useState("");
  const [mirrorMoment, setMirrorMoment] = useState("");
  const [oneMoreTime, setOneMoreTime] = useState("");
  const [actionField, setActionField] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return goal.length > 0;
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
  
      await createMirror(
        { 
          goal,
          conflictField,
          disaster,
          mirrorMoment,
          oneMoreTime,
          actionField,
          attachment 
        });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createMirror(mirror) {
    return API.post("mirrors", "/mirrors", {
      body: mirror
    });
  }

  return (
    <div className="NewNote">
      <h2>Your Mirror Scene</h2>
      <form onSubmit={handleSubmit}>
        <header>The Goal</header>
        <FormGroup controlId="goal">
          <FormControl
            value={goal}
            componentClass="textarea"
            onChange={e => setGoal(e.target.value)}
          />
        </FormGroup>
        <header>The Conflict</header>
        <FormGroup controlId="conflictField">
          <FormControl
            value={conflictField}
            componentClass="textarea"
            onChange={e => setConflictField(e.target.value)}
          />
        </FormGroup>
        <header>The Disaster</header>
        <FormGroup controlId="disaster">
          <FormControl
            value={disaster}
            componentClass="textarea"
            onChange={e => setDisaster(e.target.value)}
          />
        </FormGroup>
        <header>The Mirror Moment</header>
        <FormGroup controlId="mirrorMoment">
          <FormControl
            value={mirrorMoment}
            componentClass="textarea"
            onChange={e => setMirrorMoment(e.target.value)}
          />
        </FormGroup>
        <header>One More Time</header>
        <FormGroup controlId="oneMoreTime">
          <FormControl
            value={oneMoreTime}
            componentClass="textarea"
            onChange={e => setOneMoreTime(e.target.value)}
          />
        </FormGroup>
        <header>The Action</header>
        <FormGroup controlId="actionField">
          <FormControl
            value={actionField}
            componentClass="textarea"
            onChange={e => setActionField(e.target.value)}
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