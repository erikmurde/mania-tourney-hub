import { Add, Delete } from '@mui/icons-material';
import { Grid, Typography, Button, TextField, IconButton } from '@mui/material';
import { FieldArray, FormikErrors, FastField } from 'formik';
import { TourneyLinkDto } from '../../../../dto/TourneyLinkDto';
import { TournamentEdit } from '../../../../domain/TournamentEdit';
import { Fragment } from 'react';

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
            <Grid item xs={6} alignContent='center'>
                <Typography fontSize={18} fontWeight={500}>
                    Links
                </Typography>
            </Grid>
            <Grid item xs={6} textAlign='end'>
                {links.length < MAX_LINKS &&
                <Button color='success' 
                    onClick={() => push({ name: '', url: '' })}
                    startIcon={<Add/>}>
                    Add link
                </Button>}
            </Grid>
            {links.map((_, index) => {
                const error = errors.links?.[index] as FormikErrors<TourneyLinkDto> | undefined;
                return (
                <Fragment key={index}>
                <Grid item xs={4}>  
                    <FastField as={TextField} name={`links[${index}].name`} label='Name' size='small'
                        fullWidth
                        error={error?.name}
                        helperText={error?.name}/>                           
                </Grid>
                <Grid item xs={4}>
                    <FastField as={TextField} name={`links[${index}].url`} label='URL' size='small'
                        fullWidth
                        error={error?.url}
                        helperText={error?.url}/>  
                </Grid>
                <Grid item xs={4}>
                    <IconButton color='error' onClick={() => remove(index)}>
                        <Delete/>
                    </IconButton>
                </Grid>
                </Fragment>)
            })}
            </>
        }
        </FieldArray>
    );
}
 
export default TourneyLinks;