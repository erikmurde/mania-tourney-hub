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

interface IProps {
    tourney: TournamentDto,
    updateTourney: () => void
}

const TouramentPublishForm = ({tourney, updateTourney}: IProps) => {
    const [open, setOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    dayjs.extend(utc);

    const validationSchema: Schema = object({
        regOpen: boolean(),
        applicationOpen: boolean(),
        regDeadline: date()
            .when('regOpen', ([regOpen], schema) => {
                return regOpen 
                    ? schema.required(REQUIRED)
                    : schema.notRequired()
            })
            .typeError('Invalid date format')
            .min(dayjs.utc(), 'Must be in the future'),
        applicationDeadline: date()
            .when('applicationOpen', ([applicationOpen], schema) => {
                return applicationOpen 
                    ? schema.required(REQUIRED)
                    : schema.notRequired()
            })
            .typeError('Invalid date format')
            .min(dayjs.utc(), 'Must be in the future')
    });

    const onSubmit = async(values: TournamentDto) => {
        values.public = true;

        await new TournamentService().edit(tourney.id, values);
        setOpen(false);
        setSuccessOpen(true);
    }

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
                    initialValues={tourney}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}/>
            }/>
        <SuccessDialog 
            open={successOpen} 
            setOpen={setSuccessOpen} 
            onClose={updateTourney}
            title='The tournament has been successfully published.'/>
        </>
    );
}

export default TouramentPublishForm;