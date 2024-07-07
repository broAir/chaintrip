import React from 'react';
import { Button } from 'react-bootstrap';

const ImageList = ({ images, userNFTStatus, selectMint }) => {

    const handleSetNewNFT = (nft) => {
        window.scrollTo(0, 0);
        document.getElementById("nft-timeline").scrollLeft = document.getElementById("nft-timeline").scrollWidth
        selectMint(nft);
    }

    return (
        <div className="img-list">
            {images.length === 0 && <p>No images to display</p>}

            {images.map((image, index) => (
                <div className='img-list-item' key={index}>
                    <img src={image.url} alt={image.alt} />
                    <span>{image.prompt}</span>
                    <Button disabled={userNFTStatus || window.accountId === ""} onClick={handleSetNewNFT(image)}>Select to mint</Button>
                </div>
            ))}

        </div>
    );
};

export default ImageList;
