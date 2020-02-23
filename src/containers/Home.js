import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import "./Home.css";

export default function Home(props) {
  const [mirrors, setMirrors] = useState([{}]);
  const [beginnings, setBeginnings] = useState([{}]);
  const [darknesss, setDarknesss] = useState([{}]);
  const [fillers, setFillers] = useState([{}]);
  const [recommitments, setRecommitments] = useState([{}]);
  const [climaxs, setClimaxs] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        const beginnings = await loadBeginnings();
        setBeginnings(beginnings);
        const mirrors = await loadMirrors();
        setMirrors(mirrors);
        const darknesss = await loadDarknesss();
        setDarknesss(darknesss);
        const fillers = await loadFillers();
        setFillers(fillers);
        const recommitments = await loadRecommitments();
        setRecommitments(recommitments);
        const climaxs = await loadClimaxs();
        setClimaxs(climaxs);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [props.isAuthenticated]);
  
  function loadBeginnings() {
    return API.get("beginnings", "/beginnings");
  }

  function loadMirrors() {
    return API.get("mirrors", "/mirrors");
  }

  function loadDarknesss() {
    return API.get("darknesss", "/darknesss");
  }

  function loadFillers() {
    return API.get("fillers", "/fillers");
  }

  function loadRecommitments() {
    return API.get("recommitments", "/recommitments");
  }

  function loadClimaxs() {
    return API.get("climaxs", "/climaxs");
  }

  function renderBeginningsList(beginnings) {
    return [{}].concat(beginnings).map((beginning, i) =>
      i !== 0 ? (
        <LinkContainer key={beginning.beginningId} to={`/beginnings/${beginning.beginningId}`}>
          <ListGroupItem>
            <h3>The Hook</h3>
            {beginning.hook}
            <h3>The Backstory</h3>
            {beginning.backstory}
            <h3>The Inciting Incident</h3>
            {beginning.incitingIncident}
            <h3>The Trigger</h3>
            {beginning.triggerEvent}
            <h3>The Debate</h3>
            {beginning.debate}
            <h3>The Decision</h3>
            {beginning.decision}
            <h3>The Threshold</h3>
            {beginning.threshold}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/beginnings/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new beginning scene
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderMirrorsList(mirrors) {
    return [{}].concat(mirrors).map((mirror, i) =>
      i !== 0 ? (
        <LinkContainer key={mirror.mirrorId} to={`/mirrors/${mirror.mirrorId}`}>
          <ListGroupItem>
            <h3>The Goal</h3>
            {mirror.goal}
            <h3>The Conflict</h3>
            {mirror.conflictField}
            <h3>Then Disaster Strikes</h3>
            {mirror.disaster}
            <h3>The Mirror Moment</h3>
            {mirror.mirrorMoment}
            <h3>One More Time</h3>
            {mirror.oneMoreTime}
            <h3>The Action</h3>
            {mirror.actionField}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/mirrors/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new mirror scene
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderDarknessList(darknesss) {
    return [{}].concat(darknesss).map((darkness, i) =>
      i !== 0 ? (
        <LinkContainer key={darkness.darknessId} to={`/darknesss/${darkness.darknessId}`}>
          <ListGroupItem>
            <h3>The Goal</h3>
            {darkness.goal}
            <h3>The Conflict</h3>
            {darkness.conflictField}
            <h3>Then Ultimate Disaster Strikes</h3>
            {darkness.ultimateDisaster}
            <h3>The Mirror Moment</h3>
            {darkness.darkestMoment}
            <h3>One Chance</h3>
            {darkness.oneChance}
            <h3>Do and Die</h3>
            {darkness.doAndDie}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/darknesss/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new darkness scene
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderFillerList(fillers) {
    return [{}].concat(fillers).map((filler, i) =>
      i !== 0 ? (
        <LinkContainer key={filler.fillerId} to={`/fillers/${filler.fillerId}`}>
          <ListGroupItem>
            <h3>The Goal</h3>
            {filler.goal}
            <h3>The Conflict</h3>
            {filler.conflictField}
            <h3>Then Disaster Strikes</h3>
            {filler.disaster}
            <h3>The Dilemma</h3>
            {filler.dilemma}
            <h3>The Decision</h3>
            {filler.decision}
            <h3>The Action</h3>
            {filler.actionField}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/fillers/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new transition scene
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderRecommitmentList(recommitments) {
    return [{}].concat(recommitments).map((recommitment, i) =>
      i !== 0 ? (
        <LinkContainer key={recommitment.recommitmentId} to={`/recommitments/${recommitment.recommitmentId}`}>
          <ListGroupItem>
            <h3>The Goal</h3>
            {recommitment.goal}
            <h3>The Conflict</h3>
            {recommitment.conflictField}
            <h3>Then Disaster Strikes</h3>
            {recommitment.disaster}
            <h3>The Dilemma</h3>
            {recommitment.dilemma}
            <h3>The Decision</h3>
            {recommitment.decision}
            <h3>The Action</h3>
            {recommitment.actionField}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/recommitments/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new re-commitment scene
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderClimaxList(climaxs) {
    return [{}].concat(climaxs).map((climax, i) =>
      i !== 0 ? (
        <LinkContainer key={climax.climaxId} to={`/climaxs/${climax.climaxId}`}>
          <ListGroupItem>
            <h3>The struggle</h3>
            {climax.struggle}
            <h3>The Doubt</h3>
            {climax.doubt}
            <h3>The Unexpected</h3>
            {climax.unexpected}
            <h3>The Climax</h3>
            {climax.climax}
            <h3>Poetic Justice</h3>
            {climax.poeticJustice}
            <h3>Poetic Reward</h3>
            {climax.poeticReward}
            <h3>Warp it Up</h3>
            {climax.wrapUp}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/climaxs/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new climax scene
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>SceneBuilder</h1>
        <p>A simple scene creating workflow</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  function renderScenes() {
    return (
      <div className="notes">
        <PageHeader>Your Scenes</PageHeader>
        <h2>In the Beginning...</h2>
        <ListGroup>
          {!isLoading && renderBeginningsList(beginnings)}
        </ListGroup>
        <h2>A look in the mirror...</h2>
        <ListGroup>
        {!isLoading && renderMirrorsList(mirrors)}
        </ListGroup>
        <h2>And now for something a little darker...</h2>
        <ListGroup>
        {!isLoading && renderDarknessList(darknesss)}
        </ListGroup>
        <h2>A transition</h2>
        <ListGroup>
        {!isLoading && renderFillerList(fillers)}
        </ListGroup>
        <h2>Re-commitment</h2>
        <ListGroup>
        {!isLoading && renderRecommitmentList(recommitments)}
        </ListGroup>
        <h2>The Climax</h2>
        <ListGroup>
        {!isLoading && renderRecommitmentList(climaxs)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderScenes() : renderLander()}
    </div>
  );
}