import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material';
import { IMapDto } from '../../../dto/map/IMapDto';
import { ExpandMore } from '@mui/icons-material';
import MapTypeBox from '../../MapTypeBox';
import MapManageCard from './card/MapManageCard';
import { MapService } from '../../../services/mapService';
import { useContext } from 'react';
import { UpdateContext } from '../../../routes/Root';
import NoItems from '../NoItems';

interface IProps {
    mappool: IMapDto[],
    activeAudioId: string,
    audioPlaying: boolean,
    handleAudio: (mapId: string, src: string | undefined) => void
}

const MapManageList = ({mappool, activeAudioId, audioPlaying, handleAudio}: IProps) => {
    const { mapPoolUpdate, setMapPoolUpdate } = useContext(UpdateContext);

    let data = new Map<string, IMapDto[]>();
    let accordions: JSX.Element[] = [];

    mappool.forEach(map => {
        let key = `${map.mapType}${map.index}`;

        if (data.has(key)) {
            let tempList = data.get(key)!;
            tempList!.push(map);
            data.set(key, tempList!);
        } else {
            data.set(key, [map]);
        }
    });

    const updateInMappool = async(id: string, inMappool: boolean) => {
        await new MapService().updateInMappool(id, inMappool);
        setMapPoolUpdate(mapPoolUpdate + 1);
    }

    data.forEach((maps, index) => {
        accordions.push(
            <Grid item xs={11} key={index}>
                <Accordion elevation={6} defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <MapTypeBox mapType={maps[0].mapType} index={maps[0].index}/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container rowSpacing={1} direction='column'>
                            {maps.map(map => 
                                <Grid item key={map.id}>
                                    <MapManageCard 
                                        map={map} 
                                        mappool={mappool}
                                        audioPlaying={map.id === activeAudioId && audioPlaying} 
                                        handleAudio={handleAudio}
                                        updateInMappool={updateInMappool}/>
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
            {accordions.length === 0 && <NoItems name='maps'/>}
        </Grid>
    );
}

export default MapManageList;