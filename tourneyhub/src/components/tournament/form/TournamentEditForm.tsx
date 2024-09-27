import { Edit } from '@mui/icons-material';
import { useState } from 'react';
import FormDialogBase from '../dialog/FormDialogBase';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import { UserDto } from '../../../dto/user/UserDto';
import TournamentFormView from './views/TournamentFormView';
import { tournamentSchema } from '../../../domain/validation/tournamentSchema';
import { TournamentEdit } from '../../../domain/TournamentEdit';
import { TournamentService } from '../../../services/tournamentService';
import { ROLE_REG } from '../../../constants';

interface IProps {
    tourney: TournamentDto,
    user: UserDto,
    updateTourney: () => void
}

const TournamentEditForm = ({tourney, user, updateTourney}: IProps) => {
    const [open, setOpen] = useState(false);

    const onSubmit = async(values: TournamentEdit) => {
        const {teamTourney, restrictRank, ...tourneyEdit} = values;

        if (!values.teamTourney) {
            tourneyEdit.minTeamSize = 1;
            tourneyEdit.maxTeamSize = 1;
        }
        if (!values.restrictRank) {
            tourneyEdit.minPlayerRank = 0;
            tourneyEdit.maxPlayerRank = 0;
        }
        console.log(tourneyEdit);

        await new TournamentService().edit(tourney.id, tourneyEdit);

        updatePlayerRoles(tourneyEdit.hostRoles);
        updateTourney();
        setOpen(false);
    }

    
    const updatePlayerRoles = (roles: string[]) => {
        user.roles = [];

        roles.forEach(role => user.roles.push({
            role: role,
            tournament: tourney.name,
            tournamentId: tourney.id,
            canRegWithRole: ROLE_REG.get(role)!,
            concluded: false
        }));
    }

    return (  
        <FormDialogBase
            btnProps={{ title: 'Edit', startIcon: <Edit/> }}
            size='md'
            title='Edit tournament' 
            formName='tourney-form'
            submitActionName='Edit'
            open={open}
            setOpen={setOpen}
            form={
                <TournamentFormView
                    initialValues={{
                        ...tourney,
                        teamTourney: tourney.minTeamSize > 1,
                        restrictRank: tourney.minPlayerRank > 0,
                        hostRoles: user.roles
                            .filter(tourneyRole => tourneyRole.tournamentId === tourney.id)
                            .map(tourneyRole => tourneyRole.role)
                    }} 
                    validationSchema={tournamentSchema} 
                    onSubmit={onSubmit}/>
            }/>
    );
}

export default TournamentEditForm;