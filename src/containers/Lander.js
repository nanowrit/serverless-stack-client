import React from "react";
import "./Lander.css";
import { Tabs, Tab, Image, Grid, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Lander(props) {
    return (
        <div className="Lander">
            <Tabs className="lander-tabs" defaultActiveKey={1} id="lander-tabs">
                <Tab className="welcome-tab" eventKey={1} title="Welcome">
                    <h1>Welcome to Nanowrit Labs</h1>
                    <p>
                        This is a project inspired by the nanowrimo project and the nanogenmo project. 
                    <p>
                        Our goal here is to model the strategies and techniques of classic pulp fiction writers to create software and algorithms that can assist writers in developing their own pulp fiction stories.
                    </p>
                    </p>
                </Tab>
                <Tab className="research-tab" eventKey={2} title="Library">
                    <Grid fluid>
                        <Row>
                            <Col xsHidden smHidden md={3}>
                                <Image className="art" src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/Weird_Tales_November_1941.png" />
                            </Col>
                            <Col xsPull={6} mdPush={3} lgPush={3}>
                            <h1>The Library</h1>
                            <ListGroup className="library-list">
                                <Link to="/classic-stories">
                                    <ListGroupItem>
                                        <h2>Classic Pulp Fiction Stories</h2>
                                    </ListGroupItem>
                                </Link>
                                <Link to="/modern-stories">
                                    <ListGroupItem>
                                        <h2>Modern Pulp Fiction Stories</h2>
                                    </ListGroupItem>
                                </Link>
                                <Link to="/">
                                    <ListGroupItem>
                                        <h2>Pulp Fiction Blueprints</h2>
                                    </ListGroupItem>
                                </Link>
                                <Link to="/">
                                    <ListGroupItem>
                                        <h2>Classic Pulp Fiction Art</h2>
                                    </ListGroupItem>
                                </Link>
                                <Link to="/">
                                    <ListGroupItem>
                                        <h2>Story Seeds</h2>
                                    </ListGroupItem>
                                </Link>
                            </ListGroup>
                            </Col>
                        </Row>
                    </Grid>
                </Tab>
                {/* <Tab eventKey={3} title="Tools in Development"></Tab> */}
            </Tabs>
          {/* <div className="buttons">
            <Link to="/login" className="btn btn-info btn-lg">
              Login
            </Link>
            <Link to="/signup" className="btn btn-success btn-lg">
              Signup
            </Link>
          </div> */}
        </div>
      );
}