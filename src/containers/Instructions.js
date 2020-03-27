import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import "./Instructions.css";

export default function Instructions(props) {
  return (
    <div className="Instructions">
      <article>
        <header>
            <Tabs defaultActiveKey={1} id="instructions-tabs">
                <Tab eventKey={1} title="front">
                <img src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/experienceWithEvilWithChanges.jpg" alt="Your mom." />
                </Tab>
                <Tab eventKey={2} title="Introduction">
                    <h2>Introduction</h2>
                </Tab>
                <Tab eventKey={3} title="The Scenes">
                    <Tabs defaultActiveKey={1} id="instructions-scenes-tab">
                        {/* <Tab eventKey={1} title="What are the Scenes?">
                        <h2>The Scenes</h2>
                        </Tab> */}
                        <Tab eventKey={1} title="The Beginning Scene">
                            <h3>Beginning Scene</h3>
                            <Tabs defaultActiveKey={1} id="beginning-scene-instructions-tab">
                            <Tab eventKey={1} title="The Hook">
                            <h4>The Hook</h4>
                            <p>The hook grabs the reader’s attention. If you can achieve that in the first sentence then it is time for you to go, Grasshopper. Your reader is as skittish as a trout that’s taken the hook (sorry, I couldn’t help it) too many times. If you don’t get them in the first sentence, or at least the first paragraph they will hide in a dark pool under an overhanging rock and….well, you get the idea.</p>

                            <p>Luckily there are several techniques proven through the years that will fill your net. Let’s explore them.</p>

                            <p>First is ‘The Arrival’. A character, usually the Protagonist, shows up at a setting that is guaranteed to jam him/her into trouble. There is some planning/plotting implied in this opening. The conditions for conflict should be presented immediately to the Protagonist. Secondly, the Protagonist should be a ‘fish out of water’ character. (yeah but the comparison fits, doesn’t it?). That is, the Protagonist doesn’t belong there. There several devices you can use for this as well. </p>

                            <p><strong>Option One: </strong>the Protagonist is returning home after a lengthy absence and finds that he/she has changed and grown but the crazy stuff that he/she escaped from is still there and perhaps worse than remembered. </p>

                            <p><strong>Option Two: </strong>The Protagonist is orphaned from everything they knew; their parents, siblings, friends all gone, dead, or estranged. In this case the Protagonist is hoping to start a new life, perhaps at the invitation of a distant relation or mysterious family acquaintance, maybe to pursue a new career.. But nothing is as it seems. Unknown dangers arise everywhere. Many best-selling romances begin exactly this way.</p>

                            <p><strong>Option Three: </strong>“The Mysterious Stranger”. This opening involves the arrival of a stranger whose presence immediately changes the local social dynamic. High Plains Drifter anybody? The Jack Reacher series of books uses this over and over and it never gets old. </p>

                            <p>An interesting variation of this is what I call “The Revealed Stranger”. That is, somebody who’s been around forever and is accepted as a harmless eccentric. Suddenly the Protagonist is revealed through action as a very dangerous adversary indeed. Think “Equalizer”. </p>

                            <p>Second is the “Trouble” opening. Something violent, terrifying, or just plain catastrophic happens. In this opening many times the Antagonist is introduced first rather than the Protagonist. </p>

                            <p>Almost all murder mysteries begin with a murder, often told in graphic style to horrify the reader with the relative innocence of the victim, the evil of the killer, and the dramatic need for someone to put things right. </p>

                            <p>This opening is perfect for the pulp writer’s motto: “Arrive late and leave early”. The story begins with a bullet smashing into the wall next to the Protagonist’s head, or opens with a punch whistling past his/her head. Action/Adventure fans love this opening. </p>

                            <p>Thirdly there is “The Problem” opening. You show a character (usually the protagonist but can be a supporting character) engrossed in solving a problem. The problem itself may or may not be germain to the central story but at least the solving of the problem propels  the protagonist into all sorts of trouble. </p>

                            <p>This opening is very useful for certain genres like Spy, Sea, and technical stories like Aviation, Space Travel, and the ever mysterious Cyber stories. It also allows for immediate character development by demonstrating the protagonist’s problem solving capability, (a skill that will be life saving in the story to follow)</p>

                            <p>Opening with a problem allows the author to display insider knowledge that becomes a value added experience for the reader. Problems and solutions in navigation, programming, ballistics, aerodynamics, and electronics are just a few examples that add to the entertainment value of a good read. </p>

                            <p>The last opening  technique is the “Narrative Hook”. It is the most difficult and almost perversely, the best (in my opinion anyway). It requires a mastery of the storytellers craft and when done well is an inescapable snare for the wary reader. This technique uses setting and tone rather than characters to introduce the story. Consider this example from Robert E. Howard’s “The Phoenix on the Sword”: </p>

                                <blockquote>“Over shadowy spires and gleaming towers lay the ghostly darkness and silence that runs before dawn. Into a dim alley, one of a veritable labyrinth of mysterious winding ways, four masked figures came hurriedly from a door which a dusky hand furtively opened. They spoke not but went swiftly into the gloom, cloaks wrapped closely about them; as silently as the ghosts of murdered men they disappeared in the darkness. Behind them a sardonic countenance was framed in the partly opened door; a pair of evil eyes glittered malevolently in the gloom”.</blockquote>

                            <p>And another example, this from Poe’s “Fall of the House of Usher”:</p>

                                <blockquote>“It was a dark and soundless day near the end of the year, and clouds were hanging low in the heavens. All day I had been rid-ing on horseback through coun-try with little life or beauty; and in the early evening I came within view of the House of Usher.I do not know how it was — but, with my first sight of the building, a sense of heavy sadness filled my spirit. I looked at the scene before me — at the house itself — at the ground around it — at the cold stone walls of the building — at its empty eye-like windows — and at a few dead trees — I looked at this scene, I say, with a complete sadness of soul which was no healthy, earthly feeling. There was a coldness, a sickening of the heart, in which I could dis-cover nothing to lighten the weight I felt.”</blockquote>

                            <p>That is how you do it people! This opening infuses the setting with a sense of life and movement. It requires verbs that imply sentience into mundane phenomena and everyday objects. It is most powerful inGothic tales of horror and occult but has been used in every form of popular fiction. </p>

                            <p>Remember to think of your readers as elusive quarry that demands a well designed opening to draw them into the body of the story. These opening devices have stood the test of time. The genre, the protagonist and the stories premise all serve to inform you as to which opening is most effective. </p>
                            </Tab>
                            <Tab eventKey={2} title="The Backstory">
                                <h4>Backstory</h4>
                            </Tab>
                            <Tab eventKey={3} title="Inciting Incident">
                                <h4>Inciting Incident</h4>
                            </Tab>
                            <Tab eventKey={4} title="Trigger">
                                <h4>Trigger</h4>
                            </Tab>
                            <Tab eventKey={5} title="The Debate">
                                <h4>Debate</h4>
                            </Tab>
                            <Tab eventKey={6} title="The Decision">
                                <h4>Decision</h4>
                            </Tab>
                            <Tab eventKey={7} title="Crossing the Threshold">
                                <h4>Crossing the Threshold</h4>
                            </Tab>
                        </Tabs>
                        </Tab>
                        <Tab eventKey={2} title="The Mirror Scene">
                            <h3>The Mirror Scene</h3>
                            <Tabs defaultActiveKey={1} id="mirror-scene-instructions-tab">
                                <Tab eventKey={1} title="The Goal">
                                    <h4>Goal</h4>
                                </Tab>
                                <Tab eventKey={2} title="The Conflicy">
                                    <h4>Conflict</h4>
                                </Tab>
                                <Tab eventKey={3} title="The Disaster">
                                    <h4>Disaster</h4>
                                </Tab>
                                <Tab eventKey={4} title="The Mirror Moment">
                                    <h4>Mirror Moment</h4>
                                </Tab>
                                <Tab eventKey={5} title="One More Time">
                                    <h4>One More Time</h4>
                                </Tab>
                                <Tab eventKey={6} title="Action">
                                    <h4>Action</h4>
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab eventKey={3} title="The Re-Commitment Scene">
                            <h3>The Re-Commitment Scene</h3>
                            <Tabs defaultActiveKey={1} id="recommitment-scene-instructions-tab">
                                <Tab eventKey={1} title="The Goal">
                                    <h4>Goal</h4>
                                </Tab>
                                <Tab eventKey={2} title="The Conflict">
                                    <h4>Conflict</h4>
                                </Tab>
                                <Tab eventKey={3} title="The Revelation">
                                    <h4>Revelation</h4>
                                </Tab>
                                <Tab eventKey={4} title="Praising the Enemy">
                                    <h4>Praising the Enemy</h4>
                                </Tab>
                                <Tab eventKey={5} title="Do or Die">
                                    <h4>Do or Die</h4>
                                </Tab>
                                <Tab eventKey={6} title="Crossing the Threshold II">
                                    <h4>Crossing the Threshold II</h4>
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab eventKey={4} title="The Darkness Scene">
                            <h3>The Darkness Scene</h3>
                            <Tabs defaultActiveKey={1} id="darkness-scene-instructions-tab">
                                <Tab eventKey={1} title="The Goal">
                                    <h4>Goal</h4>
                                </Tab>
                                <Tab eventKey={2} title="The Conflict">
                                    <h4>Conflict</h4>
                                </Tab>
                                <Tab eventKey={3} title="Ultimate Disaster">
                                    <h4>Ultimate Disaster</h4>
                                </Tab>
                                <Tab eventKey={4} title="Darkest Moment">
                                    <h4>Darkest Moment</h4>
                                </Tab>
                                <Tab eventKey={5} title="One Chance">
                                    <h4>One Chance</h4>
                                </Tab>
                                <Tab eventKey={6} title=" Do and Die">
                                    <h4>Do and Die</h4>
                                </Tab>
                            </Tabs>

                        </Tab>
                        <Tab eventKey={5} title="The Climax Scene">
                            <h3>The Climax Scene</h3>
                            <Tabs defaultActiveKey={1} id="climax-scene-instructions-tab">
                                <Tab eventKey={1} title="The Struggle">
                                    <h4>Struggle</h4>
                                </Tab>
                                <Tab eventKey={2} title="The Doubt">
                                    <h4>Doubt</h4>
                                </Tab>
                                <Tab eventKey={3} title="The Unexpected">
                                    <h4>The Unexpected</h4>
                                </Tab>
                                <Tab eventKey={4} title="Poetic Justice">
                                    <h4>Poetic Justice</h4>
                                </Tab>
                                <Tab eventKey={5} title="Poetic Reward">
                                    <h4>Poetic Reward</h4>
                                </Tab>
                                <Tab eventKey={6} title="Wrapping it Up">
                                    <h4>Wrapping it Up</h4>
                                </Tab>
                            </Tabs>
                        </Tab>
                    </Tabs>
                </Tab>
                <Tab eventKey={7} title="Conclusion">
                    <h2>Conclusion</h2>
                </Tab>
            </Tabs>
        </header>

      </article>

    </div>
  );
}