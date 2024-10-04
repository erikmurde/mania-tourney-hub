import { Dialog, Paper, Table, TableBody, TableContainer } from '@mui/material';
import { MatchDto } from '../../../../../dto/schedule/match/MatchDto';
import { useContext, useEffect, useState } from 'react';
import { MatchService } from '../../../../../services/matchService';
import { IStageDto } from '../../../../../dto/stage/IStageDto';
import MatchTableHead from './MatchTableHead';
import MatchTableRow from './MatchTableRow';
import { UpdateContext } from '../../../../../routes/Root';
import dayjs from 'dayjs';
import NoItems from '../../../NoItems';
import MatchRefsheet from '../../../dialog/referee/MatchRefSheet';

interface IPpops {
    stage: IStageDto,
    canView: boolean
}

const MatchTable = ({stage, canView}: IPpops) => {
    const { scheduleUpdate } = useContext(UpdateContext);
    const [matches, setMatches] = useState([] as MatchDto[]);
    const [refIndex, setRefIndex] = useState(null as number | null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        new MatchService()
            .getAllByStageId(stage.id, controller.signal)
            .then(matches => {
                setMatches(matches ? matches.sort((a, b) => dayjs(a.time) > dayjs(b.time) ? 1 : -1) : []);
                setLoading(matches === undefined);
            });

        return () => controller.abort();
    }, [stage.id, scheduleUpdate]);

    return (  
        <>
        {!loading && matches.length > 0 &&
        <Paper elevation={6} sx={{ height: 1, paddingLeft: 1, paddingRight: 1 }}>
            <TableContainer>
                <Table>
                    <MatchTableHead/>
                    <TableBody>
                        {matches.map(match =>
                            <MatchTableRow 
                                key={match.id} 
                                match={match} 
                                refMatch={(match) => setRefIndex(matches.indexOf(match))}
                            />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>}
        <NoItems name='matches' loading={loading} display={!canView || matches.length === 0}/>
        {refIndex !== null && 
        <Dialog fullScreen 
            open={refIndex !== null} 
            PaperProps={{ elevation: 2, sx: { alignItems: 'center' } }}
            >
            {refIndex !== null &&
            <MatchRefsheet 
                match={{...matches[refIndex]}} 
                stage={stage} 
                onClose={() => setRefIndex(null)}
            />}   
        </Dialog>}
        </>
    );
}

export default MatchTable;