import React from "react";
import {makeStyles, TextField} from "@material-ui/core";

interface CustomInputProps {
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onBlur?: {
        (e: React.FocusEvent<HTMLInputElement>): void;
        <T = unknown>(fieldOrEvent: T): T extends string ? (e: unknown) => void : void;
    };
    value?: string;
    width?: number;
    name?: string;
    placeholder?: string;
    fullWidth?: boolean;
    error?: boolean;
    helperText?: string | boolean;
    required?: boolean;
    variant?: 'filled' | 'standard' | 'outlined' | undefined;
    label?: string;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
    const useStyles = makeStyles({
        root: {
            '& .MuiOutlinedInput-root': {
                borderRadius: 6,
                padding: 0,
                '& .MuiOutlinedInput-input': {
                    paddingLeft: 6,
                },
                '& fieldset': {
                    borderRadius: 6,
                    borderWidth: 1,
                },
                '& input': {
                    borderRadius: 6,
                    height: 48,
                    padding: 0,
                },
            },
            '& .MuiInputLabel-outlined': {
                fontFamily: 'Nunito Sans',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                top: '-9px',
            },
            '& .MuiInputLabel-shrink': {
                transform: 'translate(14px, -2px) scale(0.75)',
            },
            '& .PrivateNotchedOutline-legendLabelled-11': {
                '& span': {
                    paddingRight: 5,
                    fontFamily: 'Neue Haas Grotesk',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '12px',
                    lineHeight: '150%',
                    color: '#9E9E9E',
                },
            },
            '&.MuiOutlinedInput-input': {
                paddingLeft: '35px',
            },
        },
        label: {
            textTransform: 'capitalize',
        },
    });

    const classes = useStyles();

    return (
        <TextField
            color="secondary"
            error={props.error}
            name={props.name}
            type="text"
            helperText={props.helperText}
            fullWidth={true}
            variant={props.variant || 'outlined'}
            label={props.label}
            required={props.required}
            placeholder={props.placeholder}
            InputProps={{
                style: {
                    background: 'white',
                    fontFamily: 'Nunito Sans',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '18px',
                    lineHeight: '150%',
                },
            }}
            classes={{
                root: classes.root,
            }}
            onBlur={props.onBlur}
            onChange={props.onChange}
            value={props.value}
        />
    );
};

export default CustomInput;
