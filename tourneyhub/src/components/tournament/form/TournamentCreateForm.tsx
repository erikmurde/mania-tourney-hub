import { useContext, useState } from 'react';
import FormDialogBase from '../dialog/FormDialogBase';
import { AuthContext } from '../../../routes/Root';
import { TournamentEdit } from '../../../domain/TournamentEdit';
import { HOST, ROLE_REG } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { TournamentService } from '../../../services/tournamentService';
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
        id: '',
        name: '',
        code: '',
        description: '',
        banner: '',
        keyCount: 4,
        minTeamSize: 1,
        maxTeamSize: 1,
        minPlayerRank: 0,
        maxPlayerRank: 0,
        concluded: false,
        published: false,
        playersPublished: false,
        regsOpen: false,
        applicationsOpen: false,
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
        restrictRank: false
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
        const createdId = await new TournamentService().create(tourney);

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