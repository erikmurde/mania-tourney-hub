import { useContext, useState } from 'react';
import FormDialogBase from '../dialog/FormDialogBase';
import { AuthContext, ErrorContext } from '../../../routes/Root';
import { TournamentEdit } from '../../../domain/TournamentEdit';
import { HOST, ROLE_REG } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { TournamentService } from '../../../services/tournamentService';
import TournamentFormView from './views/TournamentFormView';
import { tournamentSchema } from '../../../domain/validation/tournamentSchema';
import LoadingButton from '../../LoadingButton';

const TournamentCreateForm = () => {
    const { setError } = useContext(ErrorContext);
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const service = new TournamentService();
    const navigate = useNavigate();

    if (!user) {
        return <></>;
    }

    const initialValues: TournamentEdit = {
        name: '',
        code: '',
        description: '',
        banner: '',
        keyCount: 4,
        minTeamSize: 1,
        maxTeamSize: 1,
        minPlayerRank: 0,
        maxPlayerRank: 0,
        protects: false,
        warmups: false,
        regDeadline: null,
        applicationDeadline: null,
        links: [],
        countries: [],
        information: '',
        regMessage: '',
        hostRoles: [HOST],
        teamTourney: false,
        restrictRank: false,
        published: false
    };

    const onSubmit = async(values: TournamentEdit) => {  
        const {teamTourney, restrictRank, ...tourney} = values;

        if (!values.teamTourney) {
            tourney.minTeamSize = 1;
            tourney.maxTeamSize = 1;
        }
        if (!values.restrictRank) {
            tourney.minPlayerRank = 0;
            tourney.maxPlayerRank = 0;
        }
        const createdId = await service.create(tourney);

        if (service.isErrorResponse(createdId)) {
            return setError(createdId);
        }
        updatePlayerRoles(tourney.hostRoles, tourney.name, createdId);
        navigate(`/tournaments/${createdId}/information`);
    }

    const updatePlayerRoles = (roles: string[], tourneyName: string, tourneyId: string) => {
        roles.forEach(role => user.roles.push({
            role: role,
            tournament: tourneyName,
            tournamentId: tourneyId,
            canRegWithRole: ROLE_REG.get(role)!,
            concluded: false
        }));
    }

    return (  
        <FormDialogBase
            btnProps={{ 
                title: 'Create new tournament', 
                sx: { boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }
            }}
            size='md'
            title='Create a new tournament'
            open={open}
            setOpen={setOpen}
            form={
                <TournamentFormView
                    initialValues={initialValues}
                    validationSchema={tournamentSchema}
                    onSubmit={async(values) => {
                        setLoading(true);
                        await onSubmit(values);
                        setLoading(false);
                }}/>
            }
            submitBtn={
                <LoadingButton loading={loading} type='submit' form='tourney-form'
                    sx={{ width: 100 }}>
                    Create
                </LoadingButton>
            }/>
    );
}

export default TournamentCreateForm;