import { Grid, Paper, Typography, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { RefPick } from '../../../../domain/RefPick';
import { MatchStatus } from '../../../../domain/MatchStatus';
import RefSheetPlayerBox from '../../../RefSheetPlayerBox';

interface IProps {
    values: MatchStatus,
    bestOf: number,
    setFieldValue: (field: string, value: any) => void
}

const RefMatchStatus = ({values: {match, firstPick, picks}, bestOf, setFieldValue}: IProps) => {
    const theme = useTheme();
    const players = [match.player1.name, match.player2.name];

    useEffect(() => {
        if (firstPick === '') {
            return
        }
        const picks: RefPick[] = [];
        let index = players.indexOf(firstPick);

        for (let i = 0; i < bestOf - 1; i++) {
            picks.push({ player: players[index++ % 2], beatmapId: '', winner: '' });
        }
        picks.push({ player: 'TIEBREAKER', beatmapId: '', winner: '' });
        setFieldValue('picks', picks);
    }, [firstPick]);

    useEffect(() => {
        let updated = match;
        updated.score1 = picks.filter(pick => pick.winner === match.player1.name).length;
        updated.score2 = picks.filter(pick => pick.winner === match.player2.name).length;

        setFieldValue('match', updated);
    }, [picks]);

    return (  
        <Paper elevation={8} sx={{ padding: 1, marginBottom: 1 }}>
            <Grid container textAlign='center'>
                <Grid item marginBottom={1}>
                    <RefSheetPlayerBox name={match.player1.name} bgColor={theme.palette.primary.main}/>
                </Grid>
                <Grid item xs>
                    <Typography fontWeight={500} marginTop={1}>
                        VS
                    </Typography>
                </Grid>
                <Grid item>
                    <RefSheetPlayerBox name={match.player2.name} bgColor={theme.palette.error.main}/>
                </Grid>
                <Grid item xs={4}>
                    <Typography fontSize={20} fontWeight={500}>
                        {match.score1}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography fontSize={14} marginTop={0.5}>
                        BEST OF {bestOf}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography fontSize={20} fontWeight={500}>
                        {match.score2}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}
 
export default RefMatchStatus;