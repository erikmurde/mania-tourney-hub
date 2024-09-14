import { Edit } from '@mui/icons-material';
import { useState } from 'react';
import FormDialogBase from '../dialog/FormDialogBase';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import { IUserDto } from '../../../dto/user/IUserDto';
import TournamentFormView from './views/TournamentFormView';
import { tournamentSchema } from '../../../domain/tournamentSchema';
import { TournamentEdit } from '../../../domain/TournamentEdit';
import { TournamentService } from '../../../services/tournamentService';
import { ROLE_REG } from '../../../constants';
import { AuthService } from '../../../services/authService';

interface IProps {
    tourney: TournamentDto,
    user: IUserDto,
    updateTourney: () => void
}

const TournamentEditForm = ({tourney, user, updateTourney}: IProps) => {
    const [open, setOpen] = useState(false);

    const onSubmit = async(values: TournamentEdit) => {
        const {hostRoles, teamTourney, restrictRank, ...tourneyEdit} = values;

        if (!values.teamTourney) {
            tourneyEdit.minTeamSize = 1;
            tourneyEdit.maxTeamSize = 1;
        }
        if (!values.restrictRank) {
            tourneyEdit.minPlayerRank = 0;
            tourneyEdit.maxPlayerRank = 0;
        }
        await new TournamentService().edit(tourney.id, tourneyEdit);

        user.roles = user.roles.filter(role => role.tournamentId !== tourney.id);

        for (const role of values.hostRoles) {
            user.roles.push({
                tournamentId: tourney.id, 
                name: role, 
                canRegWithRole: ROLE_REG.get(role)!
            });
        }
        await new AuthService().edit(user.id, user);
        updateTourney();
        setOpen(false);
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
                            .filter(role => role.tournamentId === tourney.id)
                            .map(role => role.name)
                    }} 
                    validationSchema={tournamentSchema} 
                    onSubmit={onSubmit}/>
            }/>
    );
}

export default TournamentEditForm;