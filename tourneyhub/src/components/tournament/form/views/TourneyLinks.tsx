import { Delete } from '@mui/icons-material';
import { Grid, Typography, Button, TextField, IconButton } from '@mui/material';
import { FieldArray, FormikErrors, FastField } from 'formik';
import { TourneyLinkDto } from '../../../../dto/TourneyLinkDto';
import { TournamentEdit } from '../../../../domain/TournamentEdit';

interface IProps {
    links: TourneyLinkDto[],
    errors: FormikErrors<TournamentEdit>
}

const MAX_LINKS = 5;

const TourneyLinks = ({links, errors}: IProps) => {
    return (  
        <FieldArray name='links'>
        {({ push, remove }) => 
            <>
            <Grid item xs={2} alignContent='center'>
                <Typography fontSize={18} fontWeight={500}>
                    Links
                </Typography>
            </Grid>
            <Grid item xs={10}>
                {links.length < MAX_LINKS &&
                <Button variant='contained' color='success' onClick={() => push({ name: '', link: '' })}>
                    Add link
                </Button>}
            </Grid>
            {links.map((_, index) => {
                const error = errors.links?.[index] as FormikErrors<TourneyLinkDto> | undefined;
                return <>
                <Grid item xs={4}>  
                    <FastField as={TextField} name={`links[${index}].name`} label='Name'
                        fullWidth
                        error={error?.name}
                        helperText={error?.name}/>                           
                </Grid>
                <Grid item xs={4}>
                    <FastField as={TextField} name={`links[${index}].link`} label='Link'
                        fullWidth
                        error={error?.link}
                        helperText={error?.link}/>  
                </Grid>
                <Grid item xs={4} marginTop={1}>
                    <IconButton color='error' onClick={() => remove(index)}>
                        <Delete/>
                    </IconButton>
                </Grid>
                </>
            })}
            </>
        }
        </FieldArray>
    );
}
 
export default TourneyLinks;