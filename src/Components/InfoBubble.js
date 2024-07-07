import React from "react";
import PropTypes from "prop-types";
import { Alert, Card, Button, Row } from "react-bootstrap";
import { login, logout } from "../utils";

const InfoBubble = (props) => {
  return (
    <Card style={{ padding: "3vh", display: 'flex' }}>Login here to start minting NFTs and view yours!
      <Row className='d-flex justify-content-center'>
        <Button
          style={{ width: "50vw" }}
          onClick={window.walletConnection.isSignedIn() ? logout : login}
        >
          {window.walletConnection.isSignedIn() ? window.accountId : "Login"}
        </Button>
      </Row>
    </Card>
  );
};

InfoBubble.propTypes = {};

export default InfoBubble;
