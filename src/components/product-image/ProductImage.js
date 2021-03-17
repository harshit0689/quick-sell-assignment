import { useEffect, useState } from "react";

import './products-image.css';
import { ERROR_ICON_URL } from "../../constants/constants";

function ProductImage({
    url,
    ready,
    error,
    onError,
    count,
    placeholder,
    index
}) {
    const [loading, setLoading] = useState(true);
    const [currentSrc, updateSrc] = useState('');
    const alt = 'Image is loading';
    useEffect(() => {
        // start loading original image
        if (count >= 3) {
            onError(true);
        }
        if (ready) {
            const imageLoader = new Image();
            imageLoader.src = url;
            imageLoader.onload = () => {
                // When image is loaded replace the src and set loading to false
                setLoading(false);
                updateSrc(url);
            }
            imageLoader.onerror = () => {
                setLoading(false);
                updateSrc(ERROR_ICON_URL);
                onError();
            }
        }
        if (error) {
            setLoading(false);
            updateSrc(ERROR_ICON_URL);
        }
    }, [url, error, ready, onError, count]);

    if (placeholder) {
        return (
            <div className={"placeholder-div index-" + index}></div>
        );
    }
    if (loading) {
        return (
            <div className={"spinner index-" + index}></div>
        );
    }

    return (
        <img
            className={"index-" + index}
            src={currentSrc}
            alt={alt}
        />
    )
}

export default ProductImage;