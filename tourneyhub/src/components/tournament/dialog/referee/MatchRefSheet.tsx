import { Button, Grid } from '@mui/material';
import { MatchDto } from '../../../../dto/schedule/match/MatchDto';
import SectionTitle from '../../SectionTitle';
import { ChevronLeft } from '@mui/icons-material';
import { IStageDto } from '../../../../dto/stage/IStageDto';
import { useEffect, useState } from 'react';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { MapService } from '../../../../services/mapService';
import RefMatchStatus from '../../ref/match/MatchScores';
import RefMatchPicks from '../../ref/match/MatchPicks';
import { Form, Formik } from 'formik';
import { MatchStatus } from '../../../../domain/MatchStatus';
import RefMapPool from '../../ref/match/MatchMapPool';
import RefMatchMain from '../../ref/match/MatchMain';
import RefMatchChoices from '../../ref/match/MatchChoices';
import MatchStatusCommands from '../../ref/match/MatchStatusCommands';
import MatchGeneralCommands from '../../ref/match/MatchGeneralCommands';
import TeamInviteCommands from '../../ref/commands/TeamInviteCommands';
import { useTourney } from '../../../../routes/tournament/TournamentHeader';
import { RefSheetPaper } from '../../../styled/RefSheetPaper';
import NoItems from '../../NoItems';

interface IProps {
    match: MatchDto,
    stage: IStageDto,
    onClose: () => void
}

const MatchRefsheet = ({match, stage, onClose}: IProps) => {
    const { tourney } = useTourney();
    const [maps, setMaps] = useState([] as IMapDto[]);
    const [loading, setLoading] = useState(true);

    const initialValues: MatchStatus = {
        match: match,
        firstPick: '',
        picks: [],
        bans: ['', ''],
        protects: ['', '']
    };

    useEffect(() => {
        new MapService()
            .getAllInMappoolByStageId(match.stageId)
            .then(maps => setMaps(maps ?? []))
            .finally(() => setLoading(false));
    }, [stage.id]);

    return (  
        <Grid container alignItems='center' maxWidth={1400} marginBottom={2}>
            <SectionTitle xsAuto title='Conduct match'/>
            <Grid item xs textAlign='end' paddingRight={5}>
                <Button variant='contained' 
                    startIcon={<ChevronLeft/>} 
                    sx={{ width: 100 }} 
                    onClick={onClose}>
                    Back
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Formik 
                    initialValues={initialValues} 
                    onSubmit={() => {}}
                    validateOnChange={false}
                    validateOnBlur={false}>
                {({ values, setFieldValue }) => (
                    <Form>
                        <Grid container justifyContent='center' spacing={1}>
                            <Grid item container width={450} direction='column'>
                                <RefMatchMain 
                                    match={values.match} 
                                    stageName={stage.name} 
                                    maxScore={Math.floor(stage.bestOf / 2) + 1}
                                    onClose={onClose}
                                />
                                <MatchStatusCommands 
                                    match={values.match} 
                                    picks={values.picks} 
                                    bestOf={stage.bestOf}
                                />
                                <Grid item flexGrow={1}>
                                    <MatchGeneralCommands match={values.match}/>
                                </Grid>
                            </Grid>
                            <Grid item container width={450} direction='column'>
                                <RefMatchStatus
                                    values={values}
                                    bestOf={stage.bestOf}
                                    setFieldValue={setFieldValue}
                                />
                                <RefMatchChoices 
                                    maps={maps} 
                                    player1={match.player1.name} 
                                    player2={match.player2.name}
                                    bans={values.bans}
                                    protects={values.protects}
                                />
                                <Grid item flexGrow={1}>
                                    {values.picks.length > 0 &&
                                    <RefMatchPicks 
                                        bestOf={stage.bestOf} 
                                        maps={maps}
                                        values={values}/>}
                                </Grid>
                            </Grid>
                            <Grid item width={500}>
                                <RefSheetPaper elevation={8} sx={{ height: 1 }}>
                                    <NoItems name='maps' loading={loading} display={maps.length === 0}/>
                                    {!loading &&
                                    <RefMapPool 
                                        maps={maps} 
                                        picks={values.picks.map(pick => pick.beatmapId)}
                                        bans={values.bans}
                                        protects={values.protects}/>}
                                </RefSheetPaper>
                            </Grid>
                            {tourney.minTeamSize > 1 && 
                            <Grid item width={1400}>
                                <TeamInviteCommands teamNames={[match.player1.name, match.player2.name]} isMatch/>
                            </Grid>}
                        </Grid>
                    </Form>
                )}
                </Formik>
            </Grid>
        </Grid>
    );
}
 
export default MatchRefsheet;