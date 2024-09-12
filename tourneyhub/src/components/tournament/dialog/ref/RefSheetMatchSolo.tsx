import { Button, Grid } from '@mui/material';
import { MatchDto } from '../../../../dto/schedule/MatchDto';
import SectionTitle from '../../SectionTitle';
import { ChevronLeft } from '@mui/icons-material';
import { IStageDto } from '../../../../dto/stage/IStageDto';
import { useEffect, useState } from 'react';
import { IMapDto } from '../../../../dto/map/IMapDto';
import { MapService } from '../../../../services/mapService';
import RefMatchStatus from '../../ref/match/RefMatchStatus';
import RefMatchPicks from '../../ref/match/RefMatchPicks';
import { Form, Formik } from 'formik';
import { MatchStatus } from '../../../../domain/MatchStatus';
import RefMapPool from '../../ref/match/RefMapPool';
import RefMatchMain from '../../ref/match/RefMatchMain';
import RefMatchCommands from '../../ref/match/RefMatchCommands';
import RefMatchChoices from '../../ref/match/RefMatchChoices';

interface IProps {
    match: MatchDto,
    stage: IStageDto,
    onClose: () => void
}

const RefSheetMatchSolo = ({match, stage, onClose}: IProps) => {
    const [maps, setMaps] = useState([] as IMapDto[]);

    const initialValues: MatchStatus = {
        match: match,
        firstPick: '',
        picks: [],
        bans: ['', ''],
        protects: ['', '']
    };

    useEffect(() => {
        new MapService()
            .getAllStageInMappool(stage.id)
            .then(maps => setMaps(maps));
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
                    onSubmit={() => console.log('Submit')}
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
                                <Grid item flexGrow={1}>
                                    <RefMatchCommands match={values.match} picks={values.picks} bestOf={stage.bestOf}/>
                                </Grid>
                            </Grid>
                            <Grid item container width={450} direction='column'>
                                    <RefMatchStatus
                                        values={values}
                                        bestOf={stage.bestOf}
                                        setFieldValue={setFieldValue}/>
                                    <RefMatchChoices 
                                        maps={maps} 
                                        player1={match.player1.name} 
                                        player2={match.player2.name}
                                        bans={values.bans}
                                        protects={values.protects}/>
                                <Grid item flexGrow={1}>
                                    {values.picks.length > 0 &&
                                    <RefMatchPicks 
                                        bestOf={stage.bestOf} 
                                        maps={maps}
                                        values={values}/>}
                                </Grid>
                            </Grid>
                            <Grid item width={450}>
                                <RefMapPool 
                                    maps={maps} 
                                    picks={values.picks.map(pick => pick.beatmapId)}
                                    bans={values.bans}
                                    protects={values.protects}/>
                            </Grid>
                        </Grid>
                    </Form>
                )}
                </Formik>
            </Grid>
        </Grid>
    );
}
 
export default RefSheetMatchSolo;