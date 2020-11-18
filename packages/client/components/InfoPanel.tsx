import React, { PropsWithChildren } from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

const styles = (theme: Theme) => ({
    root: {
        padding: '40px 60px 40px 60px',
        background: 'rgba(255, 255, 255, 0.9)',
        display: 'inline-block'
    }
});

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
    className?: string;
    style?: React.CSSProperties;
    variant?: 'default' | 'absolute';
}

const InfoPanel: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        children,
        variant,
        ...other
    } = props;

    return (
        <div className={clsx(classes.root, className)} {...other}>
            {children}
        </div>
    );
};

export default withStyles(styles)(InfoPanel);