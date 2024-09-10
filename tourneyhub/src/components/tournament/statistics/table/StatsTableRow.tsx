import { TableRow } from '@mui/material';
import { MapStatsDto } from '../../../../dto/statistics/MapStatsDto';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import MapTypeBox from '../../../MapTypeBox';
import { PlayerScoreDto } from '../../../../dto/score/PlayerScoreDto';
import { MapStatsService } from '../../../../services/mapStatsService';
import { STANDARD } from '../../../../constants';
import { TeamScoreDto } from '../../../../dto/score/TeamScoreDto';
import { useEffect, useState } from 'react';
import StatsTableMvp from './StatsTableMvp';

interface IProps {
    map: MapStatsDto,
    stageType: string,
    teamTourney: boolean,
    showTeams: boolean
}

const StatsTableRow = ({map, stageType, teamTourney, showTeams}: IProps) => {
    const service = new MapStatsService();

    const [state, setState] = useState({
        avgScore: 0,
        avgAcc: 0,
        bestTeam: null as TeamScoreDto | null,
        bestPlayer: null as PlayerScoreDto | null
    });

    const getBestPlayer = (hightestScore: number) => {
        if (teamTourney) {
            const team = (map.scores as TeamScoreDto[]).find(team => 
                service.getPlayerScores(team).includes(hightestScore)
            );
            return team?.players.find(player => player.score === hightestScore) || null;
        } else {
            return (map.scores as PlayerScoreDto[]).find(
                player => player.score === hightestScore
            ) || null;
        }
    }

    const getBestTeam = (hightestScore: number) => {
        return (map.scores as TeamScoreDto[]).find(team => 
            service.getTeamScore(team) === hightestScore
        ) || null;
    }

    const getAverage = (items: number[], round: boolean) => {
        const average = items.reduce((elem, sum) => sum + elem, 0) / items.length || 0;
        return round ? Math.round(average) : average;
    }

    useEffect(() => {
        const allScores = service.getAllScores(map, teamTourney, showTeams);
        const allAccs = service.getAllAccs(map, teamTourney, showTeams);
        const hightestScore = Math.max(...allScores);

        const isTeam = teamTourney && showTeams;
        setState({
            avgScore: getAverage(allScores, true),
            avgAcc: getAverage(allAccs, false),
            bestTeam: isTeam ? getBestTeam(hightestScore) : null,
            bestPlayer: !isTeam ? getBestPlayer(hightestScore) : null
        });
    }, [teamTourney, showTeams]);

    return (  
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 50 }}>
            <SchedTableCell width={40} sx={{ paddingRight: 1 }}>
                <MapTypeBox 
                    mapType={map.type} 
                    index={map.index} 
                    height={25} 
                    width={40}
                    fontSize={14}
                />
            </SchedTableCell>
            <SchedTableCell>{map.title}</SchedTableCell>
            <StatsTableMvp 
                bestPlayer={state.bestPlayer} 
                bestTeam={state.bestTeam}
            />
            <SchedTableCell>
                {state.avgScore ? state.avgScore.toLocaleString() : ''}
            </SchedTableCell>
            <SchedTableCell>
                {state.avgAcc ? `${state.avgAcc.toFixed(2)}%` : ''}
            </SchedTableCell>
            {stageType === STANDARD && 
            <>
            <SchedTableCell>{map.picked}</SchedTableCell>
            <SchedTableCell>{map.banned}</SchedTableCell>
            <SchedTableCell>{map.protected}</SchedTableCell>
            </>}
        </TableRow>
    );
}

export default StatsTableRow;