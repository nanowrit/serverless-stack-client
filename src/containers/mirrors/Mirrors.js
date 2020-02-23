import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { s3Upload } from "../../libs/awsLib";
import config from "../../config";
import "../../containers/Notes.css";

export default function Mirror(props) {
    const file = useRef(null);
    const [mirror, setMirror] = useState(null);
    const [goal, setGoal] = useState("");
    const [conflictField, setConflictField] = useState("");
    const [disaster, setDisaster] = useState("");
    const [mirrorMoment, setMirrorMoment] = useState("");
    const [oneMoreTime, setOneMoreTime] = useState("");
    const [actionField, setActionField] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadMirror() {
      return API.get("mirrors", `/mirrors/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const mirror = await loadMirror();
        const { 
          goal, 
          conflictField, 
          disaster,
          mirrorMoment, 
          oneMoreTime,
          actionField,
          attachment } = mirror;

        if (attachment) {
          mirror.attachmentURL = await Storage.vault.get(attachment);
        }

        setGoal(goal);
        setConflictField(conflictField);
        setDisaster(disaster);
        setMirrorMoment(mirrorMoment);
        setOneMoreTime(oneMoreTime);
        setActionField(actionField);
        setMirror(mirror);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return goal.length > 0 || conflictField.length > 0 || disaster.length > 0 || mirrorMoment.length > 0 || oneMoreTime.length > 0 || actionField.length > 0;
  }
  
  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }
  
  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  
  function saveMirror(mirror) {
    return API.put("mirrors", `/mirrors/${props.match.params.id}`, {
      body: mirror
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
  
      await saveMirror({
        goal,
        conflictField,
        disaster,
        mirrorMoment,
        oneMoreTime,
        actionField,
        attachment: attachment || mirror.attachment
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deleteMirror() {
    return API.del("mirrors", `/mirrors/${props.match.params.id}`);
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
      await deleteMirror();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Notes">
      {mirror && (
        <form onSubmit={handleSubmit}>
          <h2>Your Mirror Scene</h2>
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
          {mirror.attachment && (
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={mirror.attachmentURL}
                >
                  {formatFilename(mirror.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )}
          <FormGroup controlId="file">
            {!mirror.attachment && <ControlLabel>Attachment</ControlLabel>}
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