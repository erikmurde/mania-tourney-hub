import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import { useNavigate } from 'react-router-dom';

const TournamentCard = ({tourney}: {tourney: TournamentDto}) => {
    const navigate = useNavigate();

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
                    onClick={() => navigate(`/tournaments/${tourney.id}/information`)}>
                    Learn more
                </Button>
            </CardActions>
        </Card>
    );
}
 
export default TournamentCard;