import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Paper, 
    Typography, 
    Grid, 
    Card, 
    CardContent, 
    Box,
    Avatar 
} from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FitnessIcon from '@material-ui/icons/FitnessCenter';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const useStyles = makeStyles((theme) => ({
    dashboardPanel: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    titleContainer: {
        marginBottom: theme.spacing(3),
    },
    title: {
        fontSize: '24px',
        fontWeight: 600,
        color: 'black',
        marginBottom: theme.spacing(1),
    },
    titleUnderline: {
        width: '48px',
        height: '4px',
        backgroundColor: '#2563eb',
    },
    metricCard: {
        padding: theme.spacing(2),
        border: '1px solid #e5e7eb',
        boxShadow: 'none',
    },
    metricHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1.5),
        marginBottom: theme.spacing(1),
    },
    avatar: {
        width: 40,
        height: 40,
    },
    avatarBlue: {
        backgroundColor: '#dbeafe',
        color: '#2563eb',
    },
    avatarPurple: {
        backgroundColor: '#f3e8ff',
        color: '#9333ea',
    },
    avatarGreen: {
        backgroundColor: '#dcfce7',
        color: '#16a34a',
    },
    avatarOrange: {
        backgroundColor: '#fed7aa',
        color: '#ea580c',
    },
    metricLabel: {
        color: '#6b7280',
        fontSize: '14px',
    },
    metricValue: {
        color: 'black',
        fontSize: '16px',
        fontWeight: 500,
    },
    metricSubtext: {
        fontSize: '12px',
        color: '#6b7280',
    },
    positiveChange: {
        fontSize: '12px',
        color: '#16a34a',
    },
}));

const DashboardPanel = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.dashboardPanel}>
            <div className={classes.titleContainer}>
                <Typography className={classes.title}>
                    Progress Dashboard
                </Typography>
                <div className={classes.titleUnderline}></div>
            </div>

            <Grid container spacing={2}>
                {/* KOOS, JR Score Card */}
                <Grid item xs={12} sm={6}>
                    <Card className={classes.metricCard}>
                        <CardContent>
                            <div className={classes.metricHeader}>
                                <Avatar className={`${classes.avatar} ${classes.avatarBlue}`}>
                                    <TrendingUpIcon />
                                </Avatar>
                                <div>
                                    <Typography className={classes.metricLabel}>
                                        KOOS, JR Score
                                    </Typography>
                                    <Typography className={classes.metricValue}>
                                        92.9
                                    </Typography>
                                </div>
                            </div>
                            <Typography className={classes.positiveChange}>
                                +0.5 from last check-in
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Days Post-Op Card */}
                <Grid item xs={12} sm={6}>
                    <Card className={classes.metricCard}>
                        <CardContent>
                            <div className={classes.metricHeader}>
                                <Avatar className={`${classes.avatar} ${classes.avatarPurple}`}>
                                    <CalendarTodayIcon />
                                </Avatar>
                                <div>
                                    <Typography className={classes.metricLabel}>
                                        Days Post-Op
                                    </Typography>
                                    <Typography className={classes.metricValue}>
                                        58 days
                                    </Typography>
                                </div>
                            </div>
                            <Typography className={classes.metricSubtext}>
                                Since October 20, 2025
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Impact Card */}
                <Grid item xs={12} sm={6}>
                    <Card className={classes.metricCard}>
                        <CardContent>
                            <div className={classes.metricHeader}>
                                <Avatar className={`${classes.avatar} ${classes.avatarGreen}`}>
                                    <FitnessIcon />
                                </Avatar>
                                <div>
                                    <Typography className={classes.metricLabel}>
                                        Impact Level
                                    </Typography>
                                    <Typography className={classes.metricValue}>
                                        High
                                    </Typography>
                                </div>
                            </div>
                            <Typography className={classes.metricSubtext}>
                                This case has helped over 500 patients in total!
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Surveys Completed Card */}
                <Grid item xs={12} sm={6}>
                    <Card className={classes.metricCard}>
                        <CardContent>
                            <div className={classes.metricHeader}>
                                <Avatar className={`${classes.avatar} ${classes.avatarOrange}`}>
                                    <RadioButtonCheckedIcon />
                                </Avatar>
                                <div>
                                    <Typography className={classes.metricLabel}>
                                        Questionaires Completed
                                    </Typography>
                                    <Typography className={classes.metricValue}>
                                        4/13
                                    </Typography>
                                </div>
                            </div>
                            <Typography className={classes.metricSubtext}>
                                31% completion rate
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DashboardPanel;