import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { login, logout } from "./utils";

// React Bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

// React Bootstraps imports
import { Nav, Navbar, Container, Row, Card, Alert } from "react-bootstrap";

// Custom Components
import MintingTool from "./Components/MintingTool";
import InfoBubble from "./Components/InfoBubble";

// assets
import Logo from "./assets/logo-white.svg";

import getConfig from "./config";
import NFTTimeline from "./Components/NFTTimeline";
const nearConfig = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const [userHasNFT, setuserHasNFT] = useState(false);
  const [newNFT, setNewNFT] = useState(null);


  useEffect(() => {
    const receivedNFT = async () => {
      console.log(
        await window.contract.check_token({
          id: `${window.accountId}-${nearConfig.tripName}`,
        })
      );
      if (window.accountId !== "") {
        console.log(
          await window.contract.check_token({
            id: `${window.accountId}-${nearConfig.tripName}`,
          })
        );

        setuserHasNFT(
          await window.contract.check_token({
            id: `${window.accountId}-${nearConfig.tripName}`,
          })
        );
      }
    };
    receivedNFT();
  }, []);

  return (
    <React.Fragment>
      {" "}
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>
            <img
              alt=''
              src={Logo}
              width='30'
              height='30'
              className='d-inline-block align-top'
            />{" "}
            NEAR Protocol
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'></Nav>
            <Nav>
              <Nav.Link
                onClick={window.walletConnection.isSignedIn() ? logout : login}
              >
                {window.walletConnection.isSignedIn()
                  ? window.accountId
                  : "Login"}
              </Nav.Link>{" "}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ marginTop: "3vh" }}>
        <Row>
          <h1>Corgi trip NFT</h1>
        </Row>
        <Row style={{ marginTop: "3vh" }}>
          <Alert>
            GM! We are going to mint an NFT and have it appear in your
            wallet! Sign in, mint your nft and head over to{" "}
            <a href='https://wallet.testnet.near.org/'>
              wallet.testnet.near.org
            </a>{" "}
            to see your new <b>Corgi trip</b> NFT
          </Alert>
          <p>
            Someone has already started a story. You can add to it by minting an NFT by adding couple of words to the prompt!

          </p>
          <p>  The prompt is then hashed and stored on the blockchain, so that noone else knows what was the prompt!
            Try to guess what cool you can add to the story!</p>
        </Row>
        <Row>
          <NFTTimeline placeHolderNFT={newNFT} />
        </Row>
        <Row>
          <InfoBubble />
        </Row>
        <Row style={{ marginTop: "3vh" }}>
          <MintingTool setNewNFT={setNewNFT} />
        </Row>
      </Container>
    </React.Fragment>
  );
}
