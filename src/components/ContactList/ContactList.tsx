import {Dialog, Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import classes from "./ContactList.module.scss";
import CustomButton from "../CustomButton/CustomButton";
import ContactItem from "../ContactItem/ContactItem";
import {PropsFromRedux} from "./ContactListContainer";
import {useHistory, useLocation} from "react-router";
import UpdateContact from "../CreateContact/UpdateContact";

const ContactList: React.FC<PropsFromRedux> = (props) => {
    const history = useHistory();
    const location = useLocation();
    const [dialogueToOpen, setDialogueToOpen] = useState("");
    const Contacts = [...props.contactList].map((el) => {
            return (
                <Grid key={el.id} item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.productItem}>
                    <ContactItem contactId={el.id} contactName={el.contactName} imageId={el.contactImageId}
                                 contactPhone={el.contactPhone}/>
                </Grid>
            );
        }
    );

    const downloadCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,Name, Phone\n"
            + [...props.contactList].map(e => e.contactName + ", " + e.contactPhone).join("\n");
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "contacts.csv");
        document.body.appendChild(link);
        link.click();
    }

    useEffect(() => {
        switch (location.pathname.substring(location.pathname.lastIndexOf('/') + 1)) {
            case "new":
                setDialogueToOpen("new")
                break;
            case "edit":
                setDialogueToOpen("edit")
                break;
            default:
                setDialogueToOpen("");
                break;
        }
    }, [location])
    return (
        <Grid container direction={"column"} className={classes.contactListWrapper}>
            <Grid item container direction={"column"}>
                <Grid item className={classes.headerTitleGridItem}>
                    <Typography variant={"h2"} noWrap className={classes.userName}>Hello, {props.userName}</Typography>
                    <CustomButton type={"button"}
                                  variant={"text"}
                                  textColor={"black"}
                                  onClick={() => {
                                      history.push("/login");
                                      props.signOut()
                                  }}>
                        <Typography variant={"h2"}>Logout</Typography>
                    </CustomButton>
                </Grid>
                <Grid item className={classes.headerButtonsGridItem}>
                    <CustomButton type={"button"}
                                  color={"secondary"}
                                  width={"240px"}
                                  onClick={() => history.push("/new")}>New Contact</CustomButton>
                    <CustomButton type={"button"}
                                  color={"secondary"}
                                  width={"240px"}
                                  onClick={downloadCSV}>Download CSV</CustomButton>
                </Grid>
            </Grid>
            <Grid item container spacing={4} className={classes.contactsGridContainer}>
                {Contacts}
            </Grid>
            <Dialog open={dialogueToOpen === "new"} fullScreen PaperProps={{}}>
                <UpdateContact onClose={() => history.push("/")}
                               contactAction={props.createNewContact}
                               mode={"create"}/>
            </Dialog>
            <Dialog open={dialogueToOpen === "edit"} fullScreen PaperProps={{}}>
                <UpdateContact onClose={() => history.push("/")}
                               contactAction={props.updateContact}
                               mode={"edit"}/>
            </Dialog>
        </Grid>
    );
}

export default ContactList;