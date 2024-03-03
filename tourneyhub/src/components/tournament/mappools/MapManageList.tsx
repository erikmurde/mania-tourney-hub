import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material';
import { IMapDto } from '../../../dto/map/IMapDto';
import { ExpandMore } from '@mui/icons-material';
import MapTypeBox from '../../MapTypeBox';
import MapManageCard from './card/MapManageCard';
import { MapService } from '../../../services/mapService';

interface IProps {
    maps: IMapDto[],
    setMaps: (maps: IMapDto[]) => void
}

const MapManageList = ({maps, setMaps}: IProps) => {
    const service = new MapService();

    let data = new Map<string, IMapDto[]>();
    let accordions: JSX.Element[] = [];

    maps.forEach(map => {
        let key = `${map.mapType.name}${map.index}`;

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
            toAdd.inMappool = true;
            await service.edit(toAdd.id, toAdd);
            setMaps(maps.map(map => map.id === id ? toAdd : map));

            if (toRemove) {
                toRemove.inMappool = false;
                await service.edit(toRemove.id, toRemove);
                setMaps(maps.map(map => map.id === toRemove.id ? toRemove : map));
            }
        }
    }

    const removeFromPool = async(toRemove: IMapDto) => {
        toRemove.inMappool = false;

        await new MapService().edit(toRemove.id, toRemove);
        setMaps(maps.map(map => map.id === toRemove.id ? toRemove : map));
    }

    data.forEach((maps, index) => {
        accordions.push(
            <Grid item xs={11} key={index}>
                <Accordion elevation={6}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <MapTypeBox map={maps[0]}/>
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
        </Grid>
    );
}

export default MapManageList;