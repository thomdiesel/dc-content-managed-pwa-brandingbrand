import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography, withStyles, WithStyles } from '@material-ui/core';
import { CmsImage, ImageScaleFit, ImageScaleMode, ImageTransformations } from '../utils/getImageURL';
import clsx from 'clsx';
import Overlay from './Overlay';
import InfoPanel from './InfoPanel';
import CallToAction from './CallToAction';
import DefaultAdaptiveImageSkeleton from './DefaultAdaptiveImageSkeleton';
import DefaultAdaptiveImage from './DefaultAdaptiveImage';

const styles = theme => ({
    root: {
    }, 
    image: {
        width: '100%'
    },
    overlay: {
        [theme.breakpoints.down('sm')]: {
            position: 'unset !important',
            background: 'red'
        }
    },
    infoPanel: {
    },
    subheader: {
        color: 'inherit',
        fontFamily: "'Roboto', sans-serif",
        fontSize: '14px'
    },
    description: {
        fontWeight: 400,
        fontSize: '16px',
        color: 'inherit',
        marginTop:20,
        marginBottom:20
    },
    cta: {
        marginTop: 15
    }
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    image: {
        img: {
            image: ImageTransformations & {
                image: CmsImage
            }
        }
    },
    bannerText: {
        header: string;
        subheader?: string;
        description: string;
    },
    ctaSettings: {
        linkUrl: string;
        buttonText: string;
    },
    textPositioning: {
        textPositionHorizontal: 'left' | 'center' | 'right',
        textPositionVertical: 'top' | 'middle' | 'bottom'
    }
}

const SimpleBanner: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        image,
        bannerText,
        ctaSettings,
        textPositioning,
        ...other
    } = props;

    const [imageLoading, setImageLoading] = useState(true);
    const imageRef = useRef<any>();

    const handleImageLoaded = () => {
      setImageLoading(false);
    }
    
    useEffect(() => {
      if (imageRef?.current?.complete && imageLoading) {
          setImageLoading(false);
      }
  }, [imageRef?.current?.complete]);

    const {
        img
    } = image || {};

    const transformations: ImageTransformations = {
        ...img?.image,
        upscale: false,
        scaleMode: ImageScaleMode.ASPECT_RATIO,
        scaleFit: img?.image?.poi && img?.image?.poi.x != -1 && img?.image?.poi.y != -1 ? ImageScaleFit.POINT_OF_INTEREST : undefined
    };

    const isOverlayVisible = bannerText?.header || bannerText?.subheader || bannerText?.description || ctaSettings?.buttonText;

    return (
        <div className={clsx(classes.root, className)} {...other}>
            <Overlay variant="responsive"
                floatingHorizontalAlignment={textPositioning?.textPositionHorizontal}
                floatingVerticalAlignment={textPositioning?.textPositionVertical}
                overlay={
                    isOverlayVisible ? (
                        <InfoPanel className={classes.infoPanel}
                            variant="absolute">
                            <Typography variant="h2" component="h2">{bannerText?.header}</Typography>
                            <Typography variant="h5" component="h5" className={classes.subheader}>{bannerText?.subheader}</Typography>
                            <Typography variant="subtitle1" component="p" className={classes.description}>{bannerText?.description}</Typography>
                            <Button variant="outlined" href={ctaSettings?.linkUrl}>
                                {ctaSettings?.buttonText}
                            </Button>
                        </InfoPanel>
                    ) : null
                }>
                {imageLoading ? <DefaultAdaptiveImageSkeleton /> : null}
                <div style={{display: `${imageLoading ? 'none': 'block'}`}}>
                <DefaultAdaptiveImage ref={imageRef} onLoad={() => handleImageLoaded()} image={img?.image.image} transformations={transformations} className={classes.image} />
                </div>
    
            </Overlay>
        </div>
    );
};

export default withStyles(styles)(SimpleBanner);