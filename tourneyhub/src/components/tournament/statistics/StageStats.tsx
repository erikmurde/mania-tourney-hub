import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { IStageDto } from '../../../dto/stage/IStageDto';
import StatsTableHead from './table/StatsTableHead';
import { useEffect, useState } from 'react';
import StatsTableRow from './table/StatsTableRow';
import { MapStatsDto } from '../../../dto/statistics/MapStatsDto';
import { useParams } from 'react-router-dom';
import { TournamentDto } from '../../../dto/tournament/TournamentDto';
import { TournamentService } from '../../../services/tournamentService';

interface IProps {
    stage: IStageDto,
    mapStats: MapStatsDto[]
}

const StageStats = ({stage, mapStats}: IProps) => {
    const { id } = useParams();
    const [tourney, setTourney] = useState({} as TournamentDto);

    useEffect(() => {
        if (id && !tourney) {
            new TournamentService()
                .getEntity(id!)
                .then(tourney => setTourney(tourney));
        }
    }, [id, tourney, stage.id]);

    return (  
        <Paper elevation={6} sx={{ height: 1, paddingLeft: 1, paddingRight: 1 }}>
            <TableContainer>
                <Table>
                    <StatsTableHead stageType={stage.stageType}/>
                    {tourney &&
                    <TableBody>
                        {mapStats.map(map => 
                            <StatsTableRow 
                                key={map.id} 
                                map={map} 
                                tourney={tourney} 
                                stageType={stage.stageType}
                            />
                        )}
                    </TableBody>}
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default StageStats;