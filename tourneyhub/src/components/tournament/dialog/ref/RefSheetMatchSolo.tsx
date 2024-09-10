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
import RefMatchBans from '../../ref/match/RefMatchBans';

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
        picks: []
    };

    useEffect(() => {
        new MapService()
            .getAllStageInMappool(stage.id.toString())
            .then(maps => setMaps(maps));
    }, [stage.id]);

    const onConclude = (values: MatchStatus) => {
        console.log(values);
    }

    return (  
        <Grid container alignItems='center' maxWidth={1400} marginBottom={2}>
            <SectionTitle title='Conduct match' xsAuto/>
            <Grid item xs textAlign='end' marginRight={5}>
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
                    onSubmit={onConclude}
                    validateOnChange={false}
                    validateOnBlur={false}>
                {({ values, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={1}>
                            <Grid item width={450}>
                                <RefMatchMain match={match} stageName={stage.name}/>
                            </Grid>
                            <Grid item width={450}>
                                <RefMatchStatus
                                    values={values}
                                    bestOf={stage.bestOf}
                                    setFieldValue={setFieldValue}/>
                                <RefMatchBans maps={maps} player1={match.player1.name} player2={match.player2.name}/>
                                {values.picks.length > 0 &&
                                <RefMatchPicks 
                                    bestOf={stage.bestOf} 
                                    maps={maps}
                                    values={values}/>}
                            </Grid>
                            <Grid item width={450}>
                                <RefMapPool maps={maps} picks={values.picks.map(pick => pick.map)}/>
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