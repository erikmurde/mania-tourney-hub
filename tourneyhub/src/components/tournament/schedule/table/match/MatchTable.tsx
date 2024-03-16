import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { MatchDto } from '../../../../../dto/schedule/MatchDto';
import { useContext, useEffect, useState } from 'react';
import { MatchService } from '../../../../../services/matchService';
import { IStageDto } from '../../../../../dto/stage/IStageDto';
import MatchTableHead from './MatchTableHead';
import MatchTableRow from './MatchTableRow';
import { UpdateContext } from '../../../../../routes/Root';
import dayjs from 'dayjs';
import NoItems from '../../../NoItems';

const MatchTable = ({stage}: {stage: IStageDto}) => {
    const { scheduleUpdate } = useContext(UpdateContext);
    const [matches, setMatches] = useState([] as MatchDto[]);

    useEffect(() => {
        new MatchService()
            .getAllStage(stage.id)
            .then(matches => setMatches(
                matches.sort((a, b) => dayjs(a.time) > dayjs(b.time) ? 1 : -1)
            ));
    }, [stage.id, scheduleUpdate]);

    return (  
        <>     
        {matches.length > 0 
        ?   <Paper elevation={6} sx={{ height: 1, paddingLeft: 1, paddingRight: 1 }}>   
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
            </Paper>
        :   <NoItems name='matches'/>}
        </>
    );
}

export default MatchTable;