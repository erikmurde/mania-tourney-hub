import { useContext } from 'react';
import { AuthContext } from '../../../routes/Root';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import { Button, Grid } from '@mui/material';
import { Done, KeyboardArrowDown, Publish } from '@mui/icons-material';
import { HOST } from '../../../constants';
import StaffApplicationForm from '../staff/form/StaffApplicationForm';
import { useParams } from 'react-router-dom';
import TournamentEditForm from '../form/TournamentEditForm';

interface IProps {
    tourney: TournamentDto,
    updateTourney: () => void
}

const HeaderButtons = ({tourney, updateTourney}: IProps) => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const roles = user ? user.roles : [];
    const isHost = user && roles.some(role => role.tournamentId === id && role.name === HOST);

    return (  
        <Grid container columnSpacing={1} height={56} justifyContent='center'>
            {roles.every(role => role.canRegWithRole) &&
            <Grid item>
                <Button variant='contained' disabled={!tourney.regOpen}>
                    {tourney.regOpen ? 'register' : 'registrations closed'}
                </Button>
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
    );
}

export default HeaderButtons;