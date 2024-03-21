import { Paper, Typography, Grid } from '@mui/material';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import TournamentCard from './TournamentCard';

interface IProps {
    name: string,
    tourneys: TournamentDto[]
}

const TournamentBlock = ({name, tourneys}: IProps) => {
    return (  
        <Paper elevation={2} sx={{ paddingLeft: 5, paddingBottom: 2 }}>
            <Typography variant='h3' fontSize={36} height={80} lineHeight={2}>
                {name}
            </Typography>
            <Grid container spacing={2}>
                {tourneys.map(tourney => 
                    <Grid item key={tourney.id}>
                        <TournamentCard tourney={tourney}/>    
                    </Grid>
                )}
            </Grid>
        </Paper>
    );
}

export default TournamentBlock;