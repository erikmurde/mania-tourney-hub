import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../routes/Root';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import { Grid } from '@mui/material';
import { Done, Lock } from '@mui/icons-material';
import { HOST } from '../../../constants';
import StaffApplicationForm from '../staff/form/StaffApplicationForm';
import { useParams } from 'react-router-dom';
import TournamentEditForm from '../form/TournamentEditForm';
import ConfirmationDialog from '../dialog/ConfirmationDialog';
import { AuthService } from '../../../services/authService';
import TournamentPublishForm from '../form/TournamentPublishForm';
import SuccessDialog from '../dialog/SuccessDialog';
import { TournamentService } from '../../../services/tournamentService';
import TeamRegisterForm from './form/TeamRegisterForm';
import LinkMenu from './LinkMenu';
import { UserDto } from '../../../dto/user/UserDto';

interface IProps {
    tourney: TournamentDto,
    updateTourney: () => void
}

const HeaderButtons = ({tourney, updateTourney}: IProps) => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const [successOpen, setSuccessOpen] = useState(false);
    const [canMakePrivate, setCanMakePrivate] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const authService = new AuthService();
    const tourneyService = new TournamentService();

    useEffect(() => {
        if (tourney.public && user) {
            authService
                .getPlayers(tourney.id)
                .then(players => {
                    setCanMakePrivate(players.length === 0);
                    setIsRegistered(players.some(player => player.id === user.id));
                })
        }
    }, [tourney, user]);

    const registerPlayer = async() => {
        if (!user) {
            return;
        }
        user.roles.push({
            tournamentId: tourney.id, 
            name: 'player', 
            canRegWithRole: false
        });
        user.stats.push({
            tournamentId: tourney.id,
            status: 'registered',
            seed: 0,
            placement: 0
        });
        await authService.edit(user.id, user);
        setSuccessOpen(true);
    }

    const onPrivate = async() => {
        tourney.public = false;
        tourney.regOpen = false;
        tourney.applicationOpen = false;

        await tourneyService.edit(tourney.id, tourney);
        updateTourney();
    }

    const onConclude = async() => {
        tourney.done = true;

        await tourneyService.edit(tourney.id, tourney);
        updateTourney();
    }

    const getRoles = (user: UserDto) => user.roles.filter(role => role.tournamentId === id);

    const canRegister = (user: UserDto) => {
        const validUser = tourneyService.isValidUser(user, tourney);
        const validRoles = getRoles(user).every(role => role.canRegWithRole);

        return !isRegistered && validUser && validRoles;
    };
    
    const isHost = user && getRoles(user).some(role => role.name === HOST);

    return (
        <>
        <Grid container columnSpacing={1} height={56} justifyContent='center'>
            {user && canRegister(user) &&
            <Grid item>
                {tourney.minTeamSize > 1
                ?   <TeamRegisterForm 
                        user={user} 
                        tourney={tourney} 
                        openSuccess={() => {
                            setSuccessOpen(true);
                            updateTourney();
                    }}/>
                :   <ConfirmationDialog 
                        title='Are you sure you wish to register?'
                        description={tourney.regMessage}
                        actionTitle='Register' 
                        action={registerPlayer}
                        btnProps={{ 
                            disabled: !tourney.regOpen, 
                            title: tourney.regOpen ? 'Register' : 'Registrations closed' 
                    }}/>}
            </Grid>}
            {!isHost &&
            <Grid item>
                <StaffApplicationForm
                    applicationOpen={tourney.applicationOpen} 
                    tourneyName={tourney.name}
                />
            </Grid>}
            {isHost && !tourney.done &&
            <Grid item>
                <TournamentEditForm tourney={tourney} user={user} updateTourney={updateTourney}/>
            </Grid>}
            {isHost && !tourney.public &&
            <Grid item>
                <TournamentPublishForm tourney={tourney} updateTourney={updateTourney}/>
            </Grid>}
            {isHost && tourney.public && canMakePrivate &&
            <Grid item>
                <ConfirmationDialog 
                    title='Are you sure you wish to make this tournament private?'
                    description='The tournament can be made public again at any time.'
                    actionTitle='Make private' 
                    action={onPrivate}
                    btnProps={{ startIcon: <Lock/>, title: 'Make private' }}/>
            </Grid>}
            {isHost && !tourney.done && tourney.public &&
            <Grid item>
                <ConfirmationDialog 
                    title='Are you sure you wish to conclude this tournament?'
                    description='This will archive the tournament and remove any ability to edit it. This action cannot be undone!'
                    actionTitle='Conclude' 
                    action={onConclude}
                    btnProps={{ title: 'Conclude', startIcon: <Done/> }}/>
            </Grid>}
            <LinkMenu links={tourney.links}/>
        </Grid>
        <SuccessDialog 
            open={successOpen} 
            setOpen={setSuccessOpen} 
            title='You have been successfully registered.'/>
        </>
    );
}

export default HeaderButtons;