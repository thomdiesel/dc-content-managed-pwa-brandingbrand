import React, { PropsWithChildren } from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

const styles = (theme: Theme) => ({
    root: {
        position: 'relative' as 'relative',
    },
    content: {

    },
    container: {
        '&$floating, &$responsive': {
            position: 'absolute' as 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
        '&$responsive': {
            [theme.breakpoints.down('sm')]: {
                'position': 'unset'
            }
        }
    },
    overlay: {
        '&$floating, &$responsive': {
            'position': 'absolute' as 'absolute',
            'display': 'inline-block'
        },
        '&$responsive': {
            [theme.breakpoints.down('sm')]: {
                'position': 'unset',
                'transform': 'unset !important'
            }
        },
        '&$floatingRight': {
            right: 0
        },
        '&$floatingLeft': {
            left: 0
        },
        '&$floatingCenter': {
            left: '50%',
            transform: 'translateX(-50%)',

            '&$floatingMiddle': {
                transform: 'translateX(-50%) translateY(-50%)'
            },
            '&$stacked': {
                'transform': 'unset !important'
            }
        },
        '&$floatingTop': {
            top: 0
        },
        '&$floatingMiddle': {
            top: '50%',
            transform: 'translateY(-50%)',

            '&$floatingCenter': {
                transform: 'translateX(-50%) translateY(-50%)'
            },
            '&$stacked': {
                'transform': 'unset !important'
            }
        },
        '&$floatingBottom': {
            bottom: 0
        }
    },
    responsive: {
    },
    floating: {
    },
    stacked: {
    },
    floatingLeft: {},
    floatingCenter: {},
    floatingRight: {},
    floatingTop: {},
    floatingMiddle: {},
    floatingBottom: {}
});

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
    className?: string;
    style?: React.CSSProperties;
    overlay?: React.ReactNode;
    variant?: 'responsive' | 'floating' | 'stacked';

    floatingHorizontalAlignment?: 'left' | 'center' | 'right';
    floatingVerticalAlignment?: 'top' | 'middle' | 'bottom';
}

const Overlay: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        children,
        overlay,
        variant = 'responsive',
        floatingHorizontalAlignment,
        floatingVerticalAlignment = 'middle',
        ...other
    } = props;

    const variantMixin = {
        [classes.responsive]: variant === 'responsive',
        [classes.floating]: variant === 'floating',
        [classes.stacked]: variant === 'stacked'
    }

    return (
        <div className={clsx(classes.root, className, variantMixin)}>
            <div className={classes.content}>
                {children}
            </div>
            <div className={clsx(classes.container, variantMixin)}>
                <div className={clsx(classes.overlay, {
                    ...variantMixin,
                    [classes.floatingLeft]: floatingHorizontalAlignment === 'left',
                    [classes.floatingCenter]: floatingHorizontalAlignment === 'center',
                    [classes.floatingRight]: floatingHorizontalAlignment === 'right',
                    [classes.floatingTop]: floatingVerticalAlignment === 'top',
                    [classes.floatingMiddle]: floatingVerticalAlignment === 'middle',
                    [classes.floatingBottom]: floatingVerticalAlignment === 'bottom'
                })}>
                    {overlay}
                </div>
            </div>
        </div>
    );
};

export default withStyles(styles)(Overlay);