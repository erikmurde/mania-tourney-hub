import { useContext } from 'react';
import { AuthContext } from '../../../routes/Root';
import { ITournamentDto } from '../../../dto/tournament/ITournamentDto';
import { Button, Grid } from '@mui/material';
import { Done, Edit, KeyboardArrowDown, Publish } from '@mui/icons-material';
import { HOST } from '../../../constants';

const HeaderButtons = (props: {tourney: ITournamentDto}) => {
    const { user } = useContext(AuthContext);

    const roles = user?.roles ?? [];
    const isHost = roles.filter(role => role.name === HOST).length > 0;

    return (  
        <Grid container columnSpacing={1} height={56} justifyContent='center'>
            {roles.every(role => role.canRegWithRole)
            ?   <Grid item>
                    <Button variant='contained' disabled={!props.tourney.regOpen}>
                        {props.tourney.regOpen ? 'register' : 'registrations closed'}
                    </Button>
                </Grid>
            :   <></>}
            {!isHost
            ?   <Grid item>
                    <Button variant='contained' disabled={!props.tourney.applicationOpen}>
                        {props.tourney.applicationOpen ? 'apply for staff' : 'applications closed'}
                    </Button>
                </Grid>
            :   <></>}
            {isHost && !props.tourney.done
            ?   <Grid item>
                    <Button variant='contained' startIcon={<Edit/>}>
                        Edit
                    </Button>
                </Grid>
            :   <></>}
            {isHost && !props.tourney.public 
            ?   <Grid item>
                    <Button variant='contained' startIcon={<Publish/>}>
                        Publish
                    </Button>
                </Grid>
            :   <></>}
            {isHost && !props.tourney.done && props.tourney.public
            ?   <Grid item>
                    <Button variant='contained' startIcon={<Done/>}>
                        Conclude
                    </Button>
                </Grid>
            :   <></>}
            <Grid item>
                <Button variant='contained' endIcon={<KeyboardArrowDown/>}>
                    Links
                </Button>
            </Grid>
        </Grid>
    );
}

export default HeaderButtons;