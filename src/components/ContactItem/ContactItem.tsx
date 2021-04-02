import {Box, Typography} from "@material-ui/core";
import classes from "./ContactItem.module.scss"
import React from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import CustomButton from "../CustomButton/CustomButton";
import EditIcon from "@material-ui/icons/Edit";
import {useHistory} from "react-router";

type PropsType = {
    contactName: string
    imageId: number
    contactId: number
    contactPhone: string
}

const ContactItem = (props: PropsType) => {
    const history = useHistory();
    const callToNumber = () => {
        let link = document.createElement("a");
        link.setAttribute("href", "tel:" + props.contactPhone);
        link.click();
    }
    return <Box className={classes.contactItemBox}>
        <img className={classes.avatarImage}
             src={`https://picsum.photos/id/${props.imageId}/360/360`}
             alt={"avatar"}/>
        <Typography variant={"body1"} noWrap className={classes.contactName}>{props.contactName}</Typography>
        <CustomButton type={"button"}
                      color={"primary"}
                      width={"100%"}
                      className={classes.callButton}
                      onClick={callToNumber}>
            <PhoneIcon className={classes.phoneIcon}/>
            <Typography variant={"button"} className={classes.phoneNumber}>{props.contactPhone}</Typography>
        </CustomButton>
        <EditIcon className={classes.editIcon} onClick={() => history.push(`/${props.contactId}/edit`)}/>
    </Box>
}

export default ContactItem