import React from 'react';

const ObjectToTable = ({ object }) => {
    const formatKey = (key) => {
        const formattedKey = key.replace(/_/g, ' ');
        return formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
    };

    return (
        <table>
            <tbody>
                {Object.entries(object).map(([key, value]) => (
                    <tr key={key}>
                        <td><b>{formatKey(key)}</b></td>
                        <td>{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ObjectToTable;