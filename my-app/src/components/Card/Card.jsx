import React from "react";

export const Card = (props) => {
    return (

            <div className="ui special cards">
                <div className="card">
                    <div className="content">
                        <div className="ui grid">
                            <div className="three column row">
                                <div className="column">
                                    <i className="heart outline icon"></i>
                                    <span id="cardHPId">{props.card.hp}</span>
                                </div>
                                <div className="column">
                                    <h5>{props.card.family}</h5>
                                </div>
                                <div className="column">
                                    <span id="energyId">{props.card.energy}</span>
                                    <i className="lightning icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="image imageCard">
                        <div className="blurring dimmable image">
                            <div className="ui inverted dimmer">
                                <div className="content">
                                    <div className="center">
                                        <div className="ui primary button">Add Friend</div>
                                    </div>
                                </div>
                            </div>
                            <div className="ui fluid image">
                                <a className="ui left corner label">{props.card.name}</a>
                                <img
                                    id="cardImgId"
                                    className="ui centered image"
                                    src={props.card.imgUrl}
                                    alt={props.card.name}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="ui form tiny">
                            <div className="field">
                                <label id="cardNameId"></label>
                                <textarea
                                    id="cardDescriptionId"
                                    className="overflowHiden"
                                    readOnly=""
                                    rows="5"
                                >
                  {props.card.description}
                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <i className="heart outline icon"></i>
                        <span id="cardHPId"> HP {props.card.hp}</span>
                        <div className="right floated">
                            <span id="cardEnergyId">Energy {props.card.energy}</span>
                            <i className="lightning icon"></i>
                        </div>
                    </div>
                    <div className="content">
                        <span className="right floated">
                          <span id="cardAttackId"> Attack {props.card.attack}</span>
                          <i className="wizard icon"></i>
                        </span>
                        <i className="protect icon"></i>
                        <span id="cardDefenceId">Defense {props.card.defence}</span>
                    </div>
                    <div className="content">
                        <i className="money icon"></i>
                        Actual Value <span id="cardPriceId"> {props.card.price}</span>
                    </div>
                </div>
            </div>
    );
}