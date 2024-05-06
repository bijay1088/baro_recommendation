import React, { useState, useEffect } from 'react';
import './Baro_listing.css';
import BaroList from '../../assets/baro_listing.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const BaroEditor = () => {
    const [baroList, setBaroList] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [avoidTerm, setAvoidTerm] = useState('');

    useEffect(() => {
        setBaroList(BaroList);
    }, []);

    const handleRecommendationChange = (id, recommendation) => {
        const modifiedList = baroList.map(item =>
            item.id === id ? { ...item, Recommendation: recommendation } : item
        );
        setBaroList(modifiedList);
    };

    const handleDescriptionChange = (id, description) => {
        const modifiedList = baroList.map(item =>
            item.id === id ? { ...item, Description: description } : item
        );
        setBaroList(modifiedList);
    };

    const downloadJson = () => {
        const jsonContent = JSON.stringify(baroList, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'baro_listing_modified.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSort = (key) => {
        const newSortOrder = key === sortBy && sortOrder === 'asc' ? 'desc' : 'asc';
        const sortedList = [...baroList].sort((a, b) => {
            if (a[key] < b[key]) return sortOrder === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setBaroList(sortedList);
        setSortBy(key);
        setSortOrder(newSortOrder);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filteredList = BaroList.filter(item =>
            item.Item.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.Type.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.Cost.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setBaroList(filteredList);
    };

    const handleAvoid = (e) => {
        setAvoidTerm(e.target.value);
        const filteredList = BaroList.filter(item =>
            !item.Item.toLowerCase().includes(e.target.value.toLowerCase()) &&
            !item.Type.toLowerCase().includes(e.target.value.toLowerCase()) &&
            !item.Cost.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setBaroList(filteredList);
    }


    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className='mb-3 form-control w-50'
            />

            <input type='text'
                placeholder='Avoid...'
                value={avoidTerm}
                onChange={handleAvoid}
                className='mb-3 form-control w-50'
            />
            <div className='responsive_table'>
                <table className="table table-striped table-dark ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" onClick={() => handleSort('Item')} className='sort'>
                                Name{' '}
                                {sortBy === 'Item' && (
                                    <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
                                )}
                                {sortBy !== 'Item' && <FontAwesomeIcon icon={faSort} />}
                            </th>
                            <th scope="col" onClick={() => handleSort('Type')} className='sort'>
                                Type{' '}
                                {sortBy === 'Type' && (
                                    <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
                                )}
                                {sortBy !== 'Type' && <FontAwesomeIcon icon={faSort} />}
                            </th>
                            <th scope="col" onClick={() => handleSort('Cost')} className='sort'>
                                Cost{' '}
                                {sortBy === 'Cost' && (
                                    <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} />
                                )}
                                {sortBy !== 'Cost' && <FontAwesomeIcon icon={faSort} />}
                            </th>
                            <th scope="col">Recommendation</th>
                            <th scope='col'>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {baroList.map((baro, index) => (
                            <tr key={baro.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{baro.Item}</td>
                                <td>{baro.Type}</td>
                                <td>{baro.Cost}</td>
                                <td>
                                    <select
                                        value={baro.Recommendation || ''}
                                        onChange={(e) => handleRecommendationChange(baro.id, e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="Must Have" selected={baro.Recommendation === 'Must Have'}>Must Have</option>
                                        <option value="Good To Have" selected={baro.Recommendation === 'Good To Have'}>Good To Have</option>
                                        <option value="If You Want" selected={baro.Recommendation === 'If You Want'}>If You Want</option>
                                        <option value="Farmable" selected={baro.Recommendation === 'Farmable'}>Farmable</option>
                                        <option value="No" selected={baro.Recommendation === 'No'}>No</option>
                                    </select>
                                </td>
                                <td><textarea className='form-control' onChange={(e) => handleDescriptionChange(baro.id, e.target.value)}>{baro.Description}</textarea>  </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            
            <p className='text-danger mt-2'>Make sure your filters are off before downloading.</p>
            <button type="button" className="btn btn-primary" onClick={downloadJson}>
                Download JSON
            </button>
        </div>
    );
};

export default BaroEditor;
