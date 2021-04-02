import {Grid, Typography} from "@material-ui/core";
import classes from "./Contact.module.scss";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import {useLocation} from "react-router";
import store from "../../store/store";
import {useFormik} from "formik";

type PropsType = {
    onClose: () => void,
    contactAction: any,
    mode: "create" | "edit"
    contactName?: string
    contactPhone?: string
}
const UpdateContact = (props: PropsType) => {
    const location = useLocation();
    const userId = Number(location.pathname.replaceAll(/[^0-9]/g, ''));
    const contactData = store.getState().AuthReducer.contactList.find(el => el.id === userId);

    const validate = (values: { contactName: string, contactPhone: string }) => {
        const errors = {} as Record<string, unknown>;

        if (!values.contactName.trim()) {
            errors.contactName = 'Required';
        }
        if (!values.contactPhone.trim) {
            errors.contactPhone = 'Required';
        } else if (values.contactPhone.length > 12 ||
            values.contactPhone.length < 10 ||
            !/^\d+$/.test(values.contactPhone)
        ) {
            errors.contactPhone = 'Invalid phone number';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            contactName: contactData?.contactName ? contactData.contactName : "",
            contactPhone: contactData?.contactPhone ? contactData.contactPhone : ""
        },
        validate,
        validateOnChange: false,
        validateOnBlur: true,
        onSubmit: () => {
            if (props.mode === "create") props.contactAction(formik.values.contactName, formik.values.contactPhone);
            else props.contactAction(userId, formik.values.contactName, formik.values.contactPhone);
            props.onClose();
        },
    });

    return (
        <form className={classes.createContactWrapper} onSubmit={formik.handleSubmit}>
            <Grid container
                  direction={"column"}
                  className={classes.contactContainer}>
                <Grid item className={classes.titleGridItem}>
                    <Typography variant={"h2"}
                                align={"center"}>{props.mode === "create" ? "New contact" : "Edit contact"}</Typography>
                </Grid>
                <Grid item className={classes.inputGridItem}>
                    <CustomInput placeholder={"Contact Name"}
                                 name={"contactName"}
                                 value={formik.values.contactName}
                                 error={Boolean(formik.errors.contactName) && formik.touched.contactName}
                                 helperText={formik.touched.contactName && formik.errors.contactName}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}/>
                </Grid>
                <Grid item className={classes.inputGridItem}>
                    <CustomInput placeholder={"Contact Phone"}
                                 name={"contactPhone"}
                                 value={formik.values.contactPhone}
                                 error={Boolean(formik.errors.contactPhone) && formik.touched.contactPhone}
                                 helperText={formik.touched.contactPhone && formik.errors.contactPhone}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}/>
                </Grid>
                <Grid item className={classes.buttonGridItem}>
                    <CustomButton type={"submit"}
                                  color={"primary"}
                                  width={"100%"}>
                        Save
                    </CustomButton>
                    <CustomButton type={"button"}
                                  variant={"outlined"}
                                  color={"secondary"}
                                  width={"100%"}
                                  textColor={"black"}
                                  onClick={props.onClose}>
                        Cancel
                    </CustomButton>
                </Grid>
            </Grid>
            <CloseIcon className={classes.closeIcon} onClick={props.onClose}/>
        </form>
    );
}

export default UpdateContact;