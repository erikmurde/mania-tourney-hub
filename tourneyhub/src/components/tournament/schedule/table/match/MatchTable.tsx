import { Table, TableBody, TableContainer } from '@mui/material';
import { MatchDto } from '../../../../../dto/schedule/MatchDto';
import { useContext, useEffect, useState } from 'react';
import { MatchService } from '../../../../../services/matchService';
import { IStageDto } from '../../../../../dto/stage/IStageDto';
import MatchTableHead from './MatchTableHead';
import MatchTableRow from './MatchTableRow';
import { UpdateContext } from '../../../../../routes/Root';

const MatchTable = ({stage}: {stage: IStageDto}) => {
    const { scheduleUpdate } = useContext(UpdateContext);
    const [matches, setMatches] = useState([] as MatchDto[]);

    useEffect(() => {
        new MatchService()
            .getAllStage(stage.id)
            .then(matches => setMatches(
                matches.sort((a, b) => a.time > b.time ? 1 : -1)
            ));
    }, [stage.id, scheduleUpdate]);

    return (  
        <TableContainer>
            <Table>
                <MatchTableHead/>
                <TableBody>
                    {matches.map(match =>
                        <MatchTableRow 
                            key={match.id} 
                            match={match} 
                        />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MatchTable;