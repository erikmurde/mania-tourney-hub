import { useContext, useState } from 'react';
import { AuthContext } from '../../../routes/Root';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import { Button, Dialog, DialogTitle, Grid } from '@mui/material';
import { Done, KeyboardArrowDown, Publish } from '@mui/icons-material';
import { HOST } from '../../../constants';
import StaffApplicationForm from '../staff/form/StaffApplicationForm';
import { useParams } from 'react-router-dom';
import TournamentEditForm from '../form/TournamentEditForm';
import ConfirmationDialog from '../dialog/ConfirmationDialog';
import { StyledDialogActions } from '../../styled/StyledDialogActions';
import { AuthService } from '../../../services/authService';

interface IProps {
    tourney: TournamentDto,
    updateTourney: () => void
}

const HeaderButtons = ({tourney, updateTourney}: IProps) => {
    const [successOpen, setSuccessOpen] = useState(false);
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const roles = user ? user.roles.filter(role => role.tournamentId === id) : [];
    const isHost = user && roles.some(role => role.tournamentId === id && role.name === HOST);

    const onRegister = async() => {
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
        await new AuthService().edit(user.id, user);
        setSuccessOpen(true);
    }

    return (
        <>
        <Grid container columnSpacing={1} height={56} justifyContent='center'>
            {roles.every(role => role.canRegWithRole) &&
            <Grid item>
                <ConfirmationDialog 
                    title='Are you sure you wish to register?'
                    description={tourney.regMessage}
                    actionTitle='Register' 
                    action={onRegister}
                    btnProps={{ 
                        disabled: !tourney.regOpen, 
                        title: tourney.regOpen ? 'Register' : 'Registrations closed' 
                    }}/>
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
                <Button variant='contained' startIcon={<Publish/>}>
                    Publish
                </Button>
            </Grid>}
            {isHost && !tourney.done && tourney.public &&
            <Grid item>
                <Button variant='contained' startIcon={<Done/>}>
                    Conclude
                </Button>
            </Grid>}
            <Grid item>
                <Button variant='contained' endIcon={<KeyboardArrowDown/>}>
                    Links
                </Button>
            </Grid>
        </Grid>
        <Dialog open={successOpen} onClose={() => setSuccessOpen(false)}>
            <DialogTitle>
                You have been successfully registered.
            </DialogTitle>
            <StyledDialogActions>
                <Button variant='contained' onClick={() => setSuccessOpen(false)}>
                    Close
                </Button>
            </StyledDialogActions>
        </Dialog>
        </>
    );
}

export default HeaderButtons;