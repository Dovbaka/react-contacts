import {Button} from "@material-ui/core";
import React, {ReactElement} from "react";

interface PropTypes {
    width?: string;
    type: 'submit' | 'button';
    text?: string | ReactElement;
    className?: string;
    inverted?: boolean;
    disabled?: boolean;
    endIcon?: React.ReactNode;
    onClick?: () => void;
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'default' | 'inherit' | 'primary' | 'secondary';
    textColor?: string;
    isPending?: boolean;
    onMouseEnter?: React.Dispatch<React.SetStateAction<boolean>>
    onMouseLeave?: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomButton: React.FC<PropTypes> = (props) => {
    const {children} = props;
    return (
        <Button
            style={
                {
                    width: props.width,
                    height: "44px",
                    borderRadius: "6px",
                    color: props.textColor ? props.textColor : 'white',
                }
            }
            endIcon={props.endIcon}
            variant={props.variant ? props.variant : "contained"}
            color={props.color}
            type={props.type}
            disabled={props.disabled}
            className={props.className}
            onClick={props.onClick}
        >
            {children}
        </Button>
    );
};

export default CustomButton;