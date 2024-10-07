import { useContext, useState } from 'react';
import TournamentPublishFormView from './views/TournamentPublishFormView';
import { Publish } from '@mui/icons-material';
import FormDialogBase from '../dialog/FormDialogBase';
import { Schema, boolean, date, object } from 'yup';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FUTURE_DATE, INVALID_DATE, REQUIRED } from '../../../constants';
import { TournamentService } from '../../../services/tournamentService';
import SuccessDialog from '../dialog/SuccessDialog';
import { TournamentPublishDto } from '../../../dto/tournament/TournamentPublishDto';
import LoadingButton from '../../LoadingButton';
import { ErrorContext } from '../../../routes/Root';

interface IProps {
    tourney: TournamentDto,
    updateTourney: () => void
}

const TouramentPublishForm = ({tourney, updateTourney}: IProps) => {
    const { setError } = useContext(ErrorContext);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    dayjs.extend(utc);

    const onSubmit = async(values: TournamentPublishDto) => {
        const error = await new TournamentService().publish(tourney.id, values);

        if (error) {
            return setError(error);
        }
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
            .typeError(INVALID_DATE)
            .min(dayjs.utc(), FUTURE_DATE),
        applicationDeadline: date()
            .when('applicationsOpen', ([applicationsOpen], schema) => {
                return applicationsOpen 
                    ? schema.required(REQUIRED)
                    : schema.notRequired()
            })
            .typeError(INVALID_DATE)
            .min(dayjs.utc(), FUTURE_DATE)
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
            open={open}
            setOpen={setOpen}
            form={
                <TournamentPublishFormView
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async(values) => {
                        setLoading(true);
                        await onSubmit(values);
                        setLoading(false);
                }}/>
            }
            submitBtn={
                <LoadingButton loading={loading} type='submit' form='tourney-publish-form'
                    sx={{ width: 130 }}>
                    Make public
                </LoadingButton>
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