import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Assignees from '../Assignees';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { getDateDiff } from './utils';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

//hooks
import { useDispatch, useSelector } from 'react-redux'

//icons
import RestoreIcon from '@material-ui/icons/Restore';
import TimerIcon from '@material-ui/icons/Timer';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import HelpIcon from '@material-ui/icons/Help';
import EditIcon from '@material-ui/icons/Edit';

import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

//actions
import { showModal } from '../../../modals/state/modal.actions'

const styles = (theme) => ({
    card: {
        minWidth: 275,
        boxShadow: "none",
        padding: 20
    },
    button: {
        marginTop: theme.spacing.unit,
    },
    divider: {
        marginTop: theme.spacing.unit * 4
    },
    topDivider: {
        marginTop: theme.spacing.unit
    },
    actionButtonIcon: {
        marginRight: theme.spacing.unit * 2
    }
});

const getLastActionTime = (events) => {

    if (events.length === 0) {
        return "No action taken yet";
    }

    return getDateDiff(events[0].createdDate);
}


const EventActions = (props) => {

    const { classes, getUsers,
        setIncidentAssignee, users } = props;

    var hourlyResponseTimes = []
    for (var i = 1; i < 24; i++) {
        hourlyResponseTimes.push(i);
    }

    const dispatch = useDispatch()
    const activeIncident = useSelector(state => state.sharedReducer.activeIncident.data);

    if (!activeIncident) {
        return null
    }

    return (
        <div className={classes.card}>

            <Divider variant="middle" className={classes.topDivider} />


            <Typography variant="h6" style={{ marginTop: "20px" }}>
                Assignee
            </Typography>
            <Assignees
                assignees={activeIncident.assignees}
                id={activeIncident.id}
                getUsers={getUsers}
                setIncidentAssignee={setIncidentAssignee}
                users={users}
            />


            <List className={classes.root}>
                <ListItem>
                    <Avatar>
                        <RestoreIcon />
                    </Avatar>
                    <ListItemText primary="Time Since last action" secondary={getLastActionTime(props.events)} />
                </ListItem>
                <ListItem>
                    <Avatar>
                        <TimerIcon />
                    </Avatar>
                    <ListItemText primary="Required response time" secondary={activeIncident.response_time + " hours.1 hour(s) remaining.\n Ends at 5.30 p.m."} />

                    <ListItemSecondaryAction>
                        <IconButton aria-label="Edit" onClick={() => { dispatch(showModal('RESPOSE_TIME_EDIT', { activeIncident })) }}>
                            <EditIcon />
                        </IconButton>
                    </ListItemSecondaryAction>

                </ListItem>
                <ListItem>
                    <Avatar>
                        <ShowChartIcon />
                    </Avatar>
                    <ListItemText primary="Status" secondary={activeIncident.currentStatus} />
                </ListItem>
            </List>


            <Divider variant="middle" className={classes.divider} />


            <Button color="primary" size="large" variant='text' className={classes.button} onClick={props.escallateIncident}>
                <ArrowUpwardIcon className={classes.actionButtonIcon} />
                Escalate
            </Button>
            <Button color="primary" size="large" variant='text' className={classes.button}>
                <SubdirectoryArrowLeftIcon className={classes.actionButtonIcon} />
                Escalate to outside
            </Button>
            <Button color="primary" size="large" variant='text' className={classes.button}>
                <HelpIcon className={classes.actionButtonIcon} />
                Request for advice
            </Button>


        </div>
    );
}

EventActions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventActions);
