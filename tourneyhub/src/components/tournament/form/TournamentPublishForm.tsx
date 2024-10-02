import { useState } from 'react';
import TournamentPublishFormView from './views/TournamentPublishFormView';
import { Publish } from '@mui/icons-material';
import FormDialogBase from '../dialog/FormDialogBase';
import { Schema, boolean, date, object } from 'yup';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { REQUIRED } from '../../../constants';
import { TournamentService } from '../../../services/tournamentService';
import SuccessDialog from '../dialog/SuccessDialog';
import { TournamentPublishDto } from '../../../dto/tournament/TournamentPublishDto';

interface IProps {
    tourney: TournamentDto,
    updateTourney: () => void
}

const TouramentPublishForm = ({tourney, updateTourney}: IProps) => {
    const [open, setOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    dayjs.extend(utc);

    const onSubmit = async(values: TournamentPublishDto) => {
        await new TournamentService().publish(tourney.id, values);
        setOpen(false);
        setSuccessOpen(true);
    }

    const initialValues: TournamentPublishDto = {
        regsOpen: false,
        applicationsOpen: false,
        regDeadline: tourney.regDeadline,
        applicationDeadline: tourney.applicationDeadline
    };

    const validationSchema: Schema = object({
        regwOpen: boolean(),
        applicationsOpen: boolean(),
        regDeadline: date()
            .when('regsOpen', ([regsOpen], schema) => {
                return regsOpen 
                    ? schema.required(REQUIRED)
                    : schema.notRequired()
            })
            .typeError('Invalid date format')
            .min(dayjs.utc(), 'Must be in the future'),
        applicationDeadline: date()
            .when('applicationsOpen', ([applicationsOpen], schema) => {
                return applicationsOpen 
                    ? schema.required(REQUIRED)
                    : schema.notRequired()
            })
            .typeError('Invalid date format')
            .min(dayjs.utc(), 'Must be in the future')
    });

    return (  
        <>
        <FormDialogBase
            btnProps={{ title: 'Make public', startIcon: <Publish/> }}
            title='Make tournament public'
            description={`
                Making the tournament public will limit available editing options and make it visible to everyone. 
                The tournament can be made private again as long as no players have registered.
                Mappools, schedules and ${tourney.minTeamSize > 1 ? 'teams' : 'players'} will retain their current visibility.
            `}
            formName='tourney-publish-form'
            submitActionName='Make public'
            open={open}
            setOpen={setOpen}
            form={
                <TournamentPublishFormView
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}/>
            }/>
        <SuccessDialog 
            open={successOpen} 
            setOpen={setSuccessOpen} 
            onClose={updateTourney}
            title='The tournament has been successfully published!'/>
        </>
    );
}

export default TouramentPublishForm;