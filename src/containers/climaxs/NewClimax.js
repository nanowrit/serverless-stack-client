import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
import "../../containers/NewNote.css";

export default function NewClimax(props) {
  const file = useRef(null);
  const [struggle, setStruggle] = useState("");
  const [doubt, setDoubt] = useState("");
  const [unexpected, setUnexpected] = useState("");
  const [climax, setClimax] = useState("");
  const [poeticJustice, setPoeticJustice] = useState("");
  const [poeticReward, setPoeticReward] = useState("");
  const [wrapUp, setWrapUp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return struggle.length > 0;
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
  
      await createClimax(
        { 
          struggle,
          doubt,
          unexpected,
          climax,
          poeticJustice,
          poeticReward,
          wrapUp,
          attachment 
        });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createClimax(climax) {
    return API.post("climaxs", "/climaxs", {
      body: climax
    });
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <h2>The Climax Scene</h2>
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
        <FormGroup controlId="climax">
          <FormControl
            value={climax}
            componentClass="textarea"
            onChange={e => setClimax(e.target.value)}
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