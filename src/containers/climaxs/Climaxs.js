import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { s3Upload } from "../../libs/awsLib";
import config from "../../config";
import "../../containers/Notes.css";

export default function Climax(props) {
    const file = useRef(null);
    const [climax, setClimax] = useState(null);
    const [struggle, setStruggle] = useState("");
    const [doubt, setDoubt] = useState("");
    const [unexpected, setUnexpected] = useState("");
    const [climaxField, setClimaxField] = useState("");
    const [poeticJustice, setPoeticJustice] = useState("");
    const [poeticReward, setPoeticReward] = useState("");
    const [wrapUp, setWrapUp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadClimax() {
      return API.get("climaxs", `/climaxs/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const climax = await loadClimax();
        const { 
          struggle, 
          doubt, 
          unexpected,
          climaxField, 
          poeticJustice,
          poeticReward,
          wrapUp,
          attachment } = climax;

        if (attachment) {
          climax.attachmentURL = await Storage.vault.get(attachment);
        }

        setStruggle(struggle);
        setDoubt(doubt);
        setUnexpected(unexpected);
        setClimaxField(climaxField);
        setPoeticJustice(poeticJustice);
        setPoeticReward(poeticReward);
        setWrapUp(wrapUp);
        setClimax(climax);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return struggle.length > 0 || doubt.length > 0 || unexpected.length > 0 || climaxField.length > 0 || poeticJustice.length > 0 || poeticReward.length > 0 || wrapUp.length > 0;
  }
  
  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }
  
  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  
  function saveClimax(climax) {
    return API.put("climaxs", `/climaxs/${props.match.params.id}`, {
      body: climax
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
  
      await saveClimax({
        struggle,
        doubt,
        unexpected,
        climaxField,
        poeticJustice,
        poeticReward,
        wrapUp,
        attachment: attachment || climax.attachment
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deleteClimax() {
    return API.del("climaxs", `/climaxs/${props.match.params.id}`);
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
      await deleteClimax();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Notes">
      {climax && (
        <form onSubmit={handleSubmit}>
          <h2>Your Climax Scene</h2>
          <header>The Struggle</header>
        <FormGroup controlId="struggle">
          <FormControl
            value={struggle}
            componentClass="textarea"
            onChange={e => setStruggle(e.target.value)}
          />
        </FormGroup>
        <header>The Doubt</header>
        <FormGroup controlId="doubt">
          <FormControl
            value={doubt}
            componentClass="textarea"
            onChange={e => setDoubt(e.target.value)}
          />
        </FormGroup>
        <header>The Unexpected</header>
        <FormGroup controlId="unexpected">
          <FormControl
            value={unexpected}
            componentClass="textarea"
            onChange={e => setUnexpected(e.target.value)}
          />
        </FormGroup>
        <header>The Climax</header>
        <FormGroup controlId="climaxField">
          <FormControl
            value={climaxField}
            componentClass="textarea"
            onChange={e => setClimaxField(e.target.value)}
          />
        </FormGroup>
        <header>Poetic Justice</header>
        <FormGroup controlId="poeticJustice">
          <FormControl
            value={poeticJustice}
            componentClass="textarea"
            onChange={e => setPoeticJustice(e.target.value)}
          />
        </FormGroup>
        <header>Poetic Reward</header>
        <FormGroup controlId="poeticReward">
          <FormControl
            value={poeticReward}
            componentClass="textarea"
            onChange={e => setPoeticReward(e.target.value)}
          />
        </FormGroup>
        <header>Wrapping it Up</header>
        <FormGroup controlId="wrapUp">
          <FormControl
            value={wrapUp}
            componentClass="textarea"
            onChange={e => setWrapUp(e.target.value)}
          />
        </FormGroup>
          {climax.attachment && (
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={climax.attachmentURL}
                >
                  {formatFilename(climax.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )}
          <FormGroup controlId="file">
            {!climax.attachment && <ControlLabel>Attachment</ControlLabel>}
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