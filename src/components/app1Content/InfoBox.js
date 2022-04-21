import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

export default function InfoBox({active, title, cases, total, ...props}) {
    return (
       <Card onClick={props.onClick} className={`infoBox ${active && 'active'}`}>
           <CardContent>
               <Typography variant="h6" className='infoBox-title'>
                   {title}
               </Typography>
               <h4 className='infoBox-cases'>{cases} Today</h4>
               <Typography variant="h6" className='infoBox-total'>
                   {total} Total
               </Typography>

           </CardContent>
       </Card>
    )
}
