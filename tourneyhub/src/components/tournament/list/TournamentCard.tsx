import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SimpleTournamentDto } from '../../../dto/tournament/SimpleTournamentDto';
import { TAB_ID } from '../../../constants';

const TournamentCard = ({tourney}: {tourney: SimpleTournamentDto}) => {
    const navigate = useNavigate();

    const openTourney = () => {
        localStorage.removeItem(TAB_ID);
        navigate(`/tournaments/${tourney.id}/information`);
    }

    return (  
        <Card 
            sx={{ display: 'flex', flexDirection: 'column', minHeight: 400, width: 600 }} 
            elevation={8}>
            <CardMedia 
                sx={{ height: 170 }}
                className='map-cover'
                image={tourney.banner}
                title={`banner of ${tourney.name}`}
            />
            <CardContent sx={{ padding: 1, flexGrow: 1 }}>
                <Typography fontSize={24} fontWeight={700} textAlign='center' marginBottom={1}>
                    {tourney.name}
                </Typography>
                <Typography textAlign='center'>
                    {tourney.description}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
                <Button 
                    variant='contained' 
                    onClick={openTourney}>
                    Learn more
                </Button>
            </CardActions>
        </Card>
    );
}
 
export default TournamentCard;