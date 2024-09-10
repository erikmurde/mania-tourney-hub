import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material';
import { IMapDto } from '../../../dto/map/IMapDto';
import { ExpandMore } from '@mui/icons-material';
import MapTypeBox from '../../MapTypeBox';
import MapManageCard from './card/MapManageCard';
import { MapService } from '../../../services/mapService';
import { useContext } from 'react';
import { UpdateContext } from '../../../routes/Root';
import NoItems from '../NoItems';

const MapManageList = ({maps}: {maps: IMapDto[]}) => {
    const { mapPoolUpdate, setMapPoolUpdate } = useContext(UpdateContext);
    const service = new MapService();

    let data = new Map<string, IMapDto[]>();
    let accordions: JSX.Element[] = [];

    maps
    .sort((a, b) => service.getWeight(a) - service.getWeight(b))
    .forEach(map => {
        let key = `${map.mapType}${map.index}`;

        if (data.has(key)) {
            let tempList = data.get(key)!;
            tempList!.push(map);
            data.set(key, tempList!);
        } else {
            data.set(key, [map]);
        }
    });

    const addToPool = async(id: string, key: string) => {
        const mapGroup = data.get(key)!;

        const toAdd = mapGroup.find(map => map.id === id);
        const toRemove = mapGroup.find(map => map.inMappool);

        if (toAdd) {
            await service.edit(toAdd.id, {...toAdd, inMappool: true});
        }
        if (toRemove) {
            await service.edit(toRemove.id, {...toRemove, inMappool: false});
        }
        setMapPoolUpdate(mapPoolUpdate + 1);
    }

    const removeFromPool = async(toRemove: IMapDto) => {
        await new MapService().edit(toRemove.id, {...toRemove, inMappool: false});
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
                                        addToPool={addToPool}
                                        removeFromPool={removeFromPool}/>
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