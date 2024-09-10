import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../routes/Root';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import { Button, Grid } from '@mui/material';
import { Done, KeyboardArrowDown, Lock } from '@mui/icons-material';
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

interface IProps {
    tourney: TournamentDto,
    updateTourney: () => void
}

const HeaderButtons = ({tourney, updateTourney}: IProps) => {
    const [successOpen, setSuccessOpen] = useState(false);
    const [canMakePrivate, setCanMakePrivate] = useState(false);
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const authService = new AuthService();
    const tourneyService = new TournamentService();

    useEffect(() => {
        if (tourney.public) {
            authService
                .getPlayers(tourney.id)
                .then(players => setCanMakePrivate(players.length === 0))
        }
    }, [tourney.public]);

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
            seeding: 0,
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
    
    const roles = user ? user.roles.filter(role => role.tournamentId === id) : [];
    const isHost = user && roles.some(role => role.tournamentId === id && role.name === HOST);

    return (
        <>
        <Grid container columnSpacing={1} height={56} justifyContent='center'>
            {roles.every(role => role.canRegWithRole) &&
            <Grid item>
                {tourney.minTeamSize > 1 
                ?   <TeamRegisterForm/>
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
            {tourney.public && canMakePrivate &&
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
            <Grid item>
                <Button variant='contained' endIcon={<KeyboardArrowDown/>}>
                    Links
                </Button>
            </Grid>
        </Grid>
        <SuccessDialog 
            open={successOpen} 
            setOpen={setSuccessOpen} 
            title='You have been successfully registered.'/>
        </>
    );
}

export default HeaderButtons;