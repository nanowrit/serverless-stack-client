import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";
import LoaderButton from "../../components/LoaderButton";
import config from "../../config";
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
        <header>The Ultimate Disaster</header>
        <FormGroup controlId="ultimateDisaster">
          <FormControl
            value={ultimateDisaster}
            componentClass="textarea"
            onChange={e => setUltimateDisaster(e.target.value)}
          />
        </FormGroup>
        <header>The Darkest Moment</header>
        <FormGroup controlId="darkestMoment">
          <FormControl
            value={darkestMoment}
            componentClass="textarea"
            onChange={e => setDarkestMoment(e.target.value)}
          />
        </FormGroup>
        <header>The One Chance</header>
        <FormGroup controlId="oneChance">
          <FormControl
            value={oneChance}
            componentClass="textarea"
            onChange={e => setOneChance(e.target.value)}
          />
        </FormGroup>
        <header>Do And Die</header>
        <FormGroup controlId="doAndDie">
          <FormControl
            value={doAndDie}
            componentClass="textarea"
            onChange={e => setDoAndDie(e.target.value)}
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