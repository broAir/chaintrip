import React from 'react';
import { mintNFT } from '../utils';
import { useState, useEffect } from 'react';
import { Row, Button } from 'react-bootstrap';
import phImage from '../assets/q-mark.jpg';

const NFTPlaceholder = ({ image, isLoading }) => {

    // const [image, setImage] = useState([]);

    // useEffect(() => {
    //     fetchFromBlockchain();
    // }, []);

    return (
        <div>
            <div className={"nft-placeholder " + (image != null ? "glow-box glow-border" : "bright-border")} style={{ position: 'relative' }}>
                {image == null &&
                    <>
                        <img className='nft-mint-ph-image' src={phImage} style={{ height: '256px' }} />
                        <div className='nft-mint-overlay'>
                            <p className='nft-mint-button'>Generate an image to mint an NFT</p>
                        </div>
                        {isLoading &&
                            <div className="loader"></div>}
                    </>
                }
                {image != null &&
                    <>
                        <img className='nft-mint-image hue-rotate' src={image.url} />
                        <div className='nft-mint-overlay'>
                            <Button className='nft-mint-button' disabled={window.accountId === "" && !image.prompt} onClick={() => mintNFT(image)}>Mint</Button>
                        </div>
                    </>
                }

            </div>
        </div>
    );
}
export default NFTPlaceholder;