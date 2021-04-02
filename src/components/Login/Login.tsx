import React from "react"
import {Grid, Typography} from "@material-ui/core";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import classes from "./Login.module.scss"
import {useFormik} from "formik";
import {PropsFromRedux} from "./LoginContainer";

const Login: React.FC<PropsFromRedux> = (props) => {

    const validate = (values: { userName: string }) => {
        const errors = {} as Record<string, unknown>;

        if (!values.userName.trim()) {
            errors.userName = 'Required';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            userName: ""
        },
        validate,
        validateOnChange: false,
        validateOnBlur: true,
        onSubmit: () => {
            props.getAuth(formik.values.userName.trim())
        },
    });

    return (
        <form className={classes.loginWrapper} onSubmit={formik.handleSubmit}>
            <Grid container
                  direction={"column"}
                  className={classes.loginContainer}>
                <Grid item className={classes.titleGridItem}>
                    <Typography variant={"h2"} align={"center"}>Login</Typography>
                </Grid>
                <Grid item className={classes.inputGridItem}>
                    <CustomInput placeholder={"What is your name?"}
                                 name={"userName"}
                                 value={formik.values.userName}
                                 error={Boolean(formik.errors.userName) && formik.touched.userName}
                                 helperText={formik.touched.userName && formik.errors.userName}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}/>
                </Grid>
                <Grid item className={classes.buttonGridItem}>
                    <CustomButton type={"submit"}
                                  color={"primary"}
                                  width={"100%"}>
                        Login
                    </CustomButton>
                </Grid>
            </Grid>
        </form>
    );
}

export default Login;