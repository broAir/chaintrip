import React from 'react';
import { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import NFTPlaceholder from './NFTPlaceholder';

const NFTTimeline = ({ placeHolderNFT }) => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchFromBlockchain();
    }, []);

    const fetchFromBlockchain = async () => {
        const imageList = await window.contract.nft_tokens();
        setImages(imageList);
        setIsLoading(false);
    };

    return (
        <Row>
            <div id="nft-timeline" className="timeline">
                {isLoading && <p>Loading...</p>}
                {images.length === 0 && !isLoading && <p>No images to display</p>}

                {
                    !isLoading &&
                    images.map((image, index) => (
                        <div className='timeline-image'>
                            {index > 0 && <div class="dots">
                                <span class="dot dot-s"></span>
                                <span class="dot"></span>
                                <span class="dot dot-m"></span>
                            </div>}
                            <div className="content ">
                                <img className={(image.owner_id === window.accountId ? 'glow-my' : '')} key={index} src={image.metadata.media} alt={`Image ${index}`} />
                                <label>Minted by: <b>{image.owner_id}</b></label>
                            </div>
                        </div>
                    ))}
                <div className='timeline-image'>
                    <div class="dots">
                        <span class="dot dot-s"></span>
                        <span class="dot"></span>
                        <span class="dot dot-m"></span>
                    </div>
                    <div className='content'>
                        <NFTPlaceholder image={placeHolderNFT} />
                    </div>
                </div>
            </div>
        </Row>
    );
}
export default NFTTimeline;