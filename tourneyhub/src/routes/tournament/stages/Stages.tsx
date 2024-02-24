import { Button, Grid, Paper, Typography } from '@mui/material';
import StageList from '../../../components/tournament/stages/StageList';
import { IStageDto } from '../../../dto/stage/IStageDto';
import { useContext, useEffect, useState } from 'react';
import { StageService } from '../../../services/stageService';
import { AuthContext } from '../../Root';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthService } from '../../../services/authService';
import { NoteAdd } from '@mui/icons-material';

const Stages = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [stages, setStages] = useState([] as IStageDto[]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id || !user) {
            return;
        }

        new StageService()
            .getAll()
            .then(stages => setStages(stages));
    }, []);

    if (!id || !user || !new AuthService().isHost(user, id)) {
        return <Typography>No permission</Typography>
    }

    return (  
        <Paper elevation={2} sx={{ minHeight: 500, paddingBottom: 2 }}>
            <Grid container marginLeft={5} marginBottom={5}>
                <Grid item xs={12}>
                    <Typography variant='h2' 
                            height={100} 
                            fontSize={46} 
                            fontWeight={400} 
                            lineHeight={2}>
                            Stages
                    </Typography>
                </Grid>
                <Grid item marginTop={2}>
                    <Button sx={{ width: 150 }} variant='contained' startIcon={<NoteAdd/>}>
                        New stage
                    </Button>
                </Grid>
            </Grid>
            <StageList stages={stages}/>
        </Paper>
    );
}

export default Stages;