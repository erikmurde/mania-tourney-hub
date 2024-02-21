import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, CardMedia, Grid, Paper } from '@mui/material';
import { IMapDto } from '../../../dto/map/IMapDto';
import { ExpandMore } from '@mui/icons-material';
import MapTypeBox from '../../MapTypeBox';
import MapManageCard from './card/MapManageCard';

const MapManageList = (props: {maps: IMapDto[]}) => {
    let data = new Map<string, IMapDto[]>();
    let accordions: JSX.Element[] = [];

    props.maps.forEach(map => {
        let key = `${map.mapType.name}${map.index}`;

        if (data.has(key)) {
            let tempList = data.get(key)!;
            tempList!.push(map);
            data.set(key, tempList!);
        } else {
            data.set(key, [map]);
        }
    });

    data.forEach((maps, index) => {
        accordions.push(
            <Grid item xs={11} key={index}>
                <Accordion elevation={6}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <MapTypeBox map={maps[0]}/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container rowSpacing={1}>
                            {maps.map(map => 
                                <Grid item xs key={map.id}>
                                    <MapManageCard map={map}/>
                                </Grid>
                            )}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        );
    });

    return ( 
        <Grid container justifyContent='center' rowSpacing={2}>
            {accordions}
        </Grid>
    );
}
 
export default MapManageList;