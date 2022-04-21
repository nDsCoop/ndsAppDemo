import React from 'react'

const numeral = require('numeral');

export default function Table({countries}) {
    return (
        <div className="table-content">
            {countries.map(({country, cases}) => (
                <tr>
                    <td>{country}</td>
                    <td>
                        <strong>{numeral(cases).format(0,0.00)}</strong>
                    </td>
                </tr>
            ))

            }
        </div>
    )
}
