
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Alert } from "react-bootstrap";
import ImageList from "./ImageList";

const MintingTool = (props) => {
  const [images, setImages] = useState([]);
  const [promptValue, setPromptValue] = useState("");

  const handleChange = (e) => {
    setPromptValue(e.target.value);
  };

  const generateImage = async () => {
    const response = await fetch(
      `http://localhost:3030/api/generate/createImage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptValue }),
      }
    );
    const data = await response.json();

    setImages([...images, data]);
  }

  return (
    <Card style={{ padding: "2vh" }}>
      <Container>

        <Row style={{ marginBottom: "2vh" }}>
          <p>
            Step 2: After you have logged in, hit the GENERATE button to gen and mint a next NFT of your story.
            Then check your{" "}
            <a href='https://wallet.testnet.near.org/'> wallet</a> and see your
            NFT
          </p>
        </Row>

        <Row className='d-flex justify-content-center'>
          <form>
            <label>
              Name:
              <input type="text" value={promptValue} onChange={handleChange} />
            </label>
            <Button disabled={props.userNFTStatus || window.accountId === ""} onClick={generateImage}>Generate!</Button>
          </form>
        </Row>

        <Row className='d-flex justify-content-center'>
          <ImageList images={images} userNFTStatus={props.userNFTStatus} selectMint={props.setNewNFT} />
        </Row>

        <Row className='d-flex justify-content-center'>
          {props.userNFTStatus ? (
            <Alert variant='danger' style={{ marginTop: "2vh" }}>
              <p style={{ textAlign: "center" }}>
                bruh/sis.... You have an NFT already. You can see it{" "}
                <a href={"https://wallet.testnet.near.org/?tab=collectibles"}>
                  here!
                </a>
              </p>
            </Alert>
          ) : null}
        </Row>
      </Container>
    </Card>
  );
};

MintingTool.propTypes = {};

export default MintingTool;
