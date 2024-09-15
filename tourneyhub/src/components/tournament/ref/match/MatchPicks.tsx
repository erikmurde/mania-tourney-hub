import { MenuItem, Table, TableBody, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { SchedTableCell } from '../../../styled/SchedTableCell';
import { FieldArray } from 'formik';
import TourneySelectField from '../../field/TourneySelectField';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { MatchStatus } from '../../../../domain/MatchStatus';
import RefSheetPlayerBox from '../../../RefSheetPlayerBox';
import { TB, TERTIARY } from '../../../../constants';
import { StyledTableRow } from '../../../styled/StyledTableRow';
import { useEffect, useState } from 'react';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import { RefTableCell } from '../../../styled/RefTableCell';

interface IProps {
    values: MatchStatus,
    maps: IMapDto[],
    bestOf: number
}

const MatchPicks = ({values, maps, bestOf}: IProps) => {
    const theme = useTheme();
    const [unselectableMaps, setUnselectableMaps] = useState([] as string[]);
    const players = [values.match.player1.name, values.match.player2.name];

    const getBgColor = (index: number) => {
        if (index === bestOf - 1) {
            return TERTIARY;
        }
        if (players.indexOf(values.firstPick) > 0) {
            index += 1;
        }
        return index % 2 === 0 ? theme.palette.primary.main : theme.palette.error.main;
    }

    const pickDisabled = (index: number) => {
        const maxScore = Math.floor(bestOf / 2) + 1;
        const prev = index > 0 ? values.picks[index - 1] : null;

        return (prev && (prev.winner === '' || prev.beatmapId === '')) 
            || (values.match.score1 === maxScore || values.match.score2 === maxScore) 
            && index >= values.match.score1 + values.match.score2;
    }

    useEffect(() => {
        setUnselectableMaps(maps
            .map(map => map.beatmapId)
            .filter(id => values.bans.includes(id) || values.picks.map(pick => pick.beatmapId).includes(id))
        );
    }, [maps, values.picks, values.bans]);

    return (  
        <RefSheetPaper elevation={8} sx={{ height: 1, marginBottom: 1 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <SchedTableCell width={150}>Pick</SchedTableCell>
                            <SchedTableCell width={80}>Map</SchedTableCell>
                            <SchedTableCell width={170}>Winner</SchedTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        <FieldArray name='picks'>
                        {() => values.picks.map((pick, pickIndex) => {
                            const disabled = pickDisabled(pickIndex);
                            return (
                                <TableRow key={pickIndex}>
                                    <RefTableCell>
                                        <RefSheetPlayerBox name={pick.player} bgColor={getBgColor(pickIndex)}/>
                                    </RefTableCell>
                                    <RefTableCell>
                                        <TourneySelectField name={`picks[${pickIndex}].beatmapId`} small
                                            disabled={disabled}
                                            options={maps.map((value, mapIndex) => {
                                                const lastPick = pickIndex === values.picks.length - 1;
                                                const tiebreaker = value.mapType === TB
                                                
                                                const noDisplay = unselectableMaps.includes(value.beatmapId) 
                                                    || !lastPick && tiebreaker 
                                                    || lastPick && !tiebreaker;

                                                return (
                                                <MenuItem 
                                                    sx={{ display: noDisplay ? 'none' : '' }} 
                                                    key={mapIndex} 
                                                    value={value.beatmapId}
                                                    >
                                                    {value.mapType}{value.index}
                                                </MenuItem>)
                                            })}/>
                                    </RefTableCell>
                                    <RefTableCell>
                                        <TourneySelectField name={`picks[${pickIndex}].winner`} small
                                            disabled={disabled}
                                            options={players.map((value, index) => 
                                                <MenuItem key={index} value={value}>{value}</MenuItem>
                                            )}/>
                                    </RefTableCell>
                                </TableRow>
                            )
                        })}
                        </FieldArray>
                    </TableBody>
                </Table>
            </TableContainer>
        </RefSheetPaper>
    );
}
 
export default MatchPicks;