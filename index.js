import React, { useEffect, useState } from 'react'
import { compose } from 'recompose'
import { Container, Grid } from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux'
import { getCase, setPatientLanguage, fetchInitialChart, fetchSurveyNavigationByCaseId, getIsCircleTermsAccepted } from '../../../redux/actions'
import {
	existCaseSelector,
	caseIdSelector,
	referencesSelector,
	pathologySelector,
	protocolIdSelector,
	circleIdSelector,
	treatmentSelector,
	hidePatientResultsSelector,
	surveyNavigationSelector,
	isCircleTermsAcceptedSelector
} from '../../../redux/selectors'
import PatientPathology from './components/PatientPathology'
import PatientTreatment from './components/PatientTreatment'
import PatientCase from './components/CaseSummary'
import PatientUpdates from './components/PatientUpdates'
import SurveyResponse from './components/SurveyResponse'
import DashboardPanel from './components/DashboardPanel'
import * as cookies from '../../../utilties/cookies'
import locale2 from 'locale2'
import Header from '../../../components/Header'
import TopHeader from '../../../components/TopHeader'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import ExternalAuthHeader from '../../../components/ExternalAuthHeader';
import Button from '@material-ui/core/Button'
import Print from '@material-ui/icons/Print';
import { injectIntl } from 'react-intl'
import history from '../../../utilties/history';
import browserHistory from '../../../utilties/browserHistory'
import StyledWrapper from '../../../components/StyledWrapper';
import { shallowEqual } from 'react-redux';


const styles = {
	root: {},
}

const useStyles = makeStyles((theme) => ({

	mainWrapper: {
		display: 'grid',
		backgroundColor: '#ededf1',
		minHeight: '100vh',
		paddingTop: '84px',
		[theme.breakpoints.down('sm')]: {
			paddingTop: '61px',
			minHeight: 'unset'
		},
		position: 'relative',
		minWidth: '320px',
		overflowX: 'hidden',
		display: 'flex',
		[theme.breakpoints.up('lg')]: {
			minWidth: '1200px',
		},
	},
	mainHeaderWrapper: {
		height: '84px',
		backgroundColor: 'white',
		flexWrap: 'nowrap',
		borderBottom: '1px #171821 solid',
		[theme.breakpoints.down('sm')]: {
			height: '61px',
		},
	},
	mainContent: {
		position: 'relative',
		minHeight: 'calc(100vh - 84px)',
		[theme.breakpoints.down('sm')]: {
			minHeight: 'calc(100vh - 61px)',
			maxHeight: 'calc(100vh - 61px)',
		},
		maxHeight: 'calc(100vh - 84px)',
		overflowX: 'hidden',
		flexGrow: '100',
		minWidth: '320px',
		zIndex: '2',
		'WebkitOverflowScrolling': 'touch',
	},
	dashboardWrapperContainer: {
		paddingTop: '61px',		
	},
	dashboardWrapper: {
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column-reverse',
			flexWrap: 'nowrap'
		},
	}
}))


const Dashboard = ({
	setLanguage,
	loadCase,
	loadInitialChart,
	existCase,
	caseId,
	patientPathology,
	patientTreatment,
	circleId,
	protocolId,
	hidePatientResults,
	caseDetails,
	loadPatientUpdates,
	loadSurveyNavigation,
	surveyNavigation,
	intl
}) => {
	const classes = useStyles()
	const [patient] = useState(cookies.get('user'))
	const [hideSurveySwitcher, setHideSurveySwitcher] = useState(true)
	const dispatch = useDispatch()
	const isCircleTermsAccepted = useSelector(isCircleTermsAcceptedSelector, shallowEqual)

    useEffect(
		() => {
			loadCase(patient.id)

			if (circleId && caseId && protocolId) {
				loadInitialChart(circleId, caseId, protocolId, patient.languageId ? patient.languageId : 1)
				loadSurveyNavigation(caseId, patient.languageId ? patient.languageId : 1)
			}
		},
		[caseId]
	)

	useEffect(
		() => {
			if (
				!!surveyNavigation?.surveyInstanceId
				&& !!surveyNavigation?.surveyId
				&& !!surveyNavigation?.protocolId
				&& !surveyNavigation?.surveyIsCompleted
			)
			{
				setHideSurveySwitcher(false)
			}
			else {
				setHideSurveySwitcher(
					!surveyNavigation?.nextCaseId
					|| !surveyNavigation?.nextProtocolId
					|| !surveyNavigation?.nextSurveyInstanceId
					|| !surveyNavigation?.nextSurveyId
				)
			}
		},
		[surveyNavigation]
	)

	useEffect(
        () => {
			if (!!patient?.id && !!patient?.termsAccepted) {
				dispatch(getIsCircleTermsAccepted(patient.id))
			}
        },
        []
	)
	
	useEffect(
		() => {
			if (isCircleTermsAccepted == false) {
				history.push(`/newTerms?returnUrl=${browserHistory.location.pathname}`)
			}
		},
		[isCircleTermsAccepted]
	)

	const handleSkipClicked = () => {
		setHideSurveySwitcher(true)
	}
	
	return (
		<StyledWrapper
			onSkipSurveySwitcherClick={handleSkipClicked}
			hideSurveySwitcher={
				hideSurveySwitcher
				|| !surveyNavigation
			}
		>

			<div data-testid="data-dashboard">
				<Container maxWidth="lg">

					<Grid item>
						{
							caseDetails && caseDetails.isCovidCircle &&
							<Grid item xs={12} style={{ padding: '0 0 3rem 0' }}>
								<Button
									variant='contained'
                        			color='primary'
									onClick={() => {
										window.location.href = '/api/report/pdf';
									}}
								>
									<Grid container style={{ alignItems: 'flex-start', justifyContent: 'space-around', margin: '5px 5px 1px 5px' }}>
										<Grid item>
											<Print style={{ fontSize: '22px', marginRight: '5px' }} />
										</Grid>
										<Grid item>
											<span>{intl.formatMessage({ id: 'app.vaccination.certificate.button' })}</span>
										</Grid>
									</Grid>
								</Button>
							</Grid>
						}
					</Grid>
					<Grid container className={classes.dashboardWrapperContainer}>
						<Grid container spacing={3} direction='row' className={`${classes.dashboardWrapper} dashboard-wrapper`}>
							{
								//<Grid item xs={8} justify='space-between' alignItems='center'></Grid>
                            }

							{/* 
					{!hidePatientResults && <SurveyResponse data-testid="page-survey-response" showEmptyChart={patient.externalAuth} />}
					{patientTreatment && patientTreatment.name && (
						<Container maxWidth="lg" className={classes.containerLgStyle}>
							<PatientTreatment data-testid="page-survey-treatment" treatment={patientTreatment} />
						</Container>
					)}
					{patientPathology && patientPathology.name && (
						<Container maxWidth="lg" className={classes.containerLgStyle}>
							<PatientPathology data-testid="page-patient-pathology" pathology={patientPathology} />
						</Container>
					)} */}

							{/* Dashboard Panel at the top */}
							<Grid item xs={12} md={8} data-testid="dashboard-panel">
								<DashboardPanel/>
							</Grid>

							{existCase && (
								<Grid item xs={12} md={4} data-testid="page-patient-case">
									<PatientCase/>
								</Grid>
							)}

                            <Grid item xs={12} data-testid="page-patient-updates" >
								<PatientUpdates/>
                            </Grid>
							{/* {patientReferences && (
						<Grid item xs={12}>
							<PatientReference references={patientReferences} />
						</Grid>
					)} */}
						</Grid>
					</Grid>
				</Container>
			</div>
		</StyledWrapper>
	)
}

const mapStateToProps = (state) => ({
	existCase: existCaseSelector(state),
	caseId: caseIdSelector(state),
	protocolId: protocolIdSelector(state),
	circleId: circleIdSelector(state),
	patientReferences: referencesSelector(state),
	patientPathology: pathologySelector(state),
	patientTreatment: treatmentSelector(state),
	hidePatientResults: hidePatientResultsSelector(state),
	surveyNavigation: surveyNavigationSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
	loadCase: (patientId) => dispatch(getCase(patientId)),
	loadInitialChart: (circleId, caseId, protocolId, languageId) =>
		dispatch(fetchInitialChart(circleId, caseId, protocolId, languageId)),
	setLanguage: (patientId, languageId) => dispatch(setPatientLanguage(patientId, languageId)),
	loadSurveyNavigation: (
		caseId,
		languageId
	) => dispatch(
		fetchSurveyNavigationByCaseId(
			caseId,
			languageId
		)
	)
})

const enhance = compose(
	connect(mapStateToProps, mapDispatchToProps),
	withStyles(styles)
)

export default enhance(Dashboard)
