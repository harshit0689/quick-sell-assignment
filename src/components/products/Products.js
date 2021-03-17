import './products.css';
import ProductImage from '../product-image/ProductImage';
import { useState } from 'react';
import { ERROR_ICON_URL } from '../../constants/constants';

function Products({
    name,
    count,
    images = []
}) {
    let imagesCount = Array.from({length: 4}).map(x => 0);
    let imagesClone = [...images];
    if (imagesClone.length < 4) {
        while (imagesClone.length < 4) {
            imagesClone.push({
                placeholder: true
            });
        }
    }
    const [renderedImages, setRenderedImages] = useState(imagesClone);
    const [showError, setShowError] = useState(false);

    let imageRenderedFailed = (index, final) => {
        imagesCount[index] += 1;
        if (final) {
            let updatedImages = [...renderedImages];
            updatedImages[index].error = true;
            updatedImages[index].ready = false;
            setRenderedImages(updatedImages);
            setShowError(true);
        }
    };

    return (
        <div
            className="products-container"
        >
            <div className="images-container">
                {/* Rendering of images goes here */}
                {renderedImages.map((ele, index) => {
                    return (
                        <ProductImage
                            {...ele}
                            index={index}
                            count={imagesCount[index]}
                            onError={(final) => {
                                imageRenderedFailed(index, final);
                            }}
                        />
                    );
                })}
            </div>
            <div className="products-header-container">
                <h2 className="products-header">{name}</h2>
                <div className="products-count">{count} product{count !== 1 && 's'}</div>
            </div>
            {renderedImages.find(ele => ele.error) &&
                <div className="error-icon-holder">
                    <img
                        src={ERROR_ICON_URL}
                        alt="Error Icon Loading"
                    />
                </div>
            }
        </div>
    );
}

export default Products;