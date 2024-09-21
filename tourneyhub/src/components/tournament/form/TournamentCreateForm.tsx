import { useContext, useState } from 'react';
import FormDialogBase from '../dialog/FormDialogBase';
import { AuthContext } from '../../../routes/Root';
import { TournamentEdit } from '../../../domain/TournamentEdit';
import { HOST, ROLE_REG } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { TournamentService } from '../../../services/tournamentService';
import { Value } from 'react-quill';
import { AuthService } from '../../../services/authService';
import TournamentFormView from './views/TournamentFormView';
import { tournamentSchema } from '../../../domain/validation/tournamentSchema';

const TournamentCreateForm = () => {
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    if (!user) {
        return <></>;
    }

    const initialValues: TournamentEdit = {
        id: 0,
        name: '',
        code: '',
        description: '',
        banner: '',
        public: false,
        participantsPublic: false,
        done: false,
        keys: 4,
        minTeamSize: 1,
        maxTeamSize: 1,
        minPlayerRank: 0,
        maxPlayerRank: 0,
        protects: false,
        warmups: false,
        regOpen: false,
        applicationOpen: false,
        regDeadline: null,
        applicationDeadline: null,
        links: [],
        countries: [],
        information: {} as Value,
        regMessage: '',
        hostRoles: [HOST],
        teamTourney: false,
        restrictRank: false
    };

    const onSubmit = async(values: TournamentEdit) => {  
        const {hostRoles, teamTourney, restrictRank, ...tourney} = values;

        if (!values.teamTourney) {
            tourney.minTeamSize = 1;
            tourney.maxTeamSize = 1;
        }
        if (!values.restrictRank) {
            tourney.minPlayerRank = 0;
            tourney.maxPlayerRank = 0;
        }
        const created = await new TournamentService().create(tourney);

        for (const role of values.hostRoles) {
            user.roles.push({
                tournamentId: created.id, 
                name: role, 
                canRegWithRole: ROLE_REG.get(role)!
            });
        }
        await new AuthService().edit(user.id, user);
        navigate(`/tournaments/${created.id}/information`);
    }

    return (  
        <FormDialogBase
            btnProps={{ 
                title: 'Create new tournament', 
                sx: { boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }
            }}
            size='md'
            title='Create a new tournament' 
            formName='tourney-form'
            submitActionName='Create'
            open={open}
            setOpen={setOpen}
            form={
                <TournamentFormView
                    initialValues={initialValues}
                    validationSchema={tournamentSchema}
                    onSubmit={onSubmit}/>
            }/>
    );
}

export default TournamentCreateForm;